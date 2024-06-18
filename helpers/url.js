const appendQueryStrings = (url, keyValuePairs) => {
  let newUrl;
  if (url.indexOf('http') >= 0) {
    // url is absolute
    newUrl = new URL(url);
  } else {
    // url is relative
    newUrl = new URL(url, global.baseURL);
  }

  // loop through array and append appendQueryStrings
  keyValuePairs.forEach(([key, value]) => {
    if (key !== '' && value !== '') {
      newUrl.searchParams.set(key, value);
    }
  });

  return newUrl.toString();
};

module.exports = {
  appendQueryStrings
};
