require('dotenv').config({ override: true, debug: true });
const { execSync } = require('child_process');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_URL = process.env.REPO_URL;

if (!GITHUB_TOKEN || !REPO_URL) {
  console.error('GITHUB_TOKEN or REPO_URL is not set in the .env file');
  process.exit(1);
}

// Log the actual values to ensure they are loaded correctly
console.log('GITHUB_TOKEN:', GITHUB_TOKEN);
console.log('REPO_URL:', REPO_URL);

try {
  // Ensure the command is a string
  const command = `npx release-please release-pr --token=${GITHUB_TOKEN} --repo-url=${REPO_URL} --config-file=release-please-config.json --manifest-file=release-please-manifest.json --debug`;
  if (typeof command !== 'string') {
    throw new TypeError(`Expected a string but got ${typeof command}`);
  }
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to run release-please:', error);
  process.exit(1);
}