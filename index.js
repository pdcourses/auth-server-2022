const { Buffer } = require('node:buffer');
const sourceStr = 'Basic YWRtaW4=';
const basicValue = sourceStr.split(' ')[1];
const result = Buffer.from(basicValue, 'base64').toString();
console.log(result);