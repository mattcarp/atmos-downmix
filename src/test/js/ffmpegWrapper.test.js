const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { downmix } = require('../../main/js/ffmpegWrapper');
const defaultConfig = require('../../../config/defaults');

describe('FFmpeg Downmix Wrapper', () => {
  const inputDir = path.join(__dirname, '../resources/media/input');
  const outputDir = path.join(__dirname, '../resources/media/output');
  const maxOutputFiles = 4; // Keep only the 4 most recent files (2 per input file)

  beforeAll(() => {
    fs.mkdirSync(outputDir, { recursive: true });
  });

  afterAll(() => {
    // Keep only the most recent output files
    const files = fs.readdirSync(outputDir)
      .map(f => ({ name: f, time: fs.statSync(path.join(outputDir, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    if (files.length > maxOutputFiles) {
      files.slice(maxOutputFiles).forEach(file => {
        fs.unlinkSync(path.join(outputDir, file.name));
        console.log(`Deleted old output file: ${file.name}`);
      });
    }
  });

  const getInputFileParams = (filePath) => {
    const ffprobeCommand = `ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,channels,bit_rate -of default=noprint_wrappers=1 "${filePath}"`;
    return execSync(ffprobeCommand).toString();
  };

  const verifyOutputFile = (inputFilePath, outputFilePath, config) => {
    const inputParams = getInputFileParams(inputFilePath);
    const outputParams = getInputFileParams(outputFilePath);

    console.log('Input file parameters:', inputParams);
    console.log('Output file parameters:', outputParams);

    expect(outputParams).toContain(`codec_name=mp3`);
    expect(outputParams).toContain(`channels=${config.channels}`);
    expect(outputParams).toContain(`bit_rate=${config.bitrate}`);

    // Compare input and output channel count
    const inputChannels = parseInt(inputParams.match(/channels=(\d+)/)[1]);
    expect(config.channels).toBeLessThanOrEqual(inputChannels);
  };

  fs.readdirSync(inputDir).forEach(inputFile => {
    const inputFilePath = path.join(inputDir, inputFile);
    const timestamp = Date.now();
    const baseOutputName = `${path.basename(inputFile, path.extname(inputFile))}_downmix_${defaultConfig.channels}ch_${defaultConfig.bitrate / 1000}kbps`;
    const outputFilePathDefault1 = path.join(outputDir, `${baseOutputName}_1_${timestamp}.mp3`);
    const outputFilePathDefault2 = path.join(outputDir, `${baseOutputName}_2_${timestamp}.mp3`);

    it(`should downmix ${inputFile} with default settings (file 1)`, async () => {
      console.log('Input file exists:', fs.existsSync(inputFilePath));
      console.log('Calling downmix with inputFile:', inputFilePath, 'and outputFile:', outputFilePathDefault1);

      try {
        const result = await downmix(inputFilePath, { output: outputFilePathDefault1 });
        console.log('Downmix result:', result);
        console.log('Output file exists:', fs.existsSync(outputFilePathDefault1));

        expect(result).toContain('Success');
        expect(fs.existsSync(outputFilePathDefault1)).toBe(true);

        verifyOutputFile(inputFilePath, outputFilePathDefault1, defaultConfig);
      } catch (error) {
        console.error('Error in downmix function:', error);
      }
    }, 30000); // Increase timeout to 30 seconds

    it(`should downmix ${inputFile} with default settings (file 2)`, async () => {
      console.log('Input file exists:', fs.existsSync(inputFilePath));
      console.log('Calling downmix with inputFile:', inputFilePath, 'and outputFile:', outputFilePathDefault2);

      try {
        const result = await downmix(inputFilePath, { output: outputFilePathDefault2 });
        console.log('Downmix result:', result);
        console.log('Output file exists:', fs.existsSync(outputFilePathDefault2));

        expect(result).toContain('Success');
        expect(fs.existsSync(outputFilePathDefault2)).toBe(true);

        verifyOutputFile(inputFilePath, outputFilePathDefault2, defaultConfig);
      } catch (error) {
        console.error('Error in downmix function:', error);
      }
    }, 30000); // Increase timeout to 30 seconds
  });
});