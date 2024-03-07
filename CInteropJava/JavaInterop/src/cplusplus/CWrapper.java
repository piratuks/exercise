package cplusplus;


public class CWrapper {

	public native int multiply(int a, int b);
	
	static {
		System.loadLibrary("CPPInterop");
	}
}
