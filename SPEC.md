# Atmos Downmix Project Specification

## Overview

The `atmos-downmix` project is a Node.js wrapper for downmixing Dolby Atmos files using FFmpeg. The tool provides sensible defaults and allows configuration overrides via a config object or flags. The project will also support being called via Java.

## Features

1. **Default Downmixing**:
    - Downmix any Dolby Atmos file to stereo `.wav` at 48kHz.

2. **Configuration Overrides**:
    - Allow users to specify output format, channels, sample rate, and codec.

3. **Supported File Formats**:
    - **Input**: `.eac3`, `.thd`, `.m2ts`, `.mkv`, `.mp4`
    - **Output**: `.wav`, `.mp3`, `.aac`

4. **API Integration**:
    - Provide a Node.js API that can be called from Java.

## Configuration Defaults

```json
{
  "outputFormat": "wav",
  "channels": 2,
  "sampleRate": 48000
}