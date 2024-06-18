const { playAudit } = require('playwright-lighthouse');

class Perf {
  static async audit(name) {
    await playAudit({
      page: global.page,
      port: 4999,
      thresholds: {
        performance: 0,
        accesibility: 0,
        seo: 0,
        pwa: 0,
        'best-practices': 0
      },
      reports: {
        formats: {
          html: true,
          json: true
        },
        name,
        directory: `${process.cwd()}/lighthouse-report`
      }
    });
  }
}

module.exports = Perf;
