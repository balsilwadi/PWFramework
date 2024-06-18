const logger = require('../../setup/logger');

class ReportUtils {
  async log(currentPage, msg) {
    if (global.isTestReportEnabled) {
      global.report += `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} - ${currentPage} : ${msg}</br>`;
    }
    logger.info(`${currentPage} : ${msg}`);
  }

  async logHdr(msg) {
    if (global.isTestReportEnabled) {
      global.report += `<strong> <p style="color:blue;">${msg}</p></strong>`;
    }
    logger.info(msg);
  }

  async logTestSnapshot(currentPage, msg) {
    if (global.isTestReportEnabled) {
      global.testSnapshot += `${currentPage} - ${msg}<br>`;
    }
    logger.info(msg);
  }
}

module.exports = { ReportUtils };
