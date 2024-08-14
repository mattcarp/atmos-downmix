package com.mediaconsensus.downmix.atmosdownmix;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FFmpegWrapperTest {

    @TempDir
    Path tempDir;

    private FFmpegWrapper wrapper;
    private DownmixConfig config;
    private Path inputFile;
    private Path outputFile;

    @BeforeEach
    void setup() throws IOException {
        wrapper = new FFmpegWrapper();
        config = new DownmixConfig();
        
        // Create a dummy input file with some content
        inputFile = tempDir.resolve("input.wav");
        Files.write(inputFile, new byte[44100 * 2 * 2]); // 1 second of 16-bit stereo audio at 44.1kHz
        
        outputFile = tempDir.resolve("output.mp3");
    }

    @Test
    void testDownmixWithDefaultConfig() throws IOException {
        String result = wrapper.downmix(inputFile.toString(), outputFile.toString(), config);
        
        assertNotNull(result);
        assertTrue(Files.exists(outputFile), "Output file should exist");
        // Add more assertions based on the expected behavior of your downmix method
    }

    @Test
    void testDownmixWithCustomConfig() throws IOException {
        config.setChannels(1);
        config.setBitrate(128000);
        
        String result = wrapper.downmix(inputFile.toString(), outputFile.toString(), config);
        
        assertNotNull(result);
        assertTrue(Files.exists(outputFile), "Output file should exist");
        // Add more assertions based on the expected behavior of your downmix method
    }

    @Test
    void testDownmixWithNonExistentInputFile() {
        Path nonExistentFile = tempDir.resolve("non_existent.wav");
        
        assertThrows(IOException.class, () -> {
            wrapper.downmix(nonExistentFile.toString(), outputFile.toString(), config);
        });
    }

    @AfterEach
    void cleanup() {
        // Clean up any resources if needed
    }
}