const fileSystem = require('fs');
const env = require('../support/env/env');

class JsonHelper {
  async getProductsData(pageType, categoryType) {
    const obj = JSON.parse(fileSystem.readFileSync(env.PRODUCTS_DATA_JSON_PATH, 'utf-8'));
    const productDetails = obj[pageType][categoryType];
    return productDetails;
  }

  async getSpategoryUri(spategoryName) {
    const categories = await this.getProductsData('PLP', 'spategory');
    const categoryUrl = categories.filter((element) => element.name === spategoryName).url;
    return categoryUrl;
  }

  async getCategoryUri(categoryName) {
    const categories = await this.getProductsData('PLP', 'category');
    const categoryUrl = categories.filter((element) => element.name === categoryName).url;
    return categoryUrl;
  }

  async getRandomCategoryUri() {
    const categories = await this.getProductsData('PLP', 'category');
    const randomCategory = categories[Math.floor(categories.length * Math.random())];
    return randomCategory.url;
  }

  async getRandomWidePlpUri() {
    const widePlps = await this.getProductsData('PLP', 'wide-plp');
    const randomWidePlp = widePlps[Math.floor(widePlps.length * Math.random())];
    return randomWidePlp.url;
  }

  async getRandomwideCollectionPlpUri() {
    const wideCollectionPlps = await this.getProductsData('PLP', 'wide-plp-collection');
    const randomWideCollectionPlp = wideCollectionPlps[Math.floor(wideCollectionPlps.length * Math.random())];
    return randomWideCollectionPlp.url;
  }

  async getRandomSpategoryUri() {
    const categories = await this.getProductsData('PLP', 'spategory');
    const randomCategory = categories[Math.floor(categories.length * Math.random())];
    return randomCategory.url;
  }
}

module.exports = { JsonHelper };
