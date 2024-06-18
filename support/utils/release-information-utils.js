const fetch = require('node-fetch');
const fs = require('fs');

const { ReportUtils } = require('./report-utils');

const logger = new ReportUtils();

const RELEASE_INFORMATION_JSON = './release.json';

class ReleaseInformation {
  pageName = this.constructor.name;

  getReleaseInformation = () => this.#extractValuesFromReleaseInformation(this.#readReleaseInformationFile());

  async getReleaseJsonRequestOutput() {
    const url = `${process.env.BASE_URL}/release.json`;

    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then((response) => response.text())
      .then((data) => {
        fs.writeFile(RELEASE_INFORMATION_JSON, data, (err) => {
          if (err) throw err;
          // fs.unlink('path', () => { /*  if you want to do something */ }) <-- how to delete the file
          logger.log(this.pageName, `RELEASE INFORMATION WRITTEN TO FILE: ${RELEASE_INFORMATION_JSON}`);
        });
      })
      .catch((err) => logger.log(this.pageName, `ERROR WRITING RELEASE INFORMATION TO FILE: ${RELEASE_INFORMATION_JSON}. ERROR: ${err}`));
  }

  #readReleaseInformationFile() {
    let readFile;

    if (fs.existsSync(RELEASE_INFORMATION_JSON)) {
      readFile = fs.readFileSync(RELEASE_INFORMATION_JSON, { encoding: 'utf8' });
    } else {
      logger.log(this.pageName, `Error retrieving .txt file: ${RELEASE_INFORMATION_JSON}`);
    }

    return readFile;
  }

  #validateFileContents(txtFileContents) {
    const unknown = 'unknown';
    const setValidatedReleaseInformation = (hasError, releaseInformation) => ({ hasError, releaseInformation });
    const contentsAreValid = txtFileContents === null || txtFileContents.length === 0;

    return contentsAreValid
      ? setValidatedReleaseInformation(false, txtFileContents.trimStart())
      : setValidatedReleaseInformation(true, { Build: unknown, DeploymentTime: unknown });
  }

  #extractValuesFromReleaseInformation(txtFileContents) {
    const { hasError, releaseInformation } = this.#validateFileContents(txtFileContents);

    if (hasError) {
      logger.log(this.pageName, `INVALID DATA IN FILE`);
      return releaseInformation;
    }

    const parsedReleaseInformation = JSON.parse(releaseInformation);
    return { Build: parsedReleaseInformation.Build, DeploymentTime: parsedReleaseInformation.DeploymentTime };
  }
}

module.exports = { ReleaseInformation };
