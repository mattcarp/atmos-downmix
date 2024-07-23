package com.mediaconsensus.downmix.atmosdownmix;

public class DownmixConfig {
    private String outputFormat = "mp3";
    private int channels = 2;
    private int bitrate = 128000; // in bits per second

    // Getters and setters
    public String getOutputFormat() {
        return outputFormat;
    }

    public void setOutputFormat(String outputFormat) {
        this.outputFormat = outputFormat;
    }

    public int getChannels() {
        return channels;
    }

    public void setChannels(int channels) {
        this.channels = channels;
    }

    public int getBitrate() {
        return bitrate;
    }

    public void setBitrate(int bitrate) {
        this.bitrate = bitrate;
    }
}