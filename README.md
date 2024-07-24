# atmos-downmix

`atmos-downmix` is a project for downmixing Dolby Atmos files using FFmpeg, primarily designed for Java developers but also supporting Node.js. This tool allows you to downmix Dolby Atmos files to stereo with sensible defaults and provides options for configuration overrides. It supports WAV files and can be extended to other formats.

## Features

- Downmix Dolby Atmos WAV files to stereo
- Configurable output format, channels, and bitrate
- Integration with FFmpeg 7.x for advanced audio processing
- Unit tests with JUnit for Java and Jest for Node.js

## Prerequisites

### Java

- **Java**: Ensure you have Java installed. You can download it from the [Oracle official website](https://www.oracle.com/java/technologies/javase-downloads.html).
- **Maven**: Ensure you have Maven installed. You can download it from the [Maven official website](https://maven.apache.org/download.cgi).

### JavaScript

- **Node.js**: Ensure you have Node.js installed. You can download it from the [Node.js official website](https://nodejs.org/).
- **pnpm**: Ensure you have pnpm installed. You can install it using npm:
    ```sh
    npm install -g pnpm
    ```

### FFmpeg 7.x

Make sure FFmpeg 7.x is installed on your system. You can download and install it from the [FFmpeg official website](https://ffmpeg.org/download.html).

## Installation

### Java

1. Clone the repository:

    ```sh
    git clone https://github.com/mattcarp/atmos-downmix.git
    cd atmos-downmix
    ```

2. Install the Java dependencies:

    ```sh
    mvn install
    ```

### JavaScript

1. Clone the repository (if not already done):

    ```sh
    git clone https://github.com/mattcarp/atmos-downmix.git
    cd atmos-downmix
    ```

2. Install the Node.js dependencies:

    ```sh
    pnpm install
    ```

## Configuration

### Default Configuration

The project uses a configuration object with sensible defaults. You can find the default configuration in `config/defaults.js`:

```javascript
module.exports = {
  outputFormat: 'mp3',
  channels: 2,
  bitrate: 320000 // in bits per second
};
```

### Overriding Defaults in Java

To override the default configuration in Java, you can pass a configuration object to the `downmix` function. Here's an example of how to override the defaults:

```java
import com.mediaconsensus.downmix.atmosdownmix.DownmixConfig;
import com.mediaconsensus.downmix.atmosdownmix.FFmpegWrapper;

public class Main {
    public static void main(String[] args) {
        String inputFile = "src/test/resources/media/The Visitor at the Window2_atmos.wav";
        DownmixConfig config = new DownmixConfig();
        config.setOutputFormat("mp3");
        config.setChannels(2);
        config.setBitrate(320000);
        String outputFile = "path/to/your/output/file.mp3";

        try {
            FFmpegWrapper wrapper = new FFmpegWrapper();
            String result = wrapper.downmix(inputFile, outputFile, config);
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Overriding Defaults in JavaScript

You can override the default configuration by passing a configuration object to the `downmix` function. Here's an example of how to override the defaults:

```javascript
const { downmix } = require('./src/ffmpegWrapper');

const inputFile = 'src/test/resources/media/The Visitor at the Window2_atmos.wav';
const options = {
  outputFormat: 'wav',
  channels: 1,
  bitrate: 44100,
  output: 'path/to/your/output/file.wav'
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

### Running the Java Application

To run the Java application, use the following command:

```sh
mvn exec:java -Dexec.mainClass="com.mediaconsensus.downmix.atmosdownmix.FFmpegWrapper"
```

### Running the Node.js Application

To run the Node.js application, use the following command:

```sh
node src/server.js
```

### Running the Tests

#### Running Jest Tests

The project includes unit tests using Jest. To run the tests, use the following command:

```sh
pnpm test
```

#### Running JUnit Tests

To run JUnit tests, use the following commands:

```sh
mvn test
```

To run a specific test class:

```sh
mvn -Dtest=YourTestClass test
```

To run a specific test method in a class:

```sh
mvn -Dtest=YourTestClass#yourTestMethod test
```

### Project Structure

```plaintext
.
├── README.md
├── SPEC.md
├── config
│   └── defaults.js
├── media
│   └── output
├── package-lock.json
├── package.json
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── mediaconsensus
│   │   │           └── downmix
│   │   │               └── atmosdownmix
│   │   │                   ├── DownmixConfig.java
│   │   │                   └── FFmpegWrapper.java
│   │   ├── js
│   │   │   └── ffmpegWrapper.js
│   │   └── resources
│   │       ├── config
│   │       └── media
│   ├── server.js
│   └── test
│       ├── java
│       │   └── com
│       │       └── mediaconsensus
│       │           └── downmix
│       │               └── atmosdownmix
│       │                   └── FFmpegWrapperTest.java
│       ├── js
│       │   └── ffmpegWrapper.test.js
│       └── resources
│           └── media
├── target
│   ├── classes
│   │   ├── com
│   │   │   ├── example
│   │   │   └── mediaconsensus
│   │   ├── config
│   │   │   └── defaults.yaml
│   │   └── media
│   │       └── The Visitor at the Window2_atmos.wav
│   ├── generated-sources
│   │   └── annotations
│   ├── generated-test-sources
│   │   └── test-annotations
│   ├── maven-status
│   │   └── maven-compiler-plugin
│   │       ├── compile
│   │       └── testCompile
│   ├── surefire-reports
│   │   ├── TEST-com.mediaconsensus.atmosdownmix.FFmpegWrapperTest.xml
│   │   ├── TEST-com.mediaconsensus.downmix.atmosdownmix.FFmpegWrapperTest.xml
│   │   ├── com.mediaconsensus.atmosdownmix.FFmpegWrapperTest.txt
│   │   └── com.mediaconsensus.downmix.atmosdownmix.FFmpegWrapperTest.txt
│   └── test-classes
│       ├── com
│       │   └── mediaconsensus
│       └── media
│           ├── The Visitor at the Window2_atmos.wav
│           └── output.wav
└── test
    └── ffmpegWrapper.test.js
```

## FFmpeg 7.x Requirements

Ensure FFmpeg 7.x is installed and properly configured on your system. Here's a quick way to verify your FFmpeg installation:

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

This project is licensed under the ISC License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## Acknowledgements

- Thanks to the FFmpeg developers for their incredible work on the FFmpeg project.
- Thanks to the Dolby team for their contributions to audio technology.

## Author

This tool is written by Matt Carpenter.# Minor change
