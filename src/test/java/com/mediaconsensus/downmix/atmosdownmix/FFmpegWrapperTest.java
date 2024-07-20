package com.mediaconsensus.downmix.atmosdownmix;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class FFmpegWrapperTest {

    private static final String INPUT_FILE = "src/test/resources/media/The Visitor at the Window2_atmos.wav";
    private static final String OUTPUT_FILE = "src/test/resources/media/output.mp3";

    @BeforeAll
    public static void setup() {
        // Ensure the input file exists
        File inputFile = new File(INPUT_FILE);
        System.out.println("Checking input file: " + inputFile.getAbsolutePath());
        assertTrue(inputFile.exists(), "Input file should exist");

        // Delete the output file if it exists to ensure a clean test run
        File outputFile = new File(OUTPUT_FILE);
        if (outputFile.exists()) {
            outputFile.delete();
        }
    }

    @Test
    public void testDownmix() throws IOException {
        FFmpegWrapper wrapper = new FFmpegWrapper();
        DownmixConfig config = new DownmixConfig(); // Use default config
        String result = wrapper.downmix(INPUT_FILE, OUTPUT_FILE, config);
        System.out.println("Downmix result: " + result);
        assertTrue(new File(OUTPUT_FILE).exists(), "Output file should exist");

        // Verify output file attributes using ffprobe
        verifyOutputFile(OUTPUT_FILE, config);
    }

    private void verifyOutputFile(String outputFile, DownmixConfig config) throws IOException {
        ProcessBuilder pb = new ProcessBuilder("ffprobe", "-v", "error", "-show_entries", "stream=codec_name,channels,bit_rate", "-of", "default=noprint_wrappers=1", outputFile);
        Process process = pb.start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            boolean formatVerified = false;
            boolean channelsVerified = false;
            boolean bitrateVerified = false;

            while ((line = reader.readLine()) != null) {
                System.out.println("ffprobe output: " + line);
                if (line.contains("codec_name=")) {
                    formatVerified = line.contains(config.getOutputFormat());
                } else if (line.contains("channels=")) {
                    channelsVerified = line.contains(String.valueOf(config.getChannels()));
                } else if (line.contains("bit_rate=")) {
                    bitrateVerified = line.contains(String.valueOf(config.getBitrate()));
                }
            }

            assertTrue(formatVerified, "Output format should be " + config.getOutputFormat());
            assertTrue(channelsVerified, "Channels should be " + config.getChannels());
            assertTrue(bitrateVerified, "Bitrate should be " + config.getBitrate());
        }
    }

    @AfterAll
    public static void cleanup() {
        // No cleanup to keep the output file for review
    }
}