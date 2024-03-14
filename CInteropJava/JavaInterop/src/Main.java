
import java.util.concurrent.atomic.AtomicInteger;

import cplusplus.CWrapper;
import cplusplus.CharWrapper;

public class Main {

	public static void main(String[] args) {
		var instanceCWrapper = new CWrapper();
		
		int result = instanceCWrapper.multiply(5, 10);
		System.out.println("Result " + result);
		
		
		CharWrapper charVal = new CharWrapper('T');
		AtomicInteger a = new AtomicInteger(5);
        AtomicInteger b = new AtomicInteger(10);
        AtomicInteger resultAB = new AtomicInteger(0); 
	     
        int functionResult = instanceCWrapper.add(a, b, resultAB, charVal);
        System.out.println("Result: " + resultAB.get() + ", Function result: " + functionResult);   
	}

}
