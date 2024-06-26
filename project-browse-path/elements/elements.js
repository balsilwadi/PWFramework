const { EnvironmentUtils } = require('../../support/utils/env-utils');

const envUtils = new EnvironmentUtils();

module.exports = {
  SITECOMMON: {
    INTERUPTOR_POPUP_CLOSE: '#popup-close',
    mdlInterrupterShortBanner: '#email-signup-banner-close',
    CONTINUE_TO_CANADA: "//button[@type='button'][contains(.,'Continue to Canadian Site')]"
  },

  HOMEPAGE_HEADER: {
    CrateKids: "(//a[contains(@data-testid,'anchor-link')])[2]",
    CrateCore: "(//a[contains(@data-testid,'anchor-link')])[1]",
    lblDataBanner1: "(//span[contains(@class,'eyebrow')])[1]",
    crateKidsMobile: "//button[@aria-controls='navigation-kids']",
    kidsNavMobile: '#Nav-kids-kids',
    btnViewCart: 'text=View Cart',
    listOfCartItems: '[class="flyout-list-items"]',
    MapPinDropdownIcon: 'header-location',
    MapPinZipCodeDropDown: 'header-zip-container',
    FavoritesIcon: 'header-favorites',
    AccountIcon: 'header-account-container',
    CartIcon: 'header-cart-container',
    CartProductQtyTestId: 'cart-product-qty',
    CartTextMessageGuestMode: 'cart-text-msg',
    FavoritesGuestModeMessage: 'favorites-header',
    FavoritesHeaderSummary: 'header-favorites-summary',
    FavoritesCount: 'favorites-count',
    FavoritesMenu: 'favorites-menu',
    FavoritesAddButtonSelector: 'list-item-0',
    FavoritesPopupClose: 'modal-close-button',
    FavoritesGuestModeMessageVerification: 'flyout-header-account'
  },

  NAVIGATION: {
    DesktopSuperCategory: "//a[contains(@class,'primary-nav-link') and text()='",
    DesktopSubCategory: "//a[contains(@class,'nav-subcategory-links') and text()='",
    DesktopCategory: "//*[contains(@class,'nav-plp-link') and text()='",
    DesktopSPCategory: "//a[contains(@class,'nav-subcategory-header') and text()='",
    MobileSuperCategory: "//*[@class='mobile-menu-drawer-title ' and text()='",
    MobileSubCategory: "//*[@class='mobile-menu-drawer-title' and text()='",
    MobileCategory: `//*[@class='${envUtils.isCb2() ? 'ds-link_2Vhbb ' : 'ds-link_3hhHd '}' and text()='`,
    MobileSPCategory: "//a[@class='ds-link_3hhHd '][contains(.,'",
    MobileAncestor: "']//ancestor::h2//following-sibling::div/div/div/h2/a",
    MobileMenuDrawer: "//div[@class='mobile-menu-drawer-title'][contains(.,'",
    Text: "//*[text()='",
    Ancestor: "']//ancestor::h2//following-sibling::div//h3/a[1]"
  },

  PRIMARY_CATEGORY: {
    Furniture: "//a[@id='Nav_Furniture']",
    Outdoor: "//a[@id='Nav_Outdoor']",
    TableTopBar: "//a[@id='Nav_Tabletop-&-Bar']",
    Kitchen: "//a[@id='Nav_Kitchen']",
    DecorPillows: "//a[@id='Nav_Decor-&-Pillows']",
    Rugs: "//a[@id='Nav_Rugs']",
    Lighting: "//a[@id='Nav_Lighting']",
    Window: "//a[@id='Nav_Window']",
    BeddingBath: "//a[@id='Nav_Bedding-&-Bath']",
    Holidays: "//a[@id='Nav_Holidays']",
    Gifts: "//a[@id='Nav_Gifts']",
    Sale: "//a[@id='Nav_Sale']",
    Kids: "//a[@id='Nav_&kids']",
    KidsKids: "(//a[contains(@id,'Nav_Kids_kids')]",
    KidsBaby: "//a[contains(@id,'Nav_Baby_kids')]",
    KidsFurniture: "//a[contains(@id,'Nav_Furniture_kids')]",
    KidsBeddingBath: "//a[@id='Nav_Bedding-&-Bath_kids']",
    KidsDecorAccessories: "//a[contains(@id,'Nav_Decor-&-Accessories_kids')]",
    KidsRugs: "//a[contains(@id,'Nav_Rugs_kids')]",
    KidsLighting: "//a[contains(@id,'Nav_Lighting_kids')]",
    KidsToys: "//a[contains(@id,'Nav_Toys_kids')]",
    KidsStorage: "//a[contains(@id,'Nav_Storage_kids')]",
    KidsGear: "//a[contains(@id,'Nav_Gear_kids')]",
    KidsGifts: "//a[contains(@id,'Nav_Gifts_kids')]",
    KidsHoliday: "//a[contains(@id,'Nav_Holiday_kids')]",
    KidsSale: "//a[contains(@id,'Nav_Sale_kids')]"
  },

  HEADER_MOBILE: {
    MobileMenu: 'header-menu-toggle',
    SiteHeaderMobile: 'site-header-mobile'
  },

  SECONDARY_CATEGORY: {
    CrateWeddingRegistry: "//a[@id='Nav_Wedding-Registry']",
    FreeDesignServices: "//a[@id='Nav_Free-Design-Services']",
    TradeProgram: "//a[@id='Nav_Trade-Program']",
    Collborations: "//a[contains(@id,'Nav_Collaborations')]",
    Instock: "///button[contains(.,'In-Stock')]",
    BlackFridayDeals: "//a[@id='Nav_Black-Friday-Deals']",
    ThanksGiving: "//a[@id='Nav_Thanksgiving']",
    Christmas: "//a[@id='Nav_Christmas']",
    KidsBabyRegistry: "//a[@id='Nav_Baby-Registry_kids']",
    KidsFreeDesignServices: "//a[@id='Nav_Free-Design-Services_kids']",
    KidsTradeProgram: "//a[@id='Nav_Trade-Program_kids']",
    KidsCollaborations: "//a[@id='Nav_Collaborations_kids']",
    KidsInStock: "//button[contains(@aria-controls,'Flyout_In-Stock_kids')]",
    KidsChristmas: "//a[@id='Nav_Christmas_kids']",
    KidsBlackFridayDeals: "//a[@id='Nav_Black-Friday-Deals_kids']"
  },

  SPCATEGORY: {
    ShopAllKidsBedding: "//a[contains(.,'Shop All Kids Bedding')]",
    ShopAllTableLinens: "//a[contains(.,'Shop All Table Linens')]",
    ShopAllCutlery: "//a[contains(.,'Shop All Cutlery')]",
    ShopAllPillows: "//a[contains(.,'Shop All Pillows & Throws')]",
    PrimaryHeader: "//*[@class='primary-header']",
    TitleSpcategory: "(//span[@class='section-renew-header'])",
    ViewAll: "(//*[@class='spategory-view-all-container'])",
    ShopAll: "(//*[@class='spategory-title-container'])",
    PrimaryHeaderDataTestId: 'primary-header',
    SectionRenewHeader: 'section-renew-header',
    SpategoryViewAllContainer: 'spategory-view-all-container',
    TitleCarousel: "(//h3[@class='detail-name'])",
    ShopAllBath: "//a[@class='ds-link_3hhHd '][contains(.,'Shop All Bath')]",
    SpategoryFavorites: "(//*[@class='plp-main-section spategory-section-container']",
    ProductName: "//*[@class='product-name-text']",
    RegPrice: "//*[@class='regPrice']",
    Sustainability: "//*[@class='sustainability-icon-image sustainability-icon-image-Organic']",
    OekoTex: "//*[@class='sustainability-icon-image sustainability-icon-image-STANDARD 100 by OEKO-TEX® Certified Product']",
    ShippingMsg: "//*[@class='product-shipping-msg']",
    Title: "//div[@class='plp-main-section spategory-section-container']",
    OPmsg: "//*[@class='opMsg']",
    lnkShopAll: "(//*[@class='section-renew-header'])",
    ProductNameDataTestId: 'product-name-text',
    SpategorySubwayCarousel: 'spategory-subway-carousel'
  },

  SUB_CATEGORY: {
    KidsBedding: "//a[@id='Nav_Bedding-&-Bath_Kids-Bedding_kids']",
    TableLinens: "//a[@id='Nav_Tabletop-&-Bar_Table-Linens']",
    Cutlery: "//a[@id='Nav_Kitchen_Cutlery']",
    PillowsThrows: "//a[@id='Nav_Decor-&-Pillows_Pillows-&-Throws']",
    Bath: "//a[@id='Nav_Bedding-&-Bath_Bath']"
  },

  CATEGORY: {
    AllkidsBedding: "//a[@id='Nav_Bedding-&-Bath_Kids-Bedding_All-Kids-Bedding_kids']",
    Napkins: "//a[@id='Nav_Tabletop-&-Bar_Table-Linens_Napkins']",
    SteakKnives: "//a[@id='Nav_Kitchen_Cutlery_Steak-Knives']",
    ThrowPillows: "//a[@id='Nav_Decor-&-Pillows_Pillows-&-Throws_Throw-Pillows']"
  },

  ACCOUNT_FLYOUT_MENU_ITEMS: {
    HeaderAccount: "//*[@class='header-account']",
    SignIn_CreateAccount: "//*[text()='Sign In / Create Account']",
    TrackOrders_ScheduleDelivery: "//*[text()='Track Orders / Schedule Delivery']",
    CreateRegistry: "//*[text()='Create a Registry']",
    MyFavorites: "//*[text()='My Favorites']",
    MyRegistries: "//*[text()='My Registries']",
    MyDesignPackages: "//*[text()='My Design Packages']",
    Rewards: "(//a[@class='ds-link_3hhHd a11y-link'])[7]",
    CrateBarrelCreditCard: "//*[text()='Crate & Barrel Credit Card']",
    ManageCBCreditCard: "//*[text()='Manage Crate & Barrel Credit Card']",
    SignOut: "//*[text()='Sign Out']",
    CountryName: "//*[@class='country-name']",
    FlyoutCloseButton: "(//*[contains(@class,'button-flyout-close')])[2]",
    HeaderGreetings: "//*[@class='header-account-link header-greetings']",
    MenuCloseButton: "(//*[contains(@class, 'button-menu-close')])[1]",
    HeaderRewardsGreetings: "//*[@class='rewards-link']"
  },

  ACCOUNT_LINK_CONTAINER: {
    AccountHover: "//*[@class='account-link-container']",
    //* [@class='dsButtonTransparent_6ijzy account-icon-link account-login-button']",
    SignIn_CreateAccount: "//button[contains(.,'Sign In / Create Account')]",
    MyAccount: "//a[contains(.,'My Account')]",
    TrackOrders_ScheduleDelivery: "//a[contains(.,'Track Orders / Schedule Delivery')]",
    CreateRegistry: "//a[contains(.,'Create a Registry')]",
    MyRegistries: "(//a[contains(.,'My Registries')])",
    MyDesignPackages: "(//a[contains(.,'My Design Packages')])[1]",
    CrateBarrelCreditCard: "//a[contains(.,'Crate & Barrel Credit Card')]",
    CB2CreditCard: "//a[contains(.,'CB2 Credit Card')]",
    Rewards: "(//a[@href='/account/rewards/'])[1]",
    SignOut: "(//button[contains(.,'Sign Out')])[1]",
    AnchorLink: "//a[contains(@class,'account-link')] | //p[contains(@class,'header-account-greeting')]",
    CB2AnchorLink: "//p[@class='header-account-greeting']",
    ManageCrateBarrelCreditCard: "//a[contains(.,'Manage Crate & Barrel Credit Card (Opens in new window)')]"
  },

  PLP_INFO: {
    headerTitle: "//h1[contains(@class,'plp-header')]",
    PLPheaderTitle: 'plp-header',
    SuperCategoryHeaderTitle: "//*[@class='SuperCategoryHeader super-category-header']",
    MobileSuperCategoryHeaderTitle: "(//div[@class='category-content'])[1]//h1",
    MobileFilterAndSortOptions: {
      SliderTrack: 'slider-track',
      PlpFilterFacets: 'plp-filter-facets',
      SortBySection: 'sort-by-section',
      FilterPanelFooter: 'filter-panel-footer',
      FilterPanelFooterButton: 'filter-panel-footer-button'
    },
    DesktopFilterAndSortOptions: {
      DropDownFilter: 'dropdown-filter',
      DropDownOptionWrap: 'dropdown-option-warp',
      SortByButton: 'top-container-sortBy-btn'
    },
    PlpMainSection: 'plp-main-section',
    CardDeckContainer: 'card-deck-container',
    Filter: "//span[contains(@class,'filter-button-text')]",
    MobileFilterSort: "//button[contains(@class,'a11y-drawer-button')]//span[@class='filter-type-title' and text()='Sort By']",
    MostRelavent1: "//button[contains(.,'Most Relevant')]",
    MostRelavent: "(//*[text()='Most Relevant'])[1]",
    ViewAll: "//label[contains(.,'View All')]",
    ShipFourWeeks: "//label[contains(.,'Ships Within 4 Weeks')]",
    ReadyToShip: "//label[contains(.,'Ready to Ship')]",
    Pickup: "//label[contains(.,'Pickup')]",
    ItemCount: "//div[@class='number-count']",
    Breadcrumbpath1: "(//a[@class='text-xs'])[1]",
    Breadcrumbpath2: "(//a[@class='text-xs'])[2]",
    Breadcrumbpath3: "(//a[@class='text-xs'])[3]",
    Breadcrumbpath4: "(//a[@class='text-xs'])[4]",
    ItemImage: "(//img[contains(@class,'product-image')])[1]",
    ItemColorbar: "(//span[contains(@class,'colorbar-radio-img-container')])[1]",
    ItemColorbarMore: "(//span[contains(@class,'colorbar-show-more-text')])[1]",
    ItemTitle: "(//span[contains(@class,'product-name-text')])[1]",
    ItemRegPrice: "(//span[@class='regPrice'])[1]",
    ItemSalePrice: "(//span[@class='salePrice'])[1]",
    ItemFreeShipping: "(//div[@class='product-shipping-msg'])[1]",
    ItemPersonalization: "(//div[contains(@class,'product-shipping-msg personalization-llm')])[1]",
    ZipcodeValue: "//div[contains(@class,'sub-title')]",
    Zipcode: "//div[@class='sub-title'][contains(.,'Zip Code:')]",
    CB2Zipcode: "//div[@class='sub-title'][contains(.,'Zip:')]",
    ZipcodeValue1: "//button[contains(@class,'reveal-content-toggle')]",
    btnZipcodeValue: "//button[contains(@class,'reveal-content-toggle button-transparent')]",
    inputZipcode: "(//*[@id='txtZipCode'])[2]",
    btnZipcodeEnter: "(//*[@id='applyZip'])[2]",
    ShopByCategory: "//h2[@class='section-header'][contains(.,'Shop by Category')]",
    CB2Facebook: "//*[@class ='social-icon-facebook track-ddl-link']",
    storeName: "//span[@class='selected-store-name']",
    pickedUpText: "//span[contains(.,'Pickup at')]",
    selectedStoreLabel: "//span[@class='selected-store-name']",
    FavoriteIconOnProduct: '.button-add-to-favorite button button-secondary button-xl nsInt',
    SaveToFavorites: (sku) => `li[data-testid="${sku}"] button[title="Save to Favorites"]` // this needs to be changed.. there is no longer id (data-id or data-testid={sku})
  },

  STORE_POPUP: {
    PopupHeaderLabel: "//h1[contains(.,'Select Your Pick Up Location')]",
    EnterZipCodeLabel: "//label[contains(.,'Enter ZIP Code')]",
    inputZipcode: "//input[@class='input-md input-zip']",
    SubmitZipcode: "//button[contains(.,'Submit ZIP Code')]",
    CloseButton: "//button[@id='popup-close']",
    StoreName: "(//h2[@class='store-name'])[1]",
    CityStateZipcode: "(//span[@class='city-state-zipcode'])[1]",
    ThisIsMyStore: "//span[contains(.,'This Is My Store')]",
    MakeThisStore: "(//button[contains(.,'Make This My Store')])[1]",
    viewALLStores: "//a[contains(.,'View all stores')]"
  },

  PDP_INFO: {
    ZipcodeValue: "(//button[contains(@class,'button-transparent zip-code-display')])[1]",
    ShipIt: "//label[contains(text(),'Ship It')]",
    ShipItCB2: "//label[contains(text(),'Ship')]",
    AddToCart: "//*[@id='addToCartButton']",
    radioButtonShipIt: "(//*[@class='a11y-radio-label availability-label'])[1]",
    InStockReadyToShip: "(//span[contains(text(),'In stock and ready to ship')])[1]",
    ShipsFree: "(//button[contains(text(),'Ships Free')])[1]",
    FreeShippingEligible: "(//button[contains(text(),'Free Shipping Eligible')])[1]",
    FreeCrubsidePickup: "//label[contains(.,'FREE CURBSIDE PICKUP AT STORE')]",
    radioButtonFreeCrubsidePickup: "(//*[@class='a11y-radio-label availability-label'])[2]",
    StoreTitle: "(//*[@class='llm-store-title'])[1]",
    StoreMessage: "(//*[@class='llm-store-message'])[1]",
    SeeOtherStores: "(//*[@class='button-transparent view-in-store'])[1]",
    PromoBanner: "//*[@class='promo-bar-text text-md-reg']"
  },

  FOOTER: {
    FooterQuickLinksList: "//ul[@class='footer-quick-links-list']",
    ContactUs: "//h2[contains(.,'Contact Us')]",
    PhoneNumber: "a[href='sms:3127791979']",
    cb2PhoneNumber: "a[href='sms:5103992206']",
    WeekdayHours: "//span[@class='weekdays-hours']",
    WeekendHours: "//span[@class='weekend-hours']",
    CrateBarrelCreditCard: "//h2[contains(.,'Credit Card')]",
    PromoDescription:
      "//span[contains(.,'Earn Reward Dollars every time you shop* (excluding special financing purchases), plus get access to special offers and events.')]",
    ApplyNow: "//a[normalize-space()='Apply Now']",
    ManageyourAccount: "//a[normalize-space()='Manage Account']",
    OrderTrackingSchedulDelivery: "//h2[contains(.,'Order Tracking & Schedule Delivery')]|//a[contains(.,'Order Tracking & Schedule Delivery')]",
    OrderTrackingDescription: "//span[contains(.,'Find out when your online purchase will arrive or schedule a delivery.')]",
    TackYourOrder: "//a[contains(.,'Track Your Order')]",
    ScheduledDelivery: "(//a[contains(.,'Schedule Delivery')])[2]",
    WeddingRegistryDesktop: "//img[@alt='Crate and Barrel - The Wedding Registry']",
    FooterLinks: "//div[@class='footer-links']",
    OurCompany: "//h2[contains(.,'Our Company')]",
    AboutUs: "//a[normalize-space()='About Us']",
    Careers: "//a[contains(.,'Careers (opens in new window)')]",
    ResponsibleDesign: "(//a[contains(.,'Responsible Design')])[3]",
    StoreLocation: "//a[contains(.,'Store Locations and Events')]",

    Resources: "//h2[contains(.,'Resources')]",
    CustomerService: "//a[@href='/customer-service/']",
    Account: "(//button[contains(.,'Account')])[2]",
    AccountPopup: "//h2[contains(.,'Create an Account')]",
    ClosePopup: "//*[@class='svg-icon-close']",
    ReturnPolicy: "//a[contains(.,'Return Policy')]",
    ShippingInformation: "//a[contains(.,'Shipping Information')]",
    EmailPreferences: "//a[contains(.,'Shipping Information')]",
    GiftCards: "(//a[contains(.,'Gift Cards')])[3]",
    GiftCardsMobile: "(//div[contains(@class, 'mobile-footer-content')]//a[@href='/gift-cards/'])",
    Catalogs: "//a[contains(.,'Catalogs')]",
    ProductRecalls: "//a[contains(.,'Product Recalls')]",
    AccessibilityStatement: "//a[contains(.,'Accessibility Statement')]",
    CASupplyChainAct: "//a[contains(.,'CA Supply Chains Act')]",
    DoNotSellInfo: "//a[contains(.,'Do Not Sell or Share My Personal Information')]",
    CookieSettings: "//button[contains(.,'Cookie Settings')]",
    policypopup: "//div[@id='pc-policy-text']",
    policyPopupOk: "(//button[contains(.,'OK')])[1]",
    ShoppingApp: "//h2[contains(.,'Shopping App')]",
    FooterAppText: "//span[contains(.,'Try our View in Your Room feature, manage registries and save payment info.')]",
    FooterAppTextMobile: "//p[contains(.,'Try our View in Your Room feature, manage registries and save payment info.')]",
    DownloadiOSApp: "//*[@class='svg-icon-app-store']",
    SocialMedia: "//h2[contains(.,'Social Media')]",
    SocialMediaLinks: "//*[contains(@class, 'track-ddl-link')]",
    SocailMediaMobile: "//*[@class='mobile-social-media']",
    Facebook: "//*[@class='icon svg-icon-facebook']",
    Instagram: "//*[@class='icon svg-icon-instagram']",
    PinInterest: "//*[@class='icon svg-icon-pinterest']",
    Tiktok: "//*[@class='icon svg-icon-tiktok']",
    Youtube: "//*[@class='icon svg-icon-youtube']",
    FooterTagline: "//*[@class='mobile-footer-tagline']",

    FooterMeta: "//div[@class='footer-meta']",
    FooterLogoLink: "//*[@class='footer-logo-link']",
    CopyRight: "//*[@class='copyright']",
    CopyRightMobile: "//*[@class='mobile-legal-text']",
    TermsOfUse: "//a[@href='/customer-service/terms-of-use']",
    Privacy: "(//a[@href='/customer-service/privacy-policy'])[2]",
    SiteIndex: "//a[@href='/site-index']",
    AdChoices: "//a[@href='/customer-service/privacy-policy#advertisingAndTracking']",
    ScreenReaderNote: "//p[@class='screen-reader-note']",
    WeddingRegistryMobile: "//*[@class='svg-icon-logo-registry-primary']",
    CB2mobile: "(//*[@class='mobile-logos'])[1]",
    HudsonGraceMobile: "(//*[@class='hg-logo-link'])[1]",
    FlagMobile: "//*[@class='international-shipping-chooser US']",
    CountryPopupLabel: "//*[@id='shipping-select-container']/h3",
    SaveContinue: "//*[@id='btn-ship-to-international']",
    createMyRegistryLabel: " (//p[contains(.,'Create My Registry')])[1]"
  },

  HOMEPAGE: {
    IDENTITYAUTH_USRNAME: '#Username',
    IDENTITYAUTH_PWD: '#Password',
    IDENTITYAUTH_SIGNIN_BUTTON: "button[value*='login']",
    SEARCH_TXTBOX: '#site-search-input, #header-header-search-input',
    SEARCH_BUTTON: '#site-search-search-button, #header-header-search-button, button[title="Search"]',
    WEDDING_REGISTRY: '#Nav_Wedding-Registry',
    LOGIN_LINK: "[data-testid='header-account-link']",
    CUSTOMERSERVICE_LINK: "//div[@class='footer-links']/div[2]//ul/li[1]/a",
    ORDERORSIGNIN_LINK: '[class="account-link"]',
    SIGNINORCREATACT_POPUP: '[class="global-flyout header-account-container"]',
    SIGNINORCREATACT_LINK: '[class="header-account-svg-icon svg-icon-account-outline"]',
    CREATEACCOUNT_BUTTON: '[class="button button-primary button-lg button-full-width create-account-link"]',
    ACNTHEADER_LINK: '.header-account-link',
    CB2US_SIGNIN_LINK: '.account-icon-link',
    CB2US_SIGNINLINK_LBL: "//ul[@class='account-flyout-menu']//li[1]",
    SIGNOUT_LINK: "//a[text()='Sign Out']",
    SIGNINICONMOBILE_BUTTON: '.account-icon-link',
    SIGNINMOBILE_LINK: "//a[text()='Sign In / Create Account']",
    SIGNOUTMOBILE_LINK: "//a[text()='Sign Out']",
    LOCATION_TXTBOX: 'zip-input',
    LOCATION_BUTTON: 'location-input'
  },

  PRODUCTPAGE: {
    // SKU_NUM: 'span.sku-number',
    SKU_NUM: '//span[@class="sku-number"]',
    FREE_SWATCH_POPUP_CLOSE_BUTTON: 'button[class="button button-secondary button-xl popup-close"]'
  },

  LOGINPAGE: {
    EMAIL_TXTBOX: '#okta-signin-username',
    PWD_TXTBOX: '#okta-signin-password',
    SIGNIN_BUTTON: '#okta-signin-submit'
  },

  REGISTRYPAGE: {
    PREFERENCE_LINK: "//div[contains(@class,'registry-details')]",
    EDITPIC_BUTTON: "//form[@id='uploadForm']//input[@type='file']"
  },

  CUSTOMERSERVICEPAGE: {
    SELLINGPREFERENCES_LINK: "//div[@class='customer-service-nav']/div/div[5]/div//ul/li[4]/a",
    PREFERENCES_BUTTON: "//div[@class='customer-service-nav']/div/div[5]/h3/button"
  },

  SELLINGPREFERENCESPAGE: {
    FNAME_TXTBOX: "//input[@id='firstNameDSARElement']",
    LNAME_TXTBOX: "//input[@id='lastNameDSARElement']",
    ADDRESS_TXTBOX: "//input[@id='addressDSARElement']",
    CITY_TXTBOX: "//input[@id='cityDSARElement']",
    COUNTRY_TXTBOX: "//input[@id='countryDSARElement']",
    STATE_TXTBOX: "//input[@id='stateDSARElement']",
    ZIPCODE_TXTBOX: "//input[@id='zipDSARElement']",
    EMAIL_TXTBOX: "//input[@id='emailDSARElement']"
  }
};
