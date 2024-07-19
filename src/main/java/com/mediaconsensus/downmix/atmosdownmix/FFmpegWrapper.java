package com.example;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteException;
import org.apache.commons.exec.PumpStreamHandler;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class FFmpegWrapper {

    public String downmix(String inputFile, String outputFile) throws IOException {
        CommandLine cmdLine = new CommandLine("ffmpeg");
        cmdLine.addArgument("-i");
        cmdLine.addArgument(inputFile, false); // Ensure the input file path is not quoted
        cmdLine.addArgument("-ac");
        cmdLine.addArgument("2");
        cmdLine.addArgument(outputFile, false); // Ensure the output file path is not quoted

        DefaultExecutor executor = new DefaultExecutor();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
        executor.setStreamHandler(streamHandler);

        System.out.println("Executing FFmpeg command: " + cmdLine.toString());

        try {
            executor.execute(cmdLine);
        } catch (ExecuteException e) {
            System.err.println("Error executing FFmpeg command: " + e.getMessage());
            System.err.println("FFmpeg output: " + outputStream.toString());
            throw new IOException("Error executing FFmpeg command", e);
        }

        return outputStream.toString();
    }

    public static void main(String[] args) {
        FFmpegWrapper wrapper = new FFmpegWrapper();
        try {
            String result = wrapper.downmix("input.wav", "output.wav");
            System.out.println("Downmix result: " + result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}