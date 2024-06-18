const fileSystem = require('fs');
const { ReportUtils } = require('../../support/utils/report-utils');
const env = require('../../support/env/env');

const reporter = new ReportUtils();
class ProductBrowseUtils {
  async getSkuData() {
    const obj = JSON.parse(fileSystem.readFileSync(env.PRODUCTS_BROWSE_SKU_JSON_PATH, 'utf-8'));
    reporter.log(`${obj} was retreived from the json file.`);
    return obj;
  }
}

module.exports = { ProductBrowseUtils };
