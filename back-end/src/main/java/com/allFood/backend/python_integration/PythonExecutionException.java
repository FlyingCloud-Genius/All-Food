package com.allFood.backend.python_integration;

public class PythonExecutionException extends Exception{

    private int errCode;

    PythonExecutionException(int errCode, String message) {
        super(message);
        this.errCode = errCode;
    }

    public int getErrCode() { return errCode; }

}
