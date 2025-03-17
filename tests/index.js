const { execSync } = require('child_process');
const path = require('path');

const testDirectory = path.join(__dirname, 'functional');

// --- run all tests inside 'tests/functional
console.log(`Running tests in: ${testDirectory}`);

//execSync(`npx jest ${testDirectory}`, { stdio: 'inherit' });