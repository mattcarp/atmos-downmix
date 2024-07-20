const { downmix } = require('../../src/main/javascript/ffmpegWrapper');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

describe('FFmpeg Downmix Wrapper', () => {
  const outputDir = path.join(__dirname, '../src/test/resources/media/output');

  beforeAll(() => {
    // Ensure all parent directories exist
    fs.mkdirSync(outputDir, { recursive: true });
  });

  it('should downmix Dolby Atmos WAV with default settings', async () => {
    const inputFile = path.join(__dirname, '../src/test/resources/media/The Visitor at the Window2_atmos.wav');
    const outputFile = path.join(outputDir, 'The_Visitor_at_the_Window2_stereo.mp3');

    const result = await downmix(`"${inputFile}"`, { output: `"${outputFile}"` });
    console.log('Downmix result:', result);

    expect(result).toContain('Success');
    expect(fs.existsSync(outputFile)).toBe(true);

    // Verify output file attributes using ffprobe
    verifyOutputFile(outputFile, { outputFormat: 'mp3', channels: 2, bitrate: 320000 });
  }, 30000); // Increase timeout to 30 seconds

  const verifyOutputFile = (outputFile, config) => {
    const ffprobeOutput = execSync(`ffprobe -v error -show_entries stream=codec_name,channels,bit_rate -of default=noprint_wrappers=1 "${outputFile}"`).toString();
    expect(ffprobeOutput).toContain(`codec_name=${config.outputFormat}`);
    expect(ffprobeOutput).toContain(`channels=${config.channels}`);
    expect(ffprobeOutput).toContain(`bit_rate=${config.bitrate}`);
  };

  // Add more tests for different configurations and edge cases
  it('should downmix with custom settings', async () => {
    const inputFile = path.join(__dirname, '../src/test/resources/media/The Visitor at the Window2_atmos.wav');
    const outputFile = path.join(outputDir, 'The_Visitor_at_the_Window2_custom.mp3');

    const customConfig = { outputFormat: 'mp3', channels: 1, bitrate: 128000 };
    const result = await downmix(`"${inputFile}"`, { output: `"${outputFile}"`, ...customConfig });
    console.log('Downmix result:', result);

    expect(result).toContain('Success');
    expect(fs.existsSync(outputFile)).toBe(true);

    // Verify output file attributes using ffprobe
    verifyOutputFile(outputFile, customConfig);
  }, 30000); // Increase timeout to 30 seconds
});