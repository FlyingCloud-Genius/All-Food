package com.allFood.backend.controller;

import com.allFood.backend.dao.dish.AllTag;
import com.allFood.backend.response.DataResponse;
import com.allFood.backend.response.ErrorResponse;
import com.allFood.backend.response.Response;
import com.allFood.backend.response.SuccessResponse;
import com.allFood.backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TagController {

    private TagService tagService;

    @Autowired
    TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping(value = "/tag")
    public Response getAllTag() {
        return new DataResponse(tagService.getAllTag());
    }

    @PostMapping(value = "/tag")
    public Response insertAllTag(AllTag allTag) {
        if (tagService.setAllTag(allTag) == true) {
            return new SuccessResponse(200, "tags inserted successfully");
        } else {
            return new ErrorResponse(500, "insertion failed");
        }
    }
}
