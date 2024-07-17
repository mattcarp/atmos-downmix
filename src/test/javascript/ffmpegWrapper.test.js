const { downmix } = require('../src/ffmpegWrapper');
const path = require('path');
const fs = require('fs');

describe('FFmpeg Downmix Wrapper', () => {
  const outputDir = path.join(__dirname, '../media/output');
  
  beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  });

  it('should downmix Dolby Atmos WAV with default settings', async () => {
    const inputFile = path.join(__dirname, '../media/The Visitor at the Window2_atmos.wav');
    const outputFile = path.join(outputDir, 'The_Visitor_at_the_Window2_stereo.wav');

    // Add this line to check if the input file exists
    console.log('Input file exists:', fs.existsSync(inputFile));

    const result = await downmix(`"${inputFile}"`, { output: `"${outputFile}"` });
    console.log('Downmix result:', result);

    // Add this line to check if the output file exists after downmix
    console.log('Output file exists:', fs.existsSync(outputFile));

    expect(result).toContain('Success');
    expect(fs.existsSync(outputFile)).toBe(true);
  });

  // Existing test cases for AAC and EC3 files can remain as is
});