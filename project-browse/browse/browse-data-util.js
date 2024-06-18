module.exports = {
  getBrowseDataUtilSettings(browseDataType) {
    const domain = 'browse';
    const directory = '../browse/';
    let dataTag;
    let fileFilterUsesSiteContext;
    let fileFilterUsesCountryContext;
    let columnNameOverride;
    let dataNameColumnIndex;
    let sequenceColumnIndex;
    let filterBySiteCountryEnvironment;

    if (browseDataType === 'BrowseData') {
      dataTag = 'data';
      fileFilterUsesSiteContext = true;
      fileFilterUsesCountryContext = true;
      columnNameOverride = null;
      dataNameColumnIndex = 0;
      sequenceColumnIndex = 4;
      filterBySiteCountryEnvironment = false;
    }
    if (browseDataType === 'BrowseStatic') {
      dataTag = 'static';
      fileFilterUsesSiteContext = false;
      fileFilterUsesCountryContext = false;
      columnNameOverride = null;
      dataNameColumnIndex = 3;
      sequenceColumnIndex = 7;
      filterBySiteCountryEnvironment = true;
    }
    if (browseDataType === 'BrowseLookup') {
      dataTag = 'lookup';
      fileFilterUsesSiteContext = false;
      fileFilterUsesCountryContext = false;
      columnNameOverride = 'value';
      dataNameColumnIndex = 3;
      sequenceColumnIndex = 5;
      filterBySiteCountryEnvironment = true;
    }
    const dataUtilSettings = {
      domain,
      directory,
      dataTag,
      fileFilterUsesSiteContext,
      fileFilterUsesCountryContext,
      columnNameOverride,
      dataNameColumnIndex,
      sequenceColumnIndex,
      filterBySiteCountryEnvironment
    };
    return dataUtilSettings;
  }
};
