package com.allFood.backend.service.impl;

import com.allFood.backend.dao.dish.AllTag;
import com.allFood.backend.repository.TagRepository;
import com.allFood.backend.service.TagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TagServiceImpl implements TagService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TagServiceImpl.class);

    private TagRepository tagRepository;

    @Autowired
    TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }


    @Override
    public AllTag getAllTag() {
        return tagRepository.findAll().get(0);
    }

    @Override
    public boolean setAllTag(AllTag allTag) {
       tagRepository.save(allTag);
       return true;
    }
}
