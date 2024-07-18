package com.example;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class FFmpegWrapperTest {

    private static final String INPUT_FILE = "src/test/resources/media/The Visitor at the Window2_atmos.wav";
    private static final String OUTPUT_FILE = "src/test/resources/media/output.wav";

    @BeforeAll
    public static void setup() {
        // Ensure the input file exists
        File inputFile = new File(INPUT_FILE);
        System.out.println("Checking input file: " + inputFile.getAbsolutePath());
        assertTrue(inputFile.exists(), "Input file should exist");
    }

    @AfterAll
    public static void cleanup() {
        // Clean up the output file after tests
        File outputFile = new File(OUTPUT_FILE);
        if (outputFile.exists()) {
            outputFile.delete();
        }
    }

    @Test
    public void testDownmix() throws IOException {
        FFmpegWrapper wrapper = new FFmpegWrapper();
        String result = wrapper.downmix(INPUT_FILE, OUTPUT_FILE);
        System.out.println("Downmix result: " + result);

        File outputFile = new File(OUTPUT_FILE);
        assertTrue(outputFile.exists(), "Output file should exist");
    }
}