using System.Collections.Generic;
using System.Threading.Tasks;

namespace SS
{
    #pragma warning disable 1998, CA1822
    public class Bridge
	{
        public async Task<object?> InvokeLoad(object input)
        {
            var args = (object[]) input;
            AssertRequiredArgsLength(args, 1);
            Core.Load(Context.From((IDictionary<string, object?>) args[0]));

            return null;
        }

		public async Task<object?> InvokeCaptureActiveWindow(object input)
        {
            var args = (object[]) input;
            ApplyConfigurationFrom(args, 0);

            return Core.FlushImage(Core.CaptureActiveWindow());
        }

        public async Task<object?> InvokeCaptureWindowByTitle(object input)
        {
            var args = (object[]) input;
            AssertRequiredArgsLength(args, 1);
            var windowName = (string) args[0];
            ApplyConfigurationFrom(args, 1);

            return Core.FlushImage(Core.CaptureWindow(windowName));
        }

        public async Task<object?> InvokeCapturePrimaryMonitor(object input)
        {
            var args = (object[]) input;
            ApplyConfigurationFrom(args, 0);

            return Core.FlushImage(Core.CaptureMonitor());
        }

        public async Task<object?> InvokeCaptureMonitorByName(object input)
        {
            var args = (object[]) input;
            AssertRequiredArgsLength(args, 1);
            var deviceName = (string) args[0];
            ApplyConfigurationFrom(args, 1);

            return Core.FlushImage(Core.CaptureMonitor(deviceName));
        }

        public async Task<object?> InvokeCaptureMonitorByIndex(object input)
        {
            var args = (object[]) input;
            AssertRequiredArgsLength(args, 1);
            var deviceIndex = (int) args[0];
            ApplyConfigurationFrom(args, 1);

            return Core.FlushImage(Core.CaptureMonitor(deviceIndex));
        }

        public async Task<object> InvokeGetMonitorInfos(object _)
        {
            return Core.GetMonitorInfos();
        }

        private static void ApplyConfigurationFrom(object[] args, int index)
        {
            Configuration.Apply(args.Length > index ? (IDictionary<string, object?>) args[index] : null);
        }

        private static void AssertRequiredArgsLength(object[] args, int length)
        {
            if (args.Length < length) {
                throw new InvalidArgumentCountException(args.Length + " is not a valid amount of arguments for the specified function");
            }
        }
    }
}
