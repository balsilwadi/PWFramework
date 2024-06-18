module.exports = {
  SITECOMMON: {
    INTERUPTOR_POPUP_WINDOW: '#popup-content',
    INTERUPTOR_POPUP_CLOSE: '#popup-close',
    lblH1: '(//h1)[1]'
  },

  seoMetaTags: {
    seoMetaDescription: 'meta[name="description"]',
    seoCanonicalLink: 'link[rel="canonical"]',
    seoMetaRobots: 'meta[name="robots"]',
    seoOgSiteName: 'meta[property="og:site_name"]',
    seoOgImage: 'meta[property="og:image"]',
    seoOgUrl: 'meta[property="og:url"]',
    seoOgTitle: 'meta[property="og:title"]',
    seoOgType: 'meta[property="og:type"]',
    seoOgDescription: 'meta[property="og:description"]',
    seoFbAdmins: 'meta[property="fb:admins"]'
  },

  seoSchemaTags: {
    seoWebsiteSchema: '[data-testid=schema-website]',
    seoOrganizationSchema: '[data-testid="schema-organization"]',
    seoBreadcrumbSchema: '[data-testid=schema-breadcrumbs]',
    seoProductCollectionSchema: '.seo-region script'
  },

  seoHeaderTag: {
    seoHeader1Tag: '//h1'
  },

  seoExternalInternalLinksTags: {
    lnkExternalLinkCount: 'a[rel*="noopener"]',
    lnkInternalLinkCount: '//a[contains(@rel,"nofollow")]'
  },

  seoCartPage: {
    seoHeader1Tag: '.top-sigin-pickup > h1'
  },

  seoGeneratedPage: {
    lblSeoPageTitle: '//h1',
    lnkSeoPage: '//a[@class="search-sitemap-result"]',
    lblSeoPlpHeader: '//h1[@class="plp-header"]',
    btnFilter: '//button[@class="filter-toggle-button button-transparent"]',
    lblHideFilter: '//span[@class="filter-button-text"]',
    btnCloseFilter: '[data-testid="modal-close-button"]',
    lblTotalProductCount: '//div[@class="number-count"]',
    btnSortByDropDown: '#top-container-sortBy-btn',
    btnMobileSortByDropDown: '.drawer-header >> span >> nth=1',
    lnkMostRelevant: '(//ul[@class="dropdown-option-warp"]/li)[1]',
    lnkPriceLowToHigh: '(//ul[@class="dropdown-option-warp"]/li)[2]',
    lnkMobilePriceLowToHigh: '[for="top-container-sortBy1"]',
    lnkPriceHighToLow: '(//ul[@class="dropdown-option-warp"]/li)[3]',
    lnkMobilePriceHighToLow: '[for="top-container-sortBy2"]',
    lnkTopRated: '(//ul[@class="dropdown-option-warp"]/li)[4]',
    lnkMobileTopRated: '[for="top-container-sortBy3"]',
    lnkNew: '(//ul[@class="dropdown-option-warp"]/li)[5]',
    lnkMobileNew: '[for="top-container-sortBy4"]',
    lblProductsCount: '.product-detail-description',
    lblPriceElement: 'div >> nth=1',
    lblSalePrice: '.salePrice',
    lblRegularPrice: '.regPrice',
    lblRating: '.review-stars-bar',
    lblNew: '.product-new',
    lblRelatedCategories: '//h2[text()="Related Categories"]',
    lnkRelatedCategoriesCount: '//ul[@id="seo-categories"]/li',
    seoContainer: '//div[@class="section-seo-container"]',
    lblSeoCopyHeader: '//div[@class="section-seo-container"]//h2',
    lblSeoCopy: '//div[@class="section-seo-container"]//p',
    lblPriceFacetCount: '(//label[contains(@for,"Price_shadow")]/span)'
  },

  seoSpategoryPage: {
    seoHeader1Tag: '.primary-header'
  },

  seoSupercategoryPage: {
    seoSuperCategory: '#Nav_Furniture',
    hamburgerMenuMobile: '[aria-controls="main-menu-container"] >> nth=0',
    seoSuperCategoryMobile: '.mobile-menu-drawer-title >> nth=0',
    lnkshopAllFurnitureLink: '#Nav_Nav_Furniture',
    seoHeader1Tag: '.categoryHeaderCopyWrap',
    seoHeader1TagMobile: 'h1',
    lblRelatedCategoriesHeader: '.related-categories > h2',
    lnkRelatedCategories: '#seo-categories > li',
    lblSeoCopyCrate: '.spill-index-content , #mobile-container , .section-seo-container >div > p >> nth=0',
    lblSeoCopyCB2: '.spill-index-content, #mobile-container, .section-seo-container >div > p >> nth=0 '
  },

  seoSearchPage: {
    seoHeader1Tag: '.plp-header-search',
    lnkFinalSaleProduct: '//div[contains(text(),"Final Sale")]/../div[@class="product-name"]/a',
    lnkFirstFinalSaleProduct: '(//div[contains(text(),"Final Sale")]/../div[@class="product-name"]/a)[1]'
  },

  seoPlpPage: {
    seoHeader1Tag: '.plp-header',
    seoFaqSchema: 'head >> script[type="application/ld+json"]'
  },

  seoHomePage: {
    seoSearchActionSchema: '[data-testid=schema-website]',
    seoHeader1Tag: 'h1',
    seoOrganizationSchemaMobile: 'script[type="application/ld+json"] >> nth=2'
  },
  seoGiftCardPage: {
    seoHeader1Tag: 'h1'
  },

  seoLandingPage: {
    seoHeader1Tag: 'h1'
  },

  seoCollectionPage: {
    lnkInternalLinkCount: '//a[contains(@rel,"nofollow") and not(contains(@rel,"noopener"))]',
    seoOrganizationSchemaSCMobile: '.mobile-international  > script, #site-footer > div > script'
  },

  seoStoreLocatorPage: {
    seoHeader1Tag: 'h1',
    seoHeader2Tag: '.store-list-header',
    seoBreadcrumbSchema: '.breadcrumb-container > script'
  },

  StoreListStatePage: {
    lnkViewAllStoresAndFacilities: 'text = View All Stores & Facilities',
    lnkViewStoresByState: '.view-by-state-button',
    lnkStateName: '//a[contains(text(),"',
    lnkStoreInfoContainer: '.store-info-container'
  },

  StoreDetailsPage: {
    btnViewStoreDetails: '//a[contains(text(),"View Store Details")]',
    lnkStoreName: '//span[text() = "',
    btnViewStoreDetail: '//parent::div/ancestor::button/parent::h2/following-sibling::div//a[text()="View Store Details"]',
    seoHeader1Tag: 'h1',
    lnkCb2StoreName: '//h3[text()="',
    txtLocationInputText: '#keyword',
    btnFind: 'text = Find'
  },

  seoSpdpPage: {
    seoHeader1Tag: '(//h1)[2]',
    seoBreadcrumbSchema: '.breadcrumb-container > script',
    seoProductSchema: '[data-testid="schema-product"]',
    lblProductName: '.product-name',
    lblProductSKU: '.sku-number'
  },

  seoMpdpPage: {
    seoHeader1Tag: '(//h1)[2]',
    seoBreadcrumbSchema: '.breadcrumb-container > script',
    seoProductSchema: '(//div[@class = "renderBody"]/script)[2]',
    seoImageGallerySchema: '(//div[@class = "renderBody"]/script)[1]'
  },

  seoCreateGiftRegistry: {
    imgWeddingRegistry: '.gr-hero-copy > img',
    btnCreateARegistry: '//a[text()="Create a Registry"]',
    btnCreateMyRegistry: '//p[text()="CREATE MY REGISTRY"]',
    btnCB2CreateARegistry: '.create-registry-block > div > a',
    btnCB2MobileCreateARegistry: '.create-registry-block > a',
    lnkWeddingRegistry: '[data-testid=Flyout-Wedding-Registry], [data-name=Nav-Wedding-Registry]',
    lnkWeddingRegistryMob: '//div[@class="mobile-menu-drawer-title" and text()="Wedding Registry"]',
    lnkGetStarted: 'text = Get Started',
    lnkFindARegistry: 'text = Find a Registry',
    lnkFindARegistryMobile: '//a[@id="Nav_Nav_WhatsNew_MidCenturyModern" and contains(text(),"Find a Registry")]',
    seoHeader1Tag: 'h1',
    lnkHambergerMenu: '//button[contains(@class,"header-menu-toggle")]',
    lnkWeddingRegistryMobile: '//div[@class="mobile-menu-drawer-title" and text() = "Wedding Registry"]',
    lnkGiftRegistry: 'text = Gift Registry',
    lnkMobileGiveAGift: '.find-registry-block >> nth=1',
    txtFirstName: '#FirstName',
    txtLastName: '#LastName',
    cmbEventType: '#EventTypeCode',
    txtEmail: '#Email',
    btnContinue: 'text = Continue',
    lblH1: 'h1'
  },

  robotsPage: {
    robotsText: '//pre'
  },

  sitemapPage: {
    sitemapTag: '.folder .folder',
    sitemapTagiPhone: '.text',
    xmlAllSitemap: '.line:nth-child(2) span:nth-child(2)'
  },

  seoFreeShipping: {
    lblFreeShipping: '[data-testid="ships-free-label"]',
    lnkFreeShippingItem: '(//div[@data-testid="ships-free-label"]/../../..//a[@class="product-link"])[1]',
    breadcrumbContainer: '.breadcrumb-container',
    lblShipsFree: '//button[text()="Ships Free"]'
  },

  seoKidsPage: {
    lblKidsLogo: '.kids-logo'
  },

  seoSearchGiftRegistry: {
    txtRegistryFirstName: '#txtFindARegistryFirstName , #Firstname',
    txtRegistryLastName: '#txtFindARegistryLastName , #Lastname',
    cmbBoxEventType: '#EventTypeCode',
    btnSearch: '.gr-cms-button-container > button',
    btnSearchCB2: '//button[text()="Search"]',
    btnFindARegistry: '//button[text()="Search"]',
    lnkRegistryDetails: '.registry-details',
    lnkViewRegistry: '.view-registry >> nth=0',
    seoHeaderH1Tag: 'h1 >> .gr-header-reg-info-names '
  }
};
