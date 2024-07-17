const { exec } = require('child_process');
const defaults = require('../config/defaults');

function generateFFmpegCommand(inputFile, options = {}) {
  const config = { ...defaults, ...options };
  return `ffmpeg -i ${inputFile} -ac ${config.channels} -ar ${config.sampleRate} output.${config.outputFormat}`;
}

function downmix(inputFile, options) {
  const command = generateFFmpegCommand(inputFile, options);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(`Success: ${stdout}`);
      }
    });
  });
}

module.exports = { downmix };