package com.mediaconsensus.downmix.atmosdownmix;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class FFmpegWrapper {

    private String ffmpegCommand = "ffmpeg";

    public void setFfmpegCommand(String ffmpegCommand) {
        this.ffmpegCommand = ffmpegCommand;
    }

    public String downmix(String inputFile, String outputFile, DownmixConfig config) throws IOException {
        File input = new File(inputFile);
        if (!input.exists()) {
            throw new IOException("Input file does not exist: " + inputFile);
        }

        String ffmpegPath = System.getProperty("ffmpeg.path", "ffmpeg");
        String[] command = {ffmpegPath, "-y", "-i", inputFile, "-ac", String.valueOf(config.getChannels()), "-b:a", config.getBitrate() + "k", outputFile};

        ProcessBuilder pb = new ProcessBuilder(command);
        Process process = pb.start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new IOException("FFmpeg process exited with code " + exitCode + ". Output: " + result.toString());
            }
            return result.toString();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("FFmpeg process was interrupted", e);
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