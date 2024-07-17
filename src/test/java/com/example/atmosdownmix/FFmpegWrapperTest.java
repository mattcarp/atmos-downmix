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
    const result = await downmix(`"${inputFile}"`, { output: `"${outputFile}"` });
    expect(result).toContain('Success');
    expect(fs.existsSync(outputFile)).toBe(true);
  });

  // Existing test cases for AAC and EC3 files can remain as is
});