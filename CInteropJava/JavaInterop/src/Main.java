
import java.util.concurrent.atomic.AtomicInteger;

import cplusplus.CWrapper;

public class Main {

	public static void main(String[] args) {
		var instanceCWrapper = new CWrapper();
		
		int result = instanceCWrapper.multiply(5, 10);
		System.out.println("Result " + result);
		
		
		AtomicInteger a = new AtomicInteger(5);
        AtomicInteger b = new AtomicInteger(10);
        AtomicInteger resultAB = new AtomicInteger(0); 
	     
        int functionResult = instanceCWrapper.add(a, b, resultAB);
        System.out.println("Result: " + resultAB.get() + ", Function result: " + functionResult);   
	}

}
