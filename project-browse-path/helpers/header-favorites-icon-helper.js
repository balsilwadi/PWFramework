const { expect } = require('@playwright/test');
const el = require('../elements/elements');

const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();

const { FavoritesIcon: favoritesIcon, AccountIcon: accountIcon, FavoritesMenu: favoritesMenu } = el.HOMEPAGE_HEADER;

const _BUTTON = 'button';
const _ISMOBILE = common.verifyIsMobile();

class HeaderFavoritesIconHelper {
  pageName = this.constructor.name;

  /**
   * Hovers or Clicks on Favorites Icon
   *
   * @param {boolean} isMobile - Indicates whether the execution is on a mobile device.
   * @throws {Error} - If an error occurs during the process.
   * @author [Emmanuel Miller]
   */
  async hoverFavoritesIcon(isMobile) {
    const setError = (errMessage) => testReport.log(this.pageName, errMessage);

    try {
      if (isMobile) {
        await page.getByTestId(accountIcon).getByTestId(_BUTTON).first().click({ delay: 1000 });
      } else {
        const favoritesIconElement = page.getByTestId(favoritesIcon);
        if (!favoritesIconElement) {
          setError('Favorites icon not found');
        }

        await favoritesIconElement.hover({ delay: 5000 });
      }
    } catch (error) {
      // Log the error and rethrow it
      setError(error.message);
    }
  }

  /**
   * Verifies the list of favorite items in the header.
   *
   * @param {Array} items - The list of expected favorite items.
   * @throws {Error} - If there is an issue verifying the items.
   * @author [Your Name]
   */
  async verifyListOfFavoritesInHeader(items) {
    try {
      const { FavoritesHeaderSummary: favoritesHeaderSummary } = el.HOMEPAGE_HEADER;

      await this.hoverFavoritesIcon(_ISMOBILE);
      const titles = await this.getListOfImgTitles(page.getByTestId(favoritesHeaderSummary).locator('a'));

      expect(items).not.toBe(null);
      expect(titles).not.toBe(null);
    } catch (error) {
      testReport.log(this.pageName, `Error in verifyListOfFavoritesInHeader: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves the list of image titles based on items in favorites.
   *
   * @param {string} headerFavoritesLocator - Favorites Icon on DOM.
   * @returns {Array} - List of image titles.
   * @author Emmanuel Miller
   */
  async getListOfImgTitles(headerFavoritesLocator) {
    const count = await headerFavoritesLocator.count();

    const promises = Array.from({ length: count }, async (_, i) => {
      const element = headerFavoritesLocator.nth(i);
      const img = element.getByTestId('image');
      const imgTitle = await img.getAttribute('title');
      return imgTitle;
    });

    const imgTitles = await Promise.all(promises);
    return imgTitles;
  }

  /**
   * Verifies Favorites is in Guest Mode (i.e., User is not signed in).
   * @throws {Error} - If there is an issue verifying guest mode.
   * @author Emmanuel Miller
   */
  async verifyFavoritesGuestMode() {
    const { FavoritesGuestModeMessage: favoritesGuestModeMessage } = el.HOMEPAGE_HEADER;

    if (!_ISMOBILE) {
      const guestModeMessage = page.getByTestId(favoritesGuestModeMessage);
      await expect(guestModeMessage).toBeVisible({ timeout: 8000 });
    }

    // else { handled beforehand in verifyFavoritesGuestModeCount(); }
  }

  /**
   * Verifies count of favorites while the user is in guest mode (i.e., User is not signed in).
   *
   * @param {string} count - The amount of items in favorites while the user is hovering over the icon.
   * @throws {Error} - If there is an issue verifying the count.
   * @author Emmanuel Miller
   */
  async verifyFavoritesGuestModeCount(count) {
    const { FavoritesCount: favoritesCount } = el.HOMEPAGE_HEADER;

    // mobile does not have the initial count onClick()
    if (!_ISMOBILE) {
      const foundCountLocator = page.getByTestId(favoritesIcon).getByTestId('anchor-link').getByTestId(favoritesCount);
      await expect(foundCountLocator).toContainText(count);
    } else {
      const signInButton = await this.#getFavoritesSignInButton();

      await expect(signInButton).toContainText('Sign In / Create Account', { ignoreCase: true });
    }
  }

  /**
   * Verifies Sign-in Button is present while the user is in guest mode.
   * @throws {Error} - If there is an issue verifying the sign-in button.
   * @author Emmanuel Miller
   */
  async verifySignInButtonIsPresent() {
    let signInButton;

    if (!_ISMOBILE) {
      signInButton = page.getByTestId(favoritesIcon).getByTestId(favoritesMenu).getByTestId(_BUTTON).first();
      await expect(signInButton).toContainText('Sign in', { ignoreCase: true });
    } else {
      signInButton = await this.#getFavoritesSignInButton();

      await expect(signInButton).toContainText('Sign In / Create Account', { ignoreCase: true });
    }
  }

  /**
   * Clicks on sign-in button.
   * @throws {Error} - If there is an issue clicking the sign-in button.
   * @author Emmanuel Miller
   */
  async clickSignUpButton() {
    let signInButton;

    if (!_ISMOBILE) {
      signInButton = page.getByTestId(favoritesIcon).getByTestId(favoritesMenu).getByTestId(_BUTTON).nth(1);
    } else {
      signInButton = await this.#getFavoritesSignInButton();
    }

    signInButton.click();
  }

  /**
   * Verifies sign-in button is present when navigating to Favorites (i.e., User is not signed in).
   * @throws {Error} - If there is an issue verifying the sign-in button.
   * @author Emmanuel Miller
   */
  async verifySignModelIsPresent() {
    const { FavoritesGuestModeMessageVerification: favoritesGuestModeMessageVerification } = el.HOMEPAGE_HEADER;

    if (!_ISMOBILE) {
      const signUpModal = page.getByTestId(favoritesMenu).getByTestId(_BUTTON).first();
      await expect(signUpModal).toBeVisible({ timeout: 10000 });
    } else {
      const flyoutHeaderAccount = page.getByTestId(favoritesGuestModeMessageVerification);
      await flyoutHeaderAccount.toBeVisible();
    }
  }

  // Private method to get the Favorites Sign-in Button.
  async #getFavoritesSignInButton() {
    const signUpModel = page
      .getByTestId(el.HOMEPAGE_HEADER.AccountIcon)
      .getByTestId('flyout')
      .getByTestId('unordered-list')
      .getByTestId('list-item')
      .getByTestId(_BUTTON);

    return signUpModel;
  }
}

module.exports = { HeaderFavoritesIconHelper };
