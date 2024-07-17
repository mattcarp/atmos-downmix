const { exec } = require('child_process');
const defaults = require('../config/defaults');
const util = require('util');
const execPromise = util.promisify(exec);

async function downmix(input, options = {}) {
  const output = options.output || 'output.wav';
  const ffmpegCommand = `ffmpeg -i ${input} -af pan="stereo|c0=FL|c1=FR" ${output}`;

  try {
    const { stdout, stderr } = await execPromise(ffmpegCommand);
    if (stderr) {
      console.error('FFmpeg stderr:', stderr);
    }
    return 'Success: ' + stdout;
  } catch (error) {
    console.error('FFmpeg error:', error);
    return 'Error: ' + error.message;
  }
}

module.exports = { downmix };