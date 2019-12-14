package com.allFood.backend.python_integration;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class PythonFileInvoker implements PythonInvoker {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private static final String python = "python3";

    private final File file;

    private Process subProcess = null;

    private int retCode;

    public PythonFileInvoker(File file) {
        this.file = file;
    }

    @NotNull
    public String getResult() throws PythonExecutionException, IOException {
        BufferedReader res = new BufferedReader(
                new InputStreamReader(subProcess.getInputStream()));

        String line;
        StringBuilder result = new StringBuilder();
        while ((line = res.readLine()) != null) {
            result.append(line);
            result.append('\n');
        }

        if (retCode != 0) {
            throw new PythonExecutionException(retCode, result.toString());
        }

        System.out.println("result ");

        return result.toString();
    }

    public void run(@NotNull String args) throws IOException, InterruptedException {
        ProcessBuilder processBuilder;

        processBuilder = new ProcessBuilder(python, file.getAbsolutePath(), args);
        processBuilder.redirectErrorStream(true);
        subProcess = processBuilder.start();
        subProcess.waitFor();
    }
    public void run() throws IOException, InterruptedException {
        ProcessBuilder processBuilder;

        processBuilder = new ProcessBuilder(python, file.getAbsolutePath());

        processBuilder.redirectErrorStream(true);
        subProcess = processBuilder.start();
        subProcess.waitFor();
    }

    private int sync() throws InterruptedException {
        return subProcess.waitFor();
    }

}
