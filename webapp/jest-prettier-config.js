const { resolve } = require('path');

module.exports = {
    rootDir: resolve(__dirname),
    displayName: 'prettier',
    runner: '@wldcordeiro-stuffz/jest-runner-prettier',
    testMatch: ['<rootDir>/{packages}/**/*.(js|jsx)?', '<rootDir>/*.(js|jsx)'],
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
    moduleFileExtensions: ['js', 'jsx']
};
