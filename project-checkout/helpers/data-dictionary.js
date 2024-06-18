/* eslint-disable prettier/prettier */
const testData = require('../page-objects/datafiles/testdata');
const env = require('../../support/env/env');

function getAddressData(addressType) {
  const isCanada = env.EXEC_SITE.includes('can');
  const isCB2 = env.EXEC_SITE.includes('cb2');
  const canadaLDShippingInfo = isCB2 ? testData.canada.shippingInfoLDCB2 : testData.canada.shippingInfoLD;
  const shippingInfoBFT = isCanada ? testData.canada.shippingInfoBFT : testData.shippingInfoBFT;
  const shippingInfoLD = isCanada ? canadaLDShippingInfo : testData.shippingInfoLD;
  const shippingInfoDefault = isCanada ? testData.canada.shippingInfo : testData.shippingInfo;
  const shippingInfoAVS = isCanada ? testData.canada.shippingInfoAVS : testData.shippingInfoAVS;
  const shippingInfoAVS2 = isCanada ? testData.canada.shippingInfoAVS2 : testData.shippingInfoAVS2;
  const billingInfoDomestic = isCanada ? testData.canada.billingInfoDomestic : testData.billingInfoDomestic;
  const billingInfoDomesticApt = isCanada ? testData.canada.billingInfoDomestic : testData.billingAddressInfo;
  const billingInfoInternational = isCanada ? testData.canada.billingInfoInternational : testData.billingInfoInternational;
  const AutoCorrectionAddress = isCanada ? testData.canada.autoCorrectionAddress : testData.autoCorrectionAddress;

  const addressDictionary = {
    BFT: shippingInfoBFT,
    LD: shippingInfoLD,
    APO: testData.shippingInfoAPO,
    AK: testData.shippingInfoAK,
    AVS: shippingInfoAVS,
    AVS2: shippingInfoAVS2,
    DOMESTIC: billingInfoDomestic,
    DOMESTICAPT: billingInfoDomesticApt,
    INTERNATIONAL: billingInfoInternational,
    ACA: AutoCorrectionAddress
  };
  const shipAddressData = addressDictionary[addressType] || shippingInfoDefault;
  return shipAddressData;
}

module.exports = {
  getAddressData
};
