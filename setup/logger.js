const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, label, printf } = winston.format;
const CATEGORY = 'Playwright Logs';

// Using the printf format.
// const customFormat = printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`);
const customFormat = printf(({ level, message }) => ` ${level}: ${message}`);

// Creating Logger file
const fileRotateTransport = new winston.transports.DailyRotateFile({
  // Setting the filename
  filename: 'logs/Crate_web_US-%DATE%.log',
  // Date pattern for file name its using moment.js
  datePattern: 'YYYY-MM-DD-HH',
  // Maximum 30 days the file will be stored
  maxFiles: '5d',
  level: 'info',
  // Maxmim size of single file is 10MB
  maxsize: '10M', // 5MB
  colorize: true
});

const options = {
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    // Creating logs in console
    new winston.transports.Console({
      level: 'info',
      colorize: false
    }),
    fileRotateTransport
  ]
};

const logger = winston.createLogger(options);

module.exports = logger;
