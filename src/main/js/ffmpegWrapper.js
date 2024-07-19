const { exec } = require('child_process');
const defaults = require('../../../config/defaults');
const util = require('util');
const execPromise = util.promisify(exec);

async function downmix(input, options = {}) {
  const output = options.output || 'output.wav';
  const ffmpegCommand = `ffmpeg -y -i "${input}" -ac 2 "${output}"`;

  // Add debug log before executing the command
  console.log('Executing FFmpeg command:', ffmpegCommand);

  try {
    const startTime = Date.now();
    const { stdout, stderr } = await execPromise(ffmpegCommand);
    const endTime = Date.now();
    console.log(`FFmpeg command executed in ${endTime - startTime} ms`);

    if (stderr) {
      console.error('FFmpeg stderr:', stderr);
    }
    // Add debug log after executing the command
    console.log('FFmpeg stdout:', stdout);
    return stdout;
  } catch (error) {
    console.error('Error executing FFmpeg command:', error);
    throw error;
  }
}

module.exports = { downmix };