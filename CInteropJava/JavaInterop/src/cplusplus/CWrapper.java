package cplusplus;

import java.util.concurrent.atomic.AtomicInteger;

public class CWrapper {

	public native int multiply(int a, int b);
	public native int add(AtomicInteger a, AtomicInteger b, AtomicInteger result, CharWrapper charVal);
	
	static {
		System.loadLibrary("CPPInterop");
	}
}
