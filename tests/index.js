const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const errors = require('../errors');

const testDirectory = path.join(__dirname, 'functional');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- list all test files
const testFiles = fs.readdirSync(testDirectory)
    .filter(file => file.endsWith('.test.js'))
    .map((file, index) => ({
        index: index + 1,
        name: file,
        displayName: file.replace('.test.js', '').toUpperCase()
    }));

if (testFiles.length === 0) {
    console.log('No test files found.');
    process.exit(1);
}

console.log('Available tests:');
testFiles.forEach(test => console.log(`${test.index}. ${test.displayName}`));

// --- prompt user for a test to run
const promptTestSelection = () => {
    rl.question('Enter the number for the test you want to run: ', (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Exiting.');
            rl.close();
            process.exit(0);
        }

        const selectedTest = testFiles.find(test => test.index === parseInt(input, 10));

        if (!selectedTest) {
            console.log(errors.MSG_INVALID_NUMBER);
            return promptTestSelection();
        }

        const testPath = path.relative(process.cwd(), path.join(testDirectory, selectedTest.name)).replace(/\\/g, '/');
        console.log(`Resolved test path: ${testPath}`);
        const testContent = fs.readFileSync(testPath, 'utf8');

    // --- check if the test file has @requiresInput metadata
        const requiresInputMatch = testContent.match(/@requiresInput (\w+)/);
        if(requiresInputMatch) {
            const inputVariable = requiresInputMatch[1];

            rl.question(`Enter a value for ${inputVariable}: `, (userInput) => {
                if (!userInput.trim()) {
                    console.log(`Invalid input: ${inputVariable} cannot be empty.`);
                    return promptTestSelection();
                }

                console.log(`Running test: ${selectedTest.name} with ${inputVariable}=${userInput}`);
                rl.close();

                try {
            // --- Cross-platform fix for setting environment variables
                    const envVars = { ...process.env, NODE_ENV: 'test', [inputVariable]: userInput };

                    try {
                        console.log(`Running command: npx jest "${testPath}"`);
                        execSync(`npx jest ${testPath}`, { stdio: 'inherit', env: envVars });
                    } catch (err) {
                        console.log(errors.MSG_TEST_ERROR, err);
                        process.exit(1);
                    }

                } catch (err) {
                    console.error(errors.MSG_TEST_ERROR, err);
                    process.exit(1);
                }
            });
        } else {
            console.log(`Running test: ${selectedTest.name}`);
            rl.close();

            try {
                execSync(`npx jest ${testPath}`, { stdio: 'inherit' });
            } catch (err) {
                console.error(errors.MSG_TEST_ERROR, err);
                process.exit(1);
            }
        }
    });
};

promptTestSelection();