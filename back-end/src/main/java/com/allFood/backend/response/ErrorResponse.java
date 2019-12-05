package com.allFood.backend.response;

public class ErrorResponse extends Response{

    private String message;


    public ErrorResponse(int status, String message) {
        super(false, status);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
