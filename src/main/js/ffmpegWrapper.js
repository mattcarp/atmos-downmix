const { exec } = require('child_process');
const defaults = require('../../../config/defaults');
const util = require('util');
const execPromise = util.promisify(exec);
const { execSync } = require('child_process');

async function downmix(input, options = {}) {
  const output = options.output || `output_${Date.now()}.mp3`;
  const channels = options.channels || defaults.channels;
  const bitrate = options.bitrate || defaults.bitrate;
  const ffmpegCommand = `ffmpeg -y -i "${input}" -ac ${channels} -b:a ${bitrate} "${output}"`;

  console.log('Executing FFmpeg command:', ffmpegCommand);

  try {
    const startTime = Date.now();
    const { stdout, stderr } = await execPromise(ffmpegCommand);
    const endTime = Date.now();
    console.log(`FFmpeg command executed in ${endTime - startTime} ms`);

    if (stderr) {
      console.error('FFmpeg stderr:', stderr);
    }
    console.log('FFmpeg stdout:', stdout);
    return 'Success';
  } catch (error) {
    console.error('Error executing FFmpeg command:', error);
    throw error;
  }
}

try {
  const ffmpegVersion = execSync('ffmpeg -version').toString();
  if (!ffmpegVersion.includes('7.0.1')) {
    throw new Error('FFmpeg version 7.0.1 is required.');
  }
  console.log('FFmpeg version is correct:', ffmpegVersion);
} catch (error) {
  console.error('Error verifying FFmpeg version:', error.message);
  process.exit(1);
}

module.exports = { downmix };