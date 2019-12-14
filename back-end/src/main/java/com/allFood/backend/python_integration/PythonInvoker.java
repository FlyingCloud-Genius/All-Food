package com.allFood.backend.python_integration;

import org.jetbrains.annotations.Nullable;

import java.io.IOException;

public interface PythonInvoker {

    void run(String args) throws IOException, InterruptedException;

    void run() throws IOException, InterruptedException;

    @Nullable
    String getResult() throws Exception;

}
