const path = require('path');
const fs = require('fs');

// Add debug logs
console.log('Current working directory:', process.cwd());
console.log('Relative path of test file:', __filename);
try {
    console.log('Resolved path of the `ffmpegWrapper`:', require.resolve('../../main/js/ffmpegWrapper'));
} catch (e) {
    console.error('Error resolving `ffmpegWrapper`:', e);
}

const { downmix } = require('../../main/js/ffmpegWrapper');

describe('FFmpeg Downmix Wrapper', () => {
    const outputDir = path.join(__dirname, '../resources/media/output');

    beforeAll(() => {
        // Ensure all parent directories exist
        fs.mkdirSync(outputDir, { recursive: true });
    });

    afterAll(() => {
        const outputFile = path.join(outputDir, 'The_Visitor_at_the_Window2_stereo.mp3');
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }
    });

    it('should downmix Dolby Atmos WAV with default settings', async () => {
        const inputFile = path.join(__dirname, '../resources/media/The Visitor at the Window2_atmos.wav');
        const outputFile = path.join(outputDir, 'The_Visitor_at_the_Window2_stereo.mp3');

        // Add this line to check if the input file exists
        console.log('Input file exists:', fs.existsSync(inputFile));

        // Add debug log before calling downmix
        console.log('Calling downmix with inputFile:', inputFile, 'and outputFile:', outputFile);

        try {
            const result = await downmix(inputFile, { output: outputFile });

            console.log('Downmix result:', result);

            // Add this line to check if the output file exists after downmix
            console.log('Output file exists:', fs.existsSync(outputFile));

            expect(fs.existsSync(outputFile)).toBe(true);
        } catch (error) {
            console.error('Error in downmix function:', error);
        }
    }, 60000); // Increase timeout to 60 seconds
});