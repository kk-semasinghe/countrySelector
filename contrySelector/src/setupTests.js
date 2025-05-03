// src/setupTests.js
import '@testing-library/jest-dom';

// Mock TextEncoder and TextDecoder for Jest
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
