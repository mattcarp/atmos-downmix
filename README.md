# atmos-downmix

`atmos-downmix` is a Node.js project for downmixing Dolby Atmos files using FFmpeg. This tool allows you to downmix Dolby Atmos files to stereo with sensible defaults and provides options for configuration overrides. It supports WAV files and can be extended to other formats.

## Features

- Downmix Dolby Atmos WAV files to stereo
- Configurable output format, channels, and sample rate
- Integration with FFmpeg 7.x for advanced audio processing
- Unit tests with Jest for robust testing

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from Node.js official website (https://nodejs.org/).
- **FFmpeg 7.x**: Make sure FFmpeg 7.x is installed on your system. You can download and install it from FFmpeg official website (https://ffmpeg.org/download.html).

## Installation


1. Clone the repository:

```sh

   git clone https://github.com/mattcarp/atmos-downmix.git
   cd atmos-downmix

2. Install the dependencies:

   npm install
```

## Configuration

The project uses a configuration object with sensible defaults. You can find the default configuration in `config/defaults.js`:

```javascript
module.exports = {
  outputFormat: 'wav',
  channels: 2,
  sampleRate: 48000
};
```

### Overriding Defaults

You can override the default configuration by passing a configuration object to the `downmix` function. Here’s an example of how to override the defaults:
```javascript
const { downmix } = require('./src/ffmpegWrapper');

const inputFile = 'path/to/your/input/file.wav';
const options = {
  outputFormat: 'mp3',
  channels: 1,
  sampleRate: 44100,
  output: 'path/to/your/output/file.mp3'
};

downmix(inputFile, options)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
```

## Usage

### Example File

An example Dolby Atmos WAV file can be downloaded from the following link: Download Example File (https://www.dropbox.com/scl/fo/asa4hh8a0r6ppmz063kct/h?rlkey=jv1tet93u4utir3bwa2hjn300&e=1&dl=0)

### Running the Tests

The project includes unit tests using Jest. To run the tests, use the following command:
```sh
npm test
```
### Project Structure

```sh
.
├── README.md
├── SPEC.md
├── config
│   └── defaults.js
├── media
│   └── output
├── output.mp3
├── output.wav
├── package-lock.json
├── package.json
├── src
│   ├── ffmpegWrapper.js
│   └── server.js
└── test
    └── ffmpegWrapper.test.js
```


## FFmpeg 7.x Requirements

Ensure FFmpeg 7.x is installed and properly configured on your system. Here’s a quick way to verify your FFmpeg installation:
```sh
ffmpeg -version
```
### Sample Output
```sh
ffmpeg version 7.0.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with Apple clang version 15.0.0 (clang-1500.3.9.4)
  configuration: --prefix=/opt/homebrew/Cellar/ffmpeg/7.0.1 ...
  libavutil      59. 8.100 / 59. 8.100
  libavcodec     61. 3.100 / 61. 3.100
  libavformat    61. 1.100 / 61. 1.100
  libavdevice    61. 1.100 / 61. 1.100
  libavfilter    10. 1.100 / 10. 1.100
  libswscale      8. 1.100 / 8. 1.100
  libswresample   5. 1.100 / 5. 1.100
  libpostproc    58. 1.100 / 58. 1.100
```
## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## Acknowledgements

- Thanks to the FFmpeg developers for their incredible work on the FFmpeg project.
- Thanks to the Dolby team for their contributions to audio technology.

## Author

This tool is written by Matt Carpenter.