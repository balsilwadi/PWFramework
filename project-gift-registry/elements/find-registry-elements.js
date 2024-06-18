module.exports = {
  txtSearchFirstName: '//*[@id="Firstname"] | //*[@id="txtFindARegistryFirstName"]',
  txtSearchLastName: '//*[@id="Lastname"] | //*[@id="txtFindARegistryLastName"]',
  btnFindRegistry: '//*[@class="gr-cms-form-container"]//button | //*[contains(@class,"find-registry-block")]//button | (//*[@type="submit"])[1]',
  txtResultMessage: '//*[@class="result-message hidden-xs"]/span',
  lnkRegistryContainer: '//*[@data-testid="registry-list-item-container"]',
  btnSortBy: '//*[@data-testid="registries-list-sort-by"]',
  txtSortingOptions: '//*[@data-testid="registries-list-sort-by"]/option',
  txtRegistrantNameResults: '(//*[@data-testid="registry-list-item-container"]//h2)[X]',
  txtRegistrantEventDetails: '(//*[@class="event-info"])[X]',
  btnGiveaGift: '(//*[@class="registry-block find-registry-block "])[2]/a'
};
