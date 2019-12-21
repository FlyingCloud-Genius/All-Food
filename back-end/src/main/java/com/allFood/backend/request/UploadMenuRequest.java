package com.allFood.backend.request;

import com.allFood.backend.dao.Menu;

public class UploadMenuRequest {

    private String userName;

    private Menu menu;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }
}
