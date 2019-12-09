package com.allFood.backend.service;

import com.allFood.backend.dao.dish.AllTag;

public interface TagService {

    AllTag getAllTag();

    boolean setAllTag(AllTag allTag);
}
