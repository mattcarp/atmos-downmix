const { exec } = require('child_process');
const defaults = require('../../../config/defaults');
const util = require('util');
const execPromise = util.promisify(exec);
const { execSync } = require('child_process'); // Add this line to import execSync

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

// Verify FFmpeg version
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