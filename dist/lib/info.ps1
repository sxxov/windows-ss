[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing");
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Console");
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.IO");
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");

$VideoControllers = Get-WmiObject -class "Win32_VideoController";
$Screens = [Windows.Forms.Screen]::AllScreens;
$Result = [System.Collections.ArrayList] @();

for ($I = 0; $I -lt $Screens.Length; ++$I) {
	$Screen = $Screens[$I];
	$VideoController = $VideoControllers[$I];

	$Scaling = [Math]::Round($VideoController.CurrentHorizontalResolution / $Screen.Bounds.Width, 2);

	$Left = [Math]::Floor($Screen.Bounds.X * $Scaling);
	$Top = [Math]::Floor($Screen.Bounds.Y * $Scaling);
	$Right = [Math]::Floor($Screen.Bounds.Width * $Scaling) + $Left;
	$Bottom = [Math]::Floor($Screen.Bounds.Height * $Scaling) + $Top;

	[void] $Result.Add(@{
		id = $Screen.DeviceName;
		name = $Screen.DeviceName;
		left = $Left;
		top = $Top;
		right = $Right;
		bottom = $Bottom;
		dpiScale = $Scaling;
	});
}

$Result | ConvertTo-Json