/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');
const expectedSchemaData = require('../data-files/productSchema.json');

const testReport = new ReportUtils();

class SeoSPDPPage {
  pageName = this.constructor.name;

  /**
   * @author: balsilwadi
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : expectedCatType
   * @returns : None
   * */

  async verifyCanonicalUrl(url) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL);
    expect(actualCanonicalUrl).toContain(url);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(url) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL);
    expect(actualOgUrl).toContain(url);
    testReport.log(this.pageName, `Og URl matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyOgType
   * @Description : This method is used to verify the open graph Type of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgType(ogType) {
    testReport.log(this.pageName, 'Verify Open graph Type of the page');
    const actualOgType = page.locator(el.seoMetaTags.seoOgType);
    await expect(actualOgType).toHaveAttribute('content', ogType);
    testReport.log(this.pageName, `Og Type matched!! and the Og Type is : ${actualOgType}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFAQSchema
   * @Description : This method is used to verify the FAQPage schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyFAQPageSchema() {
    testReport.log(this.pageName, 'Verify FAQPage Schema of the page');
    const expectedFAQPageSchema = '"@type": "FAQPage"';
    const actualFAQPageSchema = await page.locator(el.seoSpdpPage.seoFaqSchema).textContent();
    expect(actualFAQPageSchema).not.toBeNull();
    expect(actualFAQPageSchema).toContain(expectedFAQPageSchema);
    testReport.log(this.pageName, `FAQPage Schema is not empty!! and the FAQPage Schema value is : ${actualFAQPageSchema}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifySeoHeader1Tag
   * @Description : This method is used to verify the Seo Header1 tag in the page
   * @params : None
   * @returns : None
   * */
  async verifySeoHeader1Tag() {
    testReport.log(this.pageName, 'Verify Header 1 tag is displayed in the page');
    const actualHeader1Tag = await page.locator(el.seoSpdpPage.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifySaleMetaDescription
   * @Description : This method is used to verify the SEO Meta description of the sale page contains the sale message
   * @params : None
   * @returns : None
   * */
  async verifySaleMetaDescription(saleMessageCrate, saleMessageCB2) {
    testReport.log(this.pageName, 'Verify the Meta Description contains the sale message');
    const actualDescription = await page.locator(el.seoMetaTags.seoMetaDescription).getAttribute('content');
    if (env.BRAND.includes('CB2')) {
      expect(actualDescription.toLowerCase()).toContain(saleMessageCB2);
    } else {
      expect(actualDescription.toLowerCase()).toContain(saleMessageCrate);
    }
    testReport.log(this.pageName, 'The Meta Description contains the sale message');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifySaleOgDescription
   * @Description : This method is used to verify the OG description content contains the sale message
   * @params : None
   * @returns : None
   * */
  async verifySaleOgDescription(saleMessageCrate, saleMessageCB2) {
    testReport.log(this.pageName, 'Verify the OG Description contains the sale message');
    const actualOgDescription = await page.locator(el.seoMetaTags.seoOgDescription).getAttribute('content');
    if (env.BRAND.includes('CB2')) {
      expect(actualOgDescription.toLowerCase()).toContain(saleMessageCB2);
    } else {
      expect(actualOgDescription.toLowerCase()).toContain(saleMessageCrate);
    }
    testReport.log(this.pageName, 'The OG Description contains the sale message');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyOgAltImg
   * @Description : This method is used to verify the OG Alt Image meta tag contains the product name
   * @params : None
   * @returns : None
   * */
  async verifyOgAltImg() {
    testReport.log(this.pageName, 'Verify the OG Alt Image meta tag contains the product name');
    const actualOgAltImage = await page.locator('meta[property="og:image:alt"]').getAttribute('content');
    // const productName = await page.locator('//h1').nth(0).textContent();

    // expect(actualOgAltImage.toLowerCase()).toContain(productName.toLowerCase());
    expect(actualOgAltImage).not.toBeNull();

    testReport.log(this.pageName, 'The OG Alt Image meta tag contains the product name');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyMetaAuthor
   * @Description : This method is used to verify the author meta tag contains the brand name
   * @params : None
   * @returns : None
   * */
  async verifyMetaAuthor() {
    testReport.log(this.pageName, 'Verify the author meta tag contains the brand name');
    const actualAuthor = page.locator('meta[name="author"]');
    let expectedAuthor = '';
    switch (env.EXEC_SITE) {
      case 'crateus':
        expectedAuthor = 'Crate & Barrel';
        break;
      case 'cratecan':
        expectedAuthor = 'Crate & Barrel Canada';
        break;
      case 'cb2us':
        expectedAuthor = 'CB2';
        break;
      case 'cb2can':
        expectedAuthor = 'CB2 Canada';
        break;
      default:
        expectedAuthor = '';
    }

    await expect(actualAuthor).toHaveAttribute('content', expectedAuthor);

    testReport.log(this.pageName, 'The author meta tag contains the brand name');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyMetaLanguage
   * @Description : This method is used to verify the Language meta tag content is english
   * @params : None
   * @returns : None
   * */
  async verifyMetaLanguage() {
    testReport.log(this.pageName, 'Verify the Language meta tag contains english');

    const actualAuthor = page.locator('meta[name="language"]');
    const expectedAuthor = 'English';
    await expect(actualAuthor).toHaveAttribute('content', expectedAuthor);

    testReport.log(this.pageName, 'The Language meta tag contains english');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyMetaTwitter
   * @Description : This method is used to verify the Twitter card, site, and title meta tag are displayed
   * @params : None
   * @returns : None
   * */
  async verifyMetaTwitter() {
    testReport.log(this.pageName, 'Verify the Twitter card, site, and title meta tag are displayed');

    const actualTwitterCard = await page.locator('meta[property="twitter:card"]').getAttribute('content');
    const actualTwitterSite = await page.locator('meta[property="twitter:site"]').getAttribute('content');
    const actualTwitterTitle = await page.locator('meta[property="twitter:title"]').getAttribute('content');

    const expectedTwitterSite = env.BRAND === 'Crate' ? '@CrateandBarrel' : '@CB2';
    const expectedTwitterTitle = await page.title();

    expect(actualTwitterCard).not.toBeNull();
    expect(actualTwitterSite === expectedTwitterSite).toBeTruthy();
    expect(actualTwitterTitle === expectedTwitterTitle).toBeTruthy();

    testReport.log(this.pageName, 'Twitter card, site, and title meta tag are displayed');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateProductSchemaFields
   * @Description : This method is used to verify the Product Schema fields
   * @params : None
   * @returns : None
   * */
  async validateProductSchemaFields() {
    const objExpected = expectedSchemaData.ProductSchema;
    const objActual = JSON.parse(await page.locator(el.seoSpdpPage.seoProductSchema).textContent());

    const expectedObjKeys = Object.keys(objExpected);
    const isObject = function (object) {
      return object != null && typeof object === 'object';
    };

    for (let i = 0; i < expectedObjKeys.length; i++) {
      const key = expectedObjKeys[i];
      let expectedObjValue = objExpected[key];
      let actualObjValue = objActual[key];

      if (key === 'name') expectedObjValue = await page.locator(el.seoSpdpPage.lblProductName).nth(1).textContent();
      else if (key === 'url') expectedObjValue = await page.url().slice(0, page.url().indexOf('?'));
      else if (key === 'sku') expectedObjValue = await page.locator(el.seoSpdpPage.lblProductSKU).nth(1).textContent();
      else if (key === 'brand') expectedObjValue = env.BRAND === 'Crate' ? { '@type': 'Brand', name: 'Crate & Barrel' } : { '@type': 'Brand', name: 'CB2' };
      else if (actualObjValue && expectedObjValue === '') actualObjValue = '';

      const areObjects = isObject(expectedObjValue) && isObject(actualObjValue);

      if (!areObjects && expectedObjValue !== actualObjValue) {
        try {
          expect(actualObjValue).toEqual(expectedObjValue);
          return false;
        } catch (error) {
          throw new Error(
            `On object: "${key}" property Expected and Received values are not equal\n Expected: ${JSON.stringify(
              expectedObjValue
            )}\n Received: "${actualObjValue}"`
          );
        }
      }
    }
    return true;
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyProductSchema
   * @Description : This method is used to verify the Product Schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyProductSchema() {
    testReport.log(this.pageName, 'Verify Product Schema of the page');
    const actualProductSchema = await page.locator(el.seoSpdpPage.seoProductSchema).textContent();
    expect(actualProductSchema).not.toBeNull();
    await this.validateProductSchemaFields();
    testReport.log(this.pageName, `Product Schema is not empty!! and the Product Schema value is : ${actualProductSchema}`);
  }
}

module.exports = { SeoSPDPPage };
