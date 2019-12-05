package com.allFood.backend.response;

public class DataResponse extends SuccessResponse {

    private Object data;

    public DataResponse(Object data) {
        super(200, "successfully request");
        this.data = data;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
