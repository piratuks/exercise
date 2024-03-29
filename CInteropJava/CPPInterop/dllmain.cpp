// dllmain.cpp : Defines the entry point for the DLL application.
#include "framework.h"

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

#include <jni.h>

extern "C"
{
    int multiply(int a, int b) {
        return a * b;
    }

    int add(int* a, int* b, int* result) {
        *result = *a + *b;
        return 1000;
    }

    JNIEXPORT jint JNICALL Java_cplusplus_CWrapper_multiply(JNIEnv* env, jobject obj, jint a, jint b)
    {
        return multiply(a, b);
    }

    JNIEXPORT jint JNICALL Java_cplusplus_CWrapper_add(JNIEnv* env, jobject obj, jobject a, jobject b, jobject result, jobject charVal) {
        jclass atomicIntegerClassA = env->GetObjectClass(a);
        jclass atomicIntegerClassB = env->GetObjectClass(b);
        jclass atomicIntegerClassRes = env->GetObjectClass(b);
        jclass atomicCharClass = env->GetObjectClass(charVal);

        jmethodID atomicIntegerGetMethodA = env->GetMethodID(atomicIntegerClassA, "get", "()I");
        jmethodID atomicIntegerGetMethodB = env->GetMethodID(atomicIntegerClassB, "get", "()I");
        jmethodID atomicCharGetMethod = env->GetMethodID(atomicCharClass, "getValue", "()C");
        jmethodID atomicCharSetMethod = env->GetMethodID(atomicCharClass, "setValue", "(C)V");
        jmethodID atomicIntegerGetMethodRes = env->GetMethodID(atomicIntegerClassRes, "get", "()I");
        jmethodID atomicIntegerSetMethodRes = env->GetMethodID(atomicIntegerClassRes, "set", "(I)V");

        int aValue = env->CallIntMethod(a, atomicIntegerGetMethodA);
        int bValue = env->CallIntMethod(b, atomicIntegerGetMethodB);
        int charValue = env->CallCharMethod(charVal, atomicCharGetMethod);

        int resultValue;
        int functionRes = add(&aValue, &bValue, &resultValue);

        env->CallVoidMethod(result, atomicIntegerSetMethodRes, resultValue);
        env->CallVoidMethod(charVal, atomicCharSetMethod, charValue);

        printf("%c", charValue);

        return functionRes;
    }
}



