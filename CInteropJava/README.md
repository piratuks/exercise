## CPPInterop

This is a simple C++ project as a library (builds to .dll). 
The project contains only one method which is <b>multiply</b>. [JNI](https://developer.android.com/training/articles/perf-jni) is used and its declaration creates a wrapper to expose the method to Java.

## JavaInterop
This is a simple Java project which contains an executable class and a C++ wrapper class. C++ wrapper class loads .dll from the project root and exposes the method for further use.
