const apiVersions = require('../data/temp/Registry/api-version.json');

/**
 * @Function : getApiVersion
 * @Description : gets he api version depending on the specified version
 * @Params : endpoint string, version string defaults to active
 * @returns : version selected for endpoint string
 */
async function getApiVersion(endpoint, version = null) {
  const endpointVersions = apiVersions[endpoint];
  if (!endpointVersions) return null;

  if (version) {
    const selectedVersion = endpointVersions[version];
    return selectedVersion != null ? selectedVersion : endpointVersions.active;
  }

  return endpointVersions.active;
}

/**
 * @Function : getAdminApiVersion
 * @Params : endpoint string, version string defaults to active
 * @returns : selected version for admin endpoint string
 */
async function getAdminApiVersion(endpoint, version = null) {
  const endpointVersions = apiVersions.admin[endpoint];
  if (!endpointVersions) return null;

  if (version) {
    const selectedVersion = endpointVersions[version];
    return selectedVersion != null ? selectedVersion : endpointVersions.active;
  }

  return endpointVersions.active;
}

module.exports = {
  getApiVersion,
  getAdminApiVersion
};
