// eslint-disable-next-line import/no-restricted-paths
const { HomePage } = require('./home.page');

class Cb2HomePage extends HomePage {
  constructor(props) {
    super(props);
    this.pageName = 'Wedding Registry Page';
  }

  goto = async () => {
    // navigate("/gift-registry");
  };

  clickCreateRegistry = () => {
    // page.locator("a[Text="Create a Registry"]).click();
  };
}

module.exports = {
  Cb2HomePage
};
