const reporter = require('cucumber-html-reporter');
const cukemerge = require('cucumber-json-merge');
const fs = require('fs');
const { ReleaseInformation } = require('./utils/release-information-utils');

const releaseInformation = new ReleaseInformation();

let options = {};

try {
  const { Build, DeploymentTime } = releaseInformation.getReleaseInformation();
  if (fs.existsSync('reports/testResults_rerun.json')) {
    const jsonData = fs.readFileSync('reports/testResults_rerun.json', 'utf8');
    const jsonArray = JSON.parse(jsonData);
    const textToPrepend = ' Rerun_';
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of jsonArray) {
      obj.name = textToPrepend + obj.name;
    }
    const updatedJsonData = JSON.stringify(jsonArray, null, 2);
    fs.writeFileSync('reports/testResults_rerun.json', updatedJsonData, 'utf8');
  }
  let filenames = cukemerge.listJsonFiles('reports', false);
  const filenameSubstringsToRemove = ['step-definitions.json', 'merged_cucumber_report.json'];
  filenames = filenames.filter((filename) => !filenameSubstringsToRemove.some((substring) => filename.includes(substring)));

  const merged = cukemerge.mergeFiles(filenames);
  cukemerge.writeMergedFile(`reports/merged_cucumber_report.json`, merged, 'reports');
  options = {
    theme: 'hierarchy', // 'bootstrap', 'hierarchy', 'foundation', 'simple'
    jsonFile: `reports/merged_cucumber_report.json`,
    output: `reports/cucumberReport.html`,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    brandTitle: '<img src="./crate-barrel-logo.jpg" width="150px" height="auto" ">Enterprise Automation Test Report',
    metadata: {
      Env: process.env.env,
      Device: process.env.device,
      'Test executed at': new Date().toJSON().slice(0, 16).replace(':', '-'),
      Build,
      'Deployed on': DeploymentTime
    }
  };
  reporter.generate(options);
} catch (e) {
  throw new Error('error in generating report. check if report json generated => ', e);
}
