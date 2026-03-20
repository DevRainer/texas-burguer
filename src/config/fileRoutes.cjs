const { resolve } = require('node:path');
const express = require('express');

const uploadPath = resolve(__dirname, '..', '..', 'uploads');
const fileRoutesConfig = express.static(uploadPath);

module.exports = fileRoutesConfig;
