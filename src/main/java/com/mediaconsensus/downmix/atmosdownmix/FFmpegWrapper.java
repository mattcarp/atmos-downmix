package com.mediaconsensus.downmix.atmosdownmix;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class FFmpegWrapper {

    public String downmix(String inputFile, String outputFile, DownmixConfig config) throws IOException {
        List<String> command = new ArrayList<>();
        command.add("ffmpeg");
        command.add("-i");
        command.add(inputFile);
        command.add("-ac");
        command.add(String.valueOf(config.getChannels()));
        command.add("-b:a");
        command.add(String.valueOf(config.getBitrate()));
        command.add(outputFile);

        ProcessBuilder pb = new ProcessBuilder(command);
        Process process = pb.start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            return result.toString();
        }
    }

    public static void main(String[] args) {
        FFmpegWrapper wrapper = new FFmpegWrapper();
        DownmixConfig config = new DownmixConfig(); // Load default config
        try {
            String result = wrapper.downmix("input.wav", "output.wav", config);
            System.out.println("Downmix result: " + result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}