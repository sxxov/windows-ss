param (
	[Parameter (Mandatory = $true)] [string] $DeviceName,
	[string] $Format = "png",
	[int[]] $Crop = @(0, 0, 0, 0),
	[int[]] $Bounds
)

[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing");
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Console");
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.IO");
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");

if ($null -eq $Bounds) {
	$Screens = [Windows.Forms.Screen]::AllScreens;
	$IndexOfScreen = [Array]::FindIndex($Screens, [Predicate[Windows.Forms.Screen]]{ param([Windows.Forms.Screen] $Screen) $Screen.DeviceName -eq $DeviceName });
	$Screen = $Screens[$IndexOfScreen];
	$VideoController = (Get-WmiObject -class "Win32_VideoController")[$IndexOfScreen];

	$Scaling = [Math]::Round($VideoController.CurrentHorizontalResolution / $Screen.Bounds.Width, 2);

	$Left = [Math]::Floor($Screen.Bounds.X * $Scaling) + $Crop[0];
	$Top = [Math]::Floor($Screen.Bounds.Y * $Scaling) + $Crop[1];
	$Right = [Math]::Floor($Screen.Bounds.Width * $Scaling) + $Left - $Crop[2];
	$Bottom = [Math]::Floor($Screen.Bounds.Height * $Scaling) + $Top - $Crop[3];
} else {
	$Left = $Bounds[0] + $Crop[0];
	$Top = $Bounds[1] + $Crop[1];
	$Right = $Bounds[2] - $Crop[2];
	$Bottom = $Bounds[3] - $Crop[3];
}

$ScreenshotRect = [Drawing.Rectangle]::FromLTRB($Left, $Top, $Right, $Bottom); 
$Bmp = [Drawing.Bitmap]::new([int] ($Right - $Left), [int] ($Bottom - $Top));
$Graphics = [Drawing.Graphics]::FromImage($Bmp);

$Graphics.CopyFromScreen($ScreenshotRect.Location, [Drawing.Point]::Empty, $ScreenshotRect.Size);

$MemoryStream = [IO.MemoryStream]::new();
$FormattedFormat = (Get-Culture).TextInfo.ToTitleCase($Format);
$Bmp.Save($MemoryStream, [Drawing.Imaging.ImageFormat]::$FormattedFormat);

$MemoryStream.WriteTo([Console]::OpenStandardOutput());

$Graphics.Dispose();
$Bmp.Dispose();
