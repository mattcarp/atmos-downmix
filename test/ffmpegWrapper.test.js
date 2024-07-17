const { downmix } = require('../src/ffmpegWrapper');

describe('FFmpeg Downmix Wrapper', () => {
  it('should downmix with default settings', async () => {
    const result = await downmix('input_atmos.mka');
    expect(result).toContain('Success');
  });

  it('should downmix with custom settings', async () => {
    const options = { outputFormat: 'mp3', channels: 1, sampleRate: 44100 };
    const result = await downmix('input_atmos.mka', options);
    expect(result).toContain('Success');
  });
});