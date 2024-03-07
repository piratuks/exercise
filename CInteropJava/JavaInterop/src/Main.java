
import cplusplus.CWrapper;

public class Main {

	public static void main(String[] args) {
		var instanceCWrapper = new CWrapper();
		int result = instanceCWrapper.multiply(5, 10);
		System.out.println("Result " + result);
	}

}
