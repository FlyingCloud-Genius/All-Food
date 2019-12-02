package com.allFood.backend.response;

public class Response {

    private boolean success;

    private int status;

    public Response(boolean success, int status) {
        this.success = success;
        this.status = status;
    }
}
