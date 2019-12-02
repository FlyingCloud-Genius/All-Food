package com.allFood.backend.response;

public class SuccessResponse extends Response {

    private String message;

    public SuccessResponse(int status, String message) {
        super(true, status);
        this.message = message;
    }
}
