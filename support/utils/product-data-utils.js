const fileSystem = require('fs');
const { ReportUtils } = require('./report-utils');
const env = require('../env/env');

const reporter = new ReportUtils();
class ProductUtils {
  async getSkuData() {
    const obj = JSON.parse(fileSystem.readFileSync(env.PRODUCTS_SKU_JSON_PATH, 'utf-8'));
    reporter.log(`${obj} was retreived from the json file.`);
    return obj;
  }
}

module.exports = { ProductUtils };
