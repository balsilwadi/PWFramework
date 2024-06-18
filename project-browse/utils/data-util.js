// the one data util to rule them all
const fs = require('fs');
const { EnvironmentUtils } = require('../../support/utils/env-utils');
const browseDataUtil = require('../browse/browse-data-util.js');

const envUtils = new EnvironmentUtils();

// Keepting these as non-constant so they can be overridden in the testing section:
// eslint-disable-next-line prefer-const
let siteContext = envUtils.site() ? envUtils.site().toLowerCase() : undefined;
// eslint-disable-next-line prefer-const
let countryContext = envUtils.country() ? envUtils.country().toLowerCase() : undefined;
// eslint-disable-next-line prefer-const
let environmentContext = envUtils.environment() ? envUtils.environment().toLowerCase() : undefined;

function getDataFromFile(directory, csvFileName) {
  return fs
    .readFileSync(directory + csvFileName)
    .toString()
    .split('\n')
    .map((e) => e.trim())
    .map((e) => e.split(',').map((x) => x.trim()));
}

function getDataHeaders(data) {
  return data.slice(0, 1)[0];
}

function getDataValues(data) {
  return data.slice(1);
}

function getListOfCsvFilesInTargetDirectory(directory) {
  const fileNamesComplete = fs.readdirSync(directory);
  const fileNames = fileNamesComplete.filter(function (str) {
    return str.includes('csv');
  });
  return fileNames;
}

function getFilteredDataWhereSearchParameterExistsInSpecificColumn(searchParameter, dataContentParameter, columnIndex) {
  return dataContentParameter.filter((row) => row[columnIndex] === searchParameter);
}

// Priority for matching Site, Country, Env:
// 1. matches Site, Country, Env
// 2. matches Site & Env (Country is blank)
// 3. matches Site & Country (Env is blank)
// 4. matches Site (Country & Env are blank)
// 5. matches Env (Site & Country are blank)
// 6. all are blank
function getFilteredDataMatchingEnvData(site, country, environment, dataContentParameter) {
  let result = dataContentParameter.filter((row) => row[0].toLowerCase() === site && row[2].toLowerCase() === environment && row[1].toLowerCase() === country);
  if (result.length < 1) {
    result = dataContentParameter.filter((row) => row[0].toLowerCase() === site && row[2].toLowerCase() === environment && row[1].toLowerCase() === '');
  }
  if (result.length < 1) {
    result = dataContentParameter.filter((row) => row[0].toLowerCase() === site && row[2].toLowerCase() === '' && row[1].toLowerCase() === country);
  }
  if (result.length < 1) {
    result = dataContentParameter.filter((row) => row[0].toLowerCase() === site && row[2].toLowerCase() === '' && row[1].toLowerCase() === '');
  }
  if (result.length < 1) {
    result = dataContentParameter.filter((row) => row[0].toLowerCase() === '' && row[2].toLowerCase() === environment && row[1].toLowerCase() === '');
  }
  if (result.length < 1) {
    result = dataContentParameter.filter((row) => row[0].toLowerCase() === '' && row[2].toLowerCase() === '' && row[1].toLowerCase() === '');
  }

  return result;
}

function filterByDataSourceComponents(domain, dataTag, site, region, directoryString) {
  const files = getListOfCsvFilesInTargetDirectory(directoryString);
  const fileMetaDataArray = [];
  files.forEach((file) => {
    const inputArray = file.replace('.csv', '').split('.');
    const dataSourceArray = inputArray[0].split('-');
    const fileMetaData = {
      domain: dataSourceArray[0],
      dataTag: dataSourceArray[1],
      site: dataSourceArray[2],
      region: dataSourceArray[3],
      fileName: file
    };
    fileMetaDataArray.push(fileMetaData);
  });

  let filteredFiles = fileMetaDataArray;
  if (domain) {
    filteredFiles = filteredFiles.filter(function (fileMetaData) {
      return fileMetaData.domain === domain;
    });
  }
  if (dataTag) {
    filteredFiles = filteredFiles.filter(function (fileMetaData) {
      return fileMetaData.dataTag === dataTag;
    });
  }
  if (site) {
    filteredFiles = filteredFiles.filter(function (fileMetaData) {
      return fileMetaData.site === site;
    });
  }
  if (region) {
    filteredFiles = filteredFiles.filter(function (fileMetaData) {
      return fileMetaData.region === region;
    });
  }
  return filteredFiles.map((x) => x.fileName);
}

function returnResultFromDataPatternMatchString(inputString) {
  // parse input in this format:   BrowseData.PdpDetailKids.url.1
  const inputArray = inputString.split('.');
  if (inputArray.length < 3) {
    throw Error('Insufficient number of pattern match tokens');
  }
  // If no sequence is provided, assume sequence === 1.
  if (inputArray.length < 4) inputArray.push('1');
  const [dataUtilType, dataName, columnName, sequence] = inputArray;

  // use alternate dataUtilSettings for other non-browse data utils going forward.
  let dataUtilSettings;
  if (dataUtilType === 'BrowseData' || dataUtilType === 'BrowseStatic' || dataUtilType === 'BrowseLookup') {
    dataUtilSettings = browseDataUtil.getBrowseDataUtilSettings(dataUtilType);
  } else {
    throw Error(`Data util not configured for ${dataUtilType} type`);
  }

  const { directory } = dataUtilSettings;
  const filteredFiles = filterByDataSourceComponents(
    dataUtilSettings.domain,
    dataUtilSettings.dataTag,
    dataUtilSettings.fileFilterUsesSiteContext ? siteContext : null,
    dataUtilSettings.fileFilterUsesCountryContext ? countryContext : null,
    directory
  );
  if (filteredFiles.length === 0) {
    throw Error('No file matches criteria');
  }

  const data = getDataFromFile(directory, filteredFiles[0]);
  const dataHeaders = getDataHeaders(data);
  const dataValues = getDataValues(data);
  const indexOfColumnName = dataHeaders.indexOf(!dataUtilSettings.columnNameOverride ? columnName : dataUtilSettings.columnNameOverride);

  if (indexOfColumnName < 0) {
    throw Error('Search column Name Not Found');
  }

  let filteredData = getFilteredDataWhereSearchParameterExistsInSpecificColumn(dataName, dataValues, dataUtilSettings.dataNameColumnIndex);
  if (filteredData.length < 1) {
    throw Error('DataName not found');
  }
  filteredData = getFilteredDataWhereSearchParameterExistsInSpecificColumn(sequence, filteredData, dataUtilSettings.sequenceColumnIndex);
  if (filteredData.length < 1) {
    throw Error('Sequence not found');
  }

  if (dataUtilSettings.filterBySiteCountryEnvironment) {
    filteredData = getFilteredDataMatchingEnvData(siteContext, countryContext, environmentContext, filteredData);
    if (filteredData.length < 1) {
      throw Error('site, country, environment match not found');
    }
  }

  return filteredData[0][indexOfColumnName];
}

module.exports = { returnResultFromDataPatternMatchString };

// Testing:
// - run 'node .\data-util.js' from this file's folder, uncomment the test you want to run.
// - uncomment site, country, environment lines immediately above the test you're running.
//
/// / TESTS FOR BROWSE-DATA
// siteContext = 'crate';
// countryContext = 'us';
// environmentContext = '';
// console.log(returnResultFromDataPatternMatchString('BrowseData.Category.url.1')); // returns '/wedding-gift-registry/wedding-guides/'
// console.log(returnResultFromDataPatternMatchString('BrowseData.CategoryKids.url.3')); // returns '/kids/kids-gifts-by-price/'
// console.log(returnResultFromDataPatternMatchString('BrowseData.CategoryKids.url.2')); // returns '/kids/kids-gifts-by-age/'
// console.log(returnResultFromDataPatternMatchString('BrowseData.BadCategory.url.1')); // ERROR: "Data name not found"
// console.log(returnResultFromDataPatternMatchString('BrowseData.CategoryKids.url.8')); // ERROR: "Sequence not found"
// console.log(returnResultFromDataPatternMatchString('BrowseData.Category.badColumnName.1')); // ERROR: "Search column Name Not Found"
// console.log(returnResultFromDataPatternMatchString('FakeData.Category')); // ERROR: 'Insufficient number of pattern match tokens'
// console.log(returnResultFromDataPatternMatchString('FakeData.Category.url.1')); // ERROR: 'Data util not configured for FakeData type'

// TESTS FOR BROWSE-STATIC

// Swap in this data into browse-static to match tests below:
// site, country, environment, name, id, description, url, sequence
// Crate, US, prod, prod-long-mechandised-ship, 100001, "X1", "Y", 1
// Crate,, prod, prod-long-mechandised-ship, 100001, "X2", "Y", 1
// Crate, US,, prod-long-mechandised-ship, 100001, "X3", "Y", 1
// Crate,,, prod-long-mechandised-ship, 100001, "X4", "Y", 1
// ,, prod, prod-long-mechandised-ship, 100001, "X5", "Y", 1
// ,,, prod-long-mechandised-ship, 100001, "X6", "Y", 1
// ,US,prod, prod-long-mechandised-ship, 100001, "X5 rule, but no match", "Y", 1
// ,US,, prod-long-mechandised-ship, 100001, "X6 rule but no match", "Y", 1
// Crate, US,, prod-long-mechandised-deliv, 100002, "X", "Y", 1

// siteContext = 'crate';
// countryContext = 'us';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X1"

// siteContext = 'crate';
// countryContext = 'us1';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X2"

// siteContext = 'crate';
// countryContext = 'us';
// environmentContext = 'prod1';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X3"

// siteContext = 'crate';
// countryContext = 'us1';
// environmentContext = 'prod1';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X4"

// siteContext = 'crate1';
// countryContext = 'us1';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X5"

// siteContext = 'crate1';
// countryContext = 'us1';
// environmentContext = 'prod1';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X6"

// siteContext = 'crate1';
// countryContext = 'us';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X5"

// siteContext = 'crate1';
// countryContext = 'us';
// environmentContext = 'prod1';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X6""

// siteContext = 'crate';
// countryContext = 'ca';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X2"

// siteContext = 'cb2';
// countryContext = 'us';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseStatic.prod-long-mechandised-ship.description.1')); //  returns "X5"

// TESTS FOR BROWSE-LOOKUP

// Swap in this data into browse-static to match tests below:

// site, country, environment, name, value, sequence
// Crate, US,, prod-zipcode, 90210, 1
// Crate, CA,, prod-zipcode, 90210, 1
// CB2, US,, prod-zipcode, 90210, 1
// CB2, CA,, prod-zipcode, 90210, 1
// Crate, US,, prod-store-number, 100, 1
// Crate, CA,, prod-store-number, 101, 1
// CB2, US, Prod, prod-store-number, 200, 1
// CB2, CA,, prod-store-number, 201, 1
// CB2,, Prod, prod-store-number, 201, 1
// , CA, Prod, prod-store-number, 201, 1
// CB2,,, prod-store-number, 201, 1
// ,CA,, prod-store-number, 201, 1
// ,,prod, prod-store-number, 201, 1
// ,,, prod-store-number, 206, 1

// siteContext = 'crate';
// countryContext = 'us';
// environmentContext = 'prod';
// console.log(returnResultFromDataPatternMatchString('BrowseLookup.prod-zipcode.description.1')); //  returns "90210"
// console.log(returnResultFromDataPatternMatchString('BrowseLookup.prod-store-number..1')); //  returns "100"
// console.log(returnResultFromDataPatternMatchString('BrowseLookup.prod-store-number.randomColumnName.1')); //  returns "100"

// siteContext = 'crate1';
// countryContext = 'us1';
// environmentContext = 'prod1';
// console.log(returnResultFromDataPatternMatchString('BrowseLookup.prod-zipcode.description.1')); //  ERROR: site, country, environment match not found
// console.log(returnResultFromDataPatternMatchString('BrowseLookup.prod-store-number..1')); //  returns "206"
// console.log(returnResultFromDataPatternMatchString('BrowseLookup.prod-store-number.randomColumnName.1')); //  returns "206"
