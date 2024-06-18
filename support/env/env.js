const { ReleaseInformation } = require('../utils/release-information-utils');

const releaseInformation = new ReleaseInformation();

const ENV = {
  BUILD: '',
  RELEASE_NUMBER: '',
  DEPLOYMENT_DATE: '',
  BRAND: process.env.BRAND,
  COUNTRY: process.env.COUNTRY,
  CURRENCY: process.env.CURRENCY,
  HEADLESS: process.env.HEADLESS,
  BASE_URL: process.env.BASE_URL,
  API_URL: process.env.API_URL,
  API_PID: process.env.API_PID,
  LANGUAGE: process.env.LANGUAGE,
  CRATE_BROWSER_URL: process.env.CRATE_BROWSER_URL,
  REG_EMAIL: process.env.REG_EMAIL,
  REG_PASSWORD: process.env.REG_PASSWORD,
  EXEC_ENV: process.env.EXEC_ENV,
  EXEC_SITE: process.env.EXEC_SITE,
  CRATEUS_URL: process.env.CRATEUS_URL,
  CB2US_URL: process.env.CB2US_URL,
  CRATECAN_URL: process.env.CRATECAN_URL,
  CB2CAN_URL: process.env.CB2CAN_URL,
  REGISTRY_SHARED_URL: process.env.REGISTRY_SHARED_URL,
  REGISTRY_SHARED_URL_WITH_PARCEL: process.env.REGISTRY_SHARED_URL_WITH_PARCEL,
  REGISTRY_SHARED_URL_WITH_PARCEL_2: process.env.REGISTRY_SHARED_URL_WITH_PARCEL_2,
  REGISTRY_SHARED_URL_FOR_FREESHIPPING: process.env.REGISTRY_SHARED_URL_FOR_FREESHIPPING,
  REGISTRY_WEDDING_URL: process.env.REGISTRY_WEDDING_URL,
  REGISTRY_HOUSEWARMING_URL: process.env.REGISTRY_HOUSEWARMING_URL,
  REGISTRY_ANNIVERSARY_URL: process.env.REGISTRY_ANNIVERSARY_URL,
  REGISTRY_BIRTHDAY_URL: process.env.REGISTRY_BIRTHDAY_URL,
  REGISTRY_COMMITMENT_URL: process.env.REGISTRY_COMMITMENT_URL,
  REGISTRY_CELEBRATION_URL: process.env.REGISTRY_CELEBRATION_URL,
  REGISTRY_BABY_URL: process.env.REGISTRY_BABY_URL,
  REGISTRY_KIDS_URL: process.env.REGISTRY_KIDS_URL,
  REGISTRY_OTHERKIDS_URL: process.env.REGISTRY_OTHERKIDS_URL,
  PARCEL_CB2_URL: process.env.PARCEL_CB2_URL,
  PAYPAL_TEST_USRID: process.env.PAYPAL_TEST_USRID,
  PAYPAL_TEST_PWD: process.env.PAYPAL_TEST_PWD,
  CART_GIFT_MSG_CONTENT: process.env.CART_GIFT_MSG_CONTENT,
  CART_RETURNS_MSG_TEXT: process.env.CART_RETURNS_MSG_TEXT,
  CART_RETURNS_MSG_HDR: process.env.CART_RETURNS_MSG_HDR,
  CART_REWARDS_PROMO_HDR: process.env.CART_REWARDS_PROMO_HDR,
  CART_REWARDS_PROMO_MSG: process.env.CART_REWARDS_PROMO_MSG,
  DOUBLE_REWARDS_FLAG: process.env.DOUBLE_REWARDS_FLAG,
  CART_REWARDS_PROMO_MSG_DOUBLE: process.env.CART_REWARDS_PROMO_MSG_DOUBLE,
  CART_REWARDS_DISPLAY_THRESHOLD: process.env.CART_REWARDS_DISPLAY_THRESHOLD,
  CART_REWARDS_PROMO_MSG_GUEST: process.env.CART_REWARDS_PROMO_MSG_GUEST,
  CART_SPECIAL_LOCAL_INHOME_HDR: process.env.CART_SPECIAL_LOCAL_INHOME_HDR,
  CART_SPECIAL_LOCAL_INHOME_TEXT: process.env.CART_SPECIAL_LOCAL_INHOME_TEXT,
  CART_SPECIAL_LOCAL_INHOME_LINK: process.env.CART_SPECIAL_LOCAL_INHOME_LINK,
  CART_REWARDS_PROMO_LINK: process.env.CART_REWARDS_PROMO_LINK,
  CART_RETURNS_MSG_LINK: process.env.CART_RETURNS_MSG_LINK,
  CART_FREE_PICKUP_CONTENT_HDR: process.env.CART_FREE_PICKUP_CONTENT_HDR,
  CART_FREE_PICKUP_CONTENT_TEXT: process.env.CART_FREE_PICKUP_CONTENT_TEXT,
  CART_FREE_PICKUP_CONTENT_LINK: process.env.CART_FREE_PICKUP_CONTENT_LINK,
  CART_INTERNATIONAL_CONTENT_HDR: process.env.CART_INTERNATIONAL_CONTENT_HDR,
  CART_INTERNATIONAL_CONTENT_TEXT: process.env.CART_INTERNATIONAL_CONTENT_TEXT,
  CART_INTERNATIONAL_CONTENT_LINK1_TEXT: process.env.CART_INTERNATIONAL_CONTENT_LINK1_TEXT,
  CART_INTERNATIONAL_CONTENT_LINK2_TEXT: process.env.CART_INTERNATIONAL_CONTENT_LINK2_TEXT,
  CART_SAVE4LATER_LOGGED_IN_MSG: process.env.CART_SAVE4LATER_LOGGED_IN_MSG,
  CART_SAVE4LATER_GUEST_MSG: process.env.CART_SAVE4LATER_GUEST_MSG,
  CART_SPECIAL_DELIVERY_MSG_HDR: process.env.CART_SPECIAL_DELIVERY_MSG_HDR,
  CART_SPECIAL_DELIVERY_MSG_TEXT: process.env.CART_SPECIAL_DELIVERY_MSG_TEXT,
  CART_SPECIAL_DELIVERY_MSG_LINK: process.env.CART_SPECIAL_DELIVERY_MSG_LINK,
  CART_OVERSIZED_LINK_TEXT: process.env.CART_OVERSIZED_LINK_TEXT,
  CART_OVERSIZED_POPUP_TEXT: process.env.CART_OVERSIZED_POPUP_TEXT,
  CART_STANDARD_DELIVERY_FEE_MSG1_TEXT: process.env.CART_STANDARD_DELIVERY_FEE_MSG1_TEXT,
  CART_STANDARD_DELIVERY_FEE_MSG2_TEXT: process.env.CART_STANDARD_DELIVERY_FEE_MSG2_TEXT,
  CART_STANDARD_DELIVERY_FEE_MSG3_TEXT: process.env.CART_STANDARD_DELIVERY_FEE_MSG3_TEXT,
  CART_SHIPPING_DESTINATIONS_HDR: process.env.CART_SHIPPING_DESTINATIONS_HDR,
  CART_SHIPPING_DESTINATIONS_ALASKA_HDR: process.env.CART_SHIPPING_DESTINATIONS_ALASKA_HDR,
  CART_STANDARD_DELIVERY_DETAILS_MSG: process.env.CART_STANDARD_DELIVERY_DETAILS_MSG,
  CART_STANDARD_DELIVERY_DETAILS_MSG1: process.env.CART_STANDARD_DELIVERY_DETAILS_MSG1,
  CART_STANDARD_DELIVERY_DETAILS_MSG2: process.env.CART_STANDARD_DELIVERY_DETAILS_MSG2,
  CART_DELIVERY_DETAILS_TABLE_HDR: process.env.CART_DELIVERY_DETAILS_TABLE_HDR,
  CART_DELIVERY_DETAILS_TABLE_CONTENT: process.env.CART_DELIVERY_DETAILS_TABLE_CONTENT,
  CART_STANDARD_DELIVERY_RATE_TABLE_HDR: process.env.CART_STANDARD_DELIVERY_RATE_TABLE_HDR,
  CART_AH_SHIPPING_RATE_TABLE_HDR: process.env.CART_AH_SHIPPING_RATE_TABLE_HDR,
  CART_STANDARD_DELIVERY_RATE_TABLE_CONTENT: process.env.CART_STANDARD_DELIVERY_RATE_TABLE_CONTENT,
  CART_AH_SHIPPING_RATE_TABLE_CONTENT: process.env.CART_AH_SHIPPING_RATE_TABLE_CONTENT,
  LNG_SHIPPING_DELIVERY_LINK_TXT: process.env.LNG_SHIPPING_DELIVERY_LINK_TXT,
  TXT_LONG_DISTANCE_DELIVERY: process.env.TXT_LONG_DISTANCE_DELIVERY,
  LBL_SHIP_METHOD_DEFAULT_LONG_DISTANCE: process.env.LBL_SHIP_METHOD_DEFAULT_LONG_DISTANCE,
  LBL_AVAILABILITY_MSG_LONG_DISTANCE: process.env.LBL_AVAILABILITY_MSG_LONG_DISTANCE,
  SHIPPING_GIFTBOX_CHARGE: process.env.SHIPPING_GIFTBOX_CHARGE,
  DEFAULT_ZIPCODE: process.env.DEFAULT_ZIPCODE,
  DEFAULT_SHIPMODE: process.env.DEFAULT_SHIPMODE,
  SKU_PARCEL: process.env.SKU_PARCEL,
  SKU_PARCEL2: process.env.SKU_PARCEL2,
  SKU_PARCEL3: process.env.SKU_PARCEL3,
  SKU_PARCEL4: process.env.SKU_PARCEL4,
  SKU_MONOGRAM: process.env.SKU_MONOGRAM,
  SKU_MONOGRAM_SETSKU: process.env.SKU_MONOGRAM_SETSKU,
  SKU_MONOGRAM_SALEPRICE_SKU: process.env.SKU_MONOGRAM_SALEPRICE_SKU,
  SKU_LIST_MONOGRAM: process.env.SKU_LIST_MONOGRAM,
  SKU_MONOGRAM_BACKORDER: process.env.SKU_MONOGRAM_BACKORDER,
  SKU_LIST_PARCEL: process.env.SKU_LIST_PARCEL,
  SKU_OVERSIZED: process.env.SKU_OVERSIZED,
  SKU_FURNITURE: process.env.SKU_FURNITURE,
  SKU_FURNITURE2: process.env.SKU_FURNITURE2,
  SKU_FRN_LT999: process.env.SKU_FRN_LT999,
  SKU_FRN_GT999: process.env.SKU_FRN_GT999,
  SKU_REWARD: process.env.SKU_REWARD,
  SKU_MTO: process.env.SKU_MTO,
  SKU_CUSTOM: process.env.SKU_CUSTOM,
  SKU_LONG_DISTANCE: process.env.SKU_LONG_DISTANCE,
  SKU_BFT: process.env.SKU_BFT,
  SKU_VENDOR_DROPSHIP: process.env.SKU_VENDOR_DROPSHIP,
  SKU_RUG: process.env.SKU_RUG,
  SKU_PARCEL_FURNITURE: process.env.SKU_PARCEL_FURNITURE,
  SKU_FURNITURE_HANDY: process.env.SKU_FURNITURE_HANDY,
  DEFAULT_RETURNING_USR_EMAIL: process.env.DEFAULT_RETURNING_USR_EMAIL,
  DEFAULT_RETURNING_USR_PWD: process.env.DEFAULT_RETURNING_USR_PWD,
  ACNT_ORDTRK_ORDERNUM: process.env.ACNT_ORDTRK_ORDERNUM,
  ACNT_ORDTRK_EMAIL: process.env.ACNT_ORDTRK_EMAIL,
  ACNT_ORDTRK_DATA: process.env.ACNT_ORDTRK_DATA,
  ACNT_FAVORITE_SKU: process.env.ACNT_FAVORITE_SKU,
  MSG_SCDCLINE: process.env.MSG_SCDCLINE,
  MSG_SCDCBFD: process.env.MSG_SCDCBFD,
  MSG_SCDCLDI: process.env.MSG_SCDCLDI,
  MSG_SCDI: process.env.MSG_SCDI,
  MSG_BF_CHARGE: process.env.MSG_BF_CHARGE,
  CART_SIGNIN_MSG: process.env.CART_SIGNIN_MSG,
  LIH_ZIPCODE: process.env.LIH_ZIPCODE,
  LIH_LT100_ZIPCODE: process.env.LIH_LT100_ZIPCODE,
  LIH_GT100_ZIPCODE: process.env.LIH_GT100_ZIPCODE,
  BFT_ZIPCODE: process.env.BFT_ZIPCODE,
  LNG_ZIPCODE: process.env.LNG_ZIPCODE,
  LIH_LT161_ZIPCODE: process.env.LIH_LT161_ZIPCODE,
  LIH_BT162_241_ZIPCODE: process.env.LIH_BT162_241_ZIPCODE,
  LIH_GT241_ZIPCODE: process.env.LIH_GT241_ZIPCODE,
  EXPRESS_CHK_ELIG_ACCNT_EMAIL: process.env.EXPRESS_CHK_ELIG_ACCNT_EMAIL,
  EXPRESS_CHK_ELIG_ACCNT_PWD: process.env.EXPRESS_CHK_ELIG_ACCNT_PWD,
  ACNT_CONFRM_CRTACNT_SUCCESS: process.env.ACNT_CONFRM_CRTACNT_SUCCESS,
  ACNT_DTP_BILLINGADDRESS: process.env.ACNT_DTP_BILLINGADDRESS,
  CART_LIH_MSG: process.env.CART_LIH_MSG,
  DTP_RETURNING_USR_EMAIL: process.env.DTP_RETURNING_USR_EMAIL,
  DTP_RETURNING_USR_PWD: process.env.DTP_RETURNING_USR_PWD,
  DTP_INVALIDTAXEXEMPT_ACCNT_EMAIL: process.env.DTP_INVALIDTAXEXEMPT_ACCNT_EMAIL,
  DTP_INVALIDTAXEXEMPT_ACCNT_PWD: process.env.DTP_INVALIDTAXEXEMPT_ACCNT_PWD,
  CART_OVERSIZED_PICKUP_POPUP_TEXT: process.env.CART_OVERSIZED_PICKUP_POPUP_TEXT,
  DEFAULT_WAREHOUSE: process.env.DEFAULT_WAREHOUSE,
  SKU_CPU: process.env.SKU_CPU,
  SKU_BOPS: process.env.SKU_BOPS,
  SKU_BOSS: process.env.SKU_BOSS,
  SKU_WHS_PICKUP: process.env.SKU_WHS_PICKUP,
  SHIPPING_PACKAGE_TOOLTIP: process.env.SHIPPING_PACKAGE_TOOLTIP,
  SHIP_DELAY_BFT: process.env.SHIP_DELAY_BFT,
  SHIP_DELAY_LNG: process.env.SHIP_DELAY_LNG,
  PAYMENT_DEPOSIT_MSG: process.env.PAYMENT_DEPOSIT_MSG,
  ACNT_DS_ACTIVEBRAND: process.env.ACNT_DS_ACTIVEBRAND,
  ACNT_DS_SECONDARYBRAND: process.env.ACNT_DS_SECONDARYBRAND,
  ACNT_DS_URL: process.env.ACNT_DS_URL,
  ACNT_DS_SECONDARYURL: process.ACNT_DS_SECONDARYURL,
  SEO_META_ROBOTS: process.env.SEO_META_ROBOTS,
  SEO_OG_SITENAME: process.env.SEO_OG_SITENAME,
  SEO_OG_TYPE: process.env.SEO_OG_TYPE,
  SEO_FRAME_OG_TYPE: process.env.SEO_FRAME_OG_TYPE,
  SEO_FB_ADMINS: process.env.SEO_FB_ADMINS,
  SEO_CANONICAL_OG_URL: process.env.SEO_CANONICAL_OG_URL,
  STORE_LOCATOR_PAGE_URL: process.env.STORE_LOCATOR_PAGE_URL,
  STORE_OPTIONS: process.env.STORE_OPTIONS,
  ACTIVE_GIFT_REGISTRY_PAGE_URL: process.env.ACTIVE_GIFT_REGISTRY_PAGE_URL,
  NO_GIFT_REGISTRY_PAGE_URL: process.env.NO_GIFT_REGISTRY_PAGE_URL,
  ACNT_ACTIVE_REGISTRY_NUMBER: process.env.ACNT_ACTIVE_REGISTRY_NUMBER,
  MSG_SCBFLINE: process.env.MSG_SCBFLINE,
  MSG_SCDCBFDDD: process.env.MSG_SCDCBFDDD,
  ACNT_SIGNIN_MSG: process.env.ACNT_SIGNIN_MSG,
  ACNT_REWARDSDESC: process.env.ACNT_REWARDSDESC,
  ACNT_ADDCC: process.env.ACNT_ADDCC,
  ACNT_ZERO_REWARDS: process.env.ACNT_ZERO_REWARDS,
  ACNT_REWARDS_MSG: process.env.ACNT_REWARDS_MSG,
  HWS_SUPERCATEGORY1: process.env.HWS_SUPERCATEGORY1,
  HWS_SUPERCATEGORY2: process.env.HWS_SUPERCATEGORY2,
  HWS_CATEGORY1: process.env.HWS_CATEGORY1,
  HWS_CATEGORY2: process.env.HWS_CATEGORY2,
  ACNT_CATALOG_UNSUB_SUCCESS_MSG: process.env.ACNT_CATALOG_UNSUB_SUCCESS_MSG,
  ACNT_CHK_FLYOUT_LOGIN_EMAIL: process.env.ACNT_CHK_FLYOUT_LOGIN_EMAIL,
  ACNT_CHK_FLYOUT_LOGIN_PWD: process.env.ACNT_CHK_FLYOUT_LOGIN_PWD,
  ACNT_NEWEMAIL: process.env.ACNT_NEWEMAIL,
  ACNT_NEWPWD: process.env.ACNT_NEWPWD,
  PRODUCTS_BROWSE_SKU_JSON_PATH: process.env.PRODUCT_BROWSE_JSON_PATH,
  PRODUCTS_SKU_JSON_PATH: process.env.PRODUCT_JSON_PATH,
  PRODUCTS_DATA_JSON_PATH: process.env.PRODUCTS_DATA_JSON_PATH,
  ACNT_CATALOG_HDR: process.env.ACNT_CATALOG_HDR,
  ACNT_CATALOG_URL: process.env.ACNT_CATALOG_URL,
  CMN_API_RESPONSE: process.env.CMN_API_RESPONSE,
  GENERATEDPAGE_LINK: process.env.GENERATEDPAGE_LINK,
  SEO_GENERATEDPAGE: process.env.SEO_GENERATEDPAGE,
  SEO_META_ROBOTS_GP: process.env.SEO_META_ROBOTS_GP,
  ACNT_INTRPT_OFFERBANNER1MOBILE: process.env.ACNT_INTRPT_OFFERBANNER1MOBILE,
  ACNT_INTRPT_SMSONLYOFFERBANNER: process.env.ACNT_INTRPT_SMSONLYOFFERBANNER,
  ACNT_SMSONLYDESC: process.env.ACNT_SMSONLYDESC,
  ACNT_PDP_URL: process.env.ACNT_PDP_URL,
  GR_LOCALE: process.env.GR_LOCALE,
  ACNT_DESIGN_SEVICES_PAGE_URL: process.env.ACNT_DESIGN_SEVICES_PAGE_URL,
  ACNT_DS_FORM_LBL_EMAIL_REQUIRED: process.env.ACNT_DS_FORM_LBL_EMAIL_REQUIRED,
  ACNT_DS_FORM_LBL_PHONE_REQUIRED: process.env.ACNT_DS_FORM_LBL_PHONE_REQUIRED,
  ACNT_DS_FORM_LBL_FNAME_REQUIRED: process.env.ACNT_DS_FORM_LBL_FNAME_REQUIRED,
  ACNT_DS_FORM_LBL_LNAME_REQUIRED: process.env.ACNT_DS_FORM_LBL_LNAME_REQUIRED,
  ACNT_DS_FORM_LBL_ZIPCODE_REQUIRED: process.env.ACNT_DS_FORM_LBL_ZIPCODE_REQUIRED,
  ACNT_DS_FORM_LBL_CONTACT_METHOD_REQUIRED: process.env.ACNT_DS_FORM_LBL_CONTACT_METHOD_REQUIRED,
  ACNT_DS_FORM_SUCCESS_MSG: process.env.ACNT_DS_FORM_SUCCESS_MSG,
  VDS_FREE_SHIPPING_MSG: process.env.VDS_FREE_SHIPPING_MSG,
  VDS_DIRECTLY_FROM_VENDOR_MSG: process.env.VDS_DIRECTLY_FROM_VENDOR_MSG,
  ACNT_STORE_NAME: process.env.ACNT_STORE_NAME,
  ACNT_ORDER_MSG: process.env.ACNT_ORDER_MSG,
  ACNT_ORDER_NAME: process.env.ACNT_ORDER_NAME,
  ACNT_PRIVACY_POLICY: process.env.ACNT_PRIVACY_POLICY,
  ACNT_LNK_TRACKORDER: process.env.ACNT_LNK_TRACKORDER,
  ACNT_LNK_STARTRETURN: process.env.ACNT_LNK_STARTRETURN,
  ACNT_LNK_SCHDELIVERY: process.env.ACNT_LNK_SCHDELIVERY,
  ACNT_LNK_GCBALANCE: process.env.ACNT_LNK_GCBALANCE,
  ACNT_LNK_CBCC: process.env.ACNT_LNK_CBCC,
  ACNT_LNK_MNGACNT: process.env.ACNT_LNK_MNGACNT,
  ACNT_COM_INTERRUPTER_HEADER: process.env.ACNT_COM_INTERRUPTER_HEADER,
  ACNT_INTERRUPTER_DESC: process.env.ACNT_INTERRUPTER_DESC,
  ACNT_INTERRUPTER_PHONE: process.env.ACNT_INTERRUPTER_PHONE,
  ACNT_INTRPT_SECOND_HEADER: process.env.ACNT_INTRPT_SECOND_HEADER,
  ACNT_INTRPT_SECOND_SUBTEXT: process.env.ACNT_INTRPT_SECOND_SUBTEXT,
  ACNT_SIGNIN_DESC_CONFRM_PAGE: process.env.ACNT_SIGNIN_DESC_CONFRM_PAGE,
  ACNT_SWATCH_ORDER: process.env.ACNT_SWATCH_ORDER,
  ACNT_SWATCH_QTY: process.env.ACNT_SWATCH_QTY,
  ACNT_SWATCH_FABRIC: process.env.ACNT_SWATCH_FABRIC,
  ACNT_SWATCH_AMT: process.env.ACNT_SWATCH_AMT,
  ACNT_SWATCH_SKU: process.env.ACNT_SWATCH_SKU,
  ACNT_PREF_LABEL: process.env.ACNT_PREF_LABEL,
  ACNT_SMS_CONSENT: process.env.ACNT_SMS_CONSENT,
  ACNT_PHONE: process.env.ACNT_PHONE,
  ACNT_CRATE: process.env.ACNT_CRATE,
  ACNT_KIDS: process.env.ACNT_KIDS,
  ACNT_CB2: process.env.ACNT_CB2,
  ACNT_MNGPREF_LBL: process.env.ACNT_MNGPREF_LBL,
  ACNT_TXTDRAWER: process.env.ACNT_TXTDRAWER,
  MAR_EMAIL: process.env.MAR_EMAIL,
  MAR_SINGLE_ITEM_EMAIL: process.env.MAR_SINGLE_ITEM_EMAIL,
  MAR_MULTIPLE_ITEM_EMAIL: process.env.MAR_MULTIPLE_ITEM_EMAIL,
  MAR_PASSWORD: process.env.MAR_PASSWORD,
  MAR_PDP_URL: process.env.MAR_PDP_URL,
  MAR_SEARCH_TERM_PLP: process.env.MAR_SEARCH_TERM_PLP,
  MAR_SEARCH_TERM_SEARCH: process.env.MAR_SEARCH_TERM_SEARCH,
  MAR_SPATEGORY_URL: process.env.MAR_SPATEGORY_URL,
  MAR_SUPERCATEGORY_URL: process.env.MAR_SUPERCATEGORY_URL,
  MAR_TRADEPROGRAM_URL: process.env.MAR_TRADEPROGRAM_URL,
  MAR_DESIGNSERVICES_URL: process.env.MAR_DESIGNSERVICES_URL,
  MAR_DESIGNSERVICESKIDS_URL: process.env.MAR_DESIGNSERVICESKIDS_URL,
  MAR_REWARDS_URL: process.env.MAR_REWARDS_URL,
  MAR_FAMILY_URL: process.env.MAR_FAMILY_URL,
  MAR_GROUPER_URL: process.env.MAR_GROUPER_URL,
  MAR_SUPERSOR_URL: process.env.MAR_SUPERSOR_URL,
  MAR_INSTALLATION_URL: process.env.MAR_INSTALLATION_URL,
  MAR_CONFIRMATION_ADDONS_URL: process.env.MAR_CONFIRMATION_ADDONS_URL,
  MAR_ADDONS_URL: process.env.MAR_ADDONS_URL,
  MAR_PARTOFCOLLECTION_URL: process.env.MAR_PARTOFCOLLECTION_URL,
  MAR_COLLECTION_URL: process.env.MAR_COLLECTION_URL,
  MAR_MONOGRAM_URL: process.env.MAR_MONOGRAM_URL,
  MAR_SWATCH_URL: process.env.MAR_SWATCH_URL,
  MAR_ORDER_CONF_CORE_SKU: process.env.MAR_ORDER_CONF_CORE_SKU,
  MAR_ORDER_CONF_KIDS_SKU: process.env.MAR_ORDER_CONF_KIDS_SKU,
  ACNT_TEXTDESC_GUEST: process.env.ACNT_TEXTDESC_GUEST,
  ACNT_EMAILDESC_GUEST: process.env.ACNT_EMAILDESC_GUEST,
  SORT_REGISTRY_ID: process.env.SORT_REGISTRY_ID,
  ACNT_EMAILTEXT_GUEST: process.env.ACNT_EMAILTEXT_GUEST,
  AVAILABILITYREFACTOR_FURNITURE_SKU: process.env.AVAILABILITYREFACTOR_FURNITURE_SKU,
  AVAILABILITYREFACTOR_ZIPCODE: process.env.AVAILABILITYREFACTOR_ZIPCODE,
  AVAILABILITYREFACTOR_PARCEL_SKU: process.env.AVAILABILITYREFACTOR_PARCEL_SKU,
  AVAILABILITYREFACTOR_PARCEL_BOPS_SKU: process.env.AVAILABILITYREFACTOR_PARCEL_SKU,
  BASE_URL_Availability: process.env.BASE_URL_AVAILABILITY,
  AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU: process.env.AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU,
  AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU: process.env.AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU,
  AVAILABILITYREFACTOR_PARCEL_BACKORDER_BOPS_SKU: process.env.AVAILABILITYREFACTOR_PARCEL_BACKORDER_SKU,
  AVAILABILITYREFACTOR_FURNITURE_BACKORDER_BOPS_SKU: process.env.AVAILABILITYREFACTOR_FURNITURE_BACKORDER_SKU,
  AVAILABILITYREFACTOR_MTO_SKU: process.env.AVAILABILITYREFACTOR_MTO_SKU,
  AVAILABILITYREFACTOR_CUSTOM_SKU: process.env.AVAILABILITYREFACTOR_CUSTOM_SKU,
  AVAILABILITYREFACTOR_PERSONALIZED_SKU: process.env.AVAILABILITYREFACTOR_PERSONALIZED_SKU,
  AVAILABILITYREFACTOR_MONOGRAM_SKU: process.env.AVAILABILITYREFACTOR_MONOGRAM_SKU,
  REGISTRY_SHARED_URL_WITH_BOPS: process.env.REGISTRY_SHARED_URL_WITH_BOPS,
  REGISTRY_SHARED_URL_BOPS_PARCEL: process.env.REGISTRY_SHARED_URL_BOPS_PARCEL,
  REGISTRY_SHARED_URL_WITH_FURNITURE: process.env.REGISTRY_SHARED_URL_WITH_FURNITURE,
  SHIP_SURCHARGE_PREMIUM: process.env.SHIP_SURCHARGE_PREMIUM,
  SHIP_SURCHARGE_EXPRESS: process.env.SHIP_SURCHARGE_EXPRESS,
  ACNT_CART_URL: process.env.ACNT_CART_URL,
  SKU_LIST_CHK8088: process.env.SKU_LIST_CHK8088,
  INVALID_PROMO_CODE_1: process.env.INVALID_PROMO_CODE_1,
  INVALID_PROMO_CODE_2: process.env.INVALID_PROMO_CODE_2,
  VALID_PROMO_CODE_1: process.env.VALID_PROMO_CODE_1,
  ACNT_RETURN_ITEMTITLE: process.env.ACNT_RETURN_ITEMTITLE,
  ACNT_RETURN_ITEMSKU: process.env.ACNT_RETURN_ITEMSKU,
  ACNT_RETURN_ITEMLOCATION: process.env.ACNT_RETURN_ITEMLOCATION,
  ACNT_RETURN_ITEMPRICE: process.env.ACNT_RETURN_ITEMPRICE,
  ACNT_RETURN_ITEMQTY: process.env.ACNT_RETURN_ITEMQTY,
  ACNT_RETURN_ORDER: process.env.ACNT_RETURN_ORDER,
  ACNT_RETURN_EMAIL: process.env.ACNT_RETURN_EMAIL,
  MONOGRAMMED_ORDER: process.env.MONOGRAMMED_ORDER,
  GR_ORDER: process.env.GR_ORDER,
  PERS_TEXT: process.env.PERS_TEXT,
  PERS_FONT: process.env.PERS_FONT,
  PERS_COLOR: process.env.PERS_COLOR,
  PERS_MESSAGE: process.env.PERS_MESSAGE,
  MONOGRAMMING_FEE: process.env.MONOGRAMMING_FEE,
  MONOGRAMMING_FEE_TXT: process.env.MONOGRAMMING_FEE_TXT,
  ACNT_SMSONLY_SUBTEXT: process.env.ACNT_SMSONLY_SUBTEXT,
  ACNT_PLP: process.env.ACNT_PLP,
  FREE_SHIPPING_FLAG: process.env.FREE_SHIPPING_FLAG,
  FREE_SHIPPING_THRESHOLD: process.env.FREE_SHIPPING_THRESHOLD,
  FREE_SHIPPING_START_DATE: process.env.FREE_SHIPPING_START_DATE,
  FREE_SHIPPING_END_DATE: process.env.FREE_SHIPPING_END_DATE,
  FREE_SHIP_PARCEL_SKU: process.env.FREE_SHIP_PARCEL_SKU,
  FREE_SHIP_SKU_LESS_THAN_THRESHOLD: process.env.FREE_SHIP_SKU_LESS_THAN_THRESHOLD,
  FREE_SHIP_LINK: process.env.FREE_SHIP_LINK,
  FREE_SHIPPING_POPUP_HEADER: process.env.FREE_SHIPPING_POPUP_HEADER,
  FREE_SHIPPING_POPUP_SUB_HEADER: process.env.FREE_SHIPPING_POPUP_SUB_HEADER,
  FREE_SHIPPING_POPUP_CONTENT: process.env.FREE_SHIPPING_POPUP_CONTENT,
  FREE_SHIPPING_DATE_AFTER_START_DATE: process.env.FREE_SHIPPING_DATE_AFTER_START_DATE,
  FREE_SHIPPING_DATE_BEFORE_END_DATE: process.env.FREE_SHIPPING_DATE_BEFORE_END_DATE,
  FREE_SHIPPING_TIME_AFTER_START_TIME: process.env.FREE_SHIPPING_TIME_AFTER_START_TIME,
  FREE_SHIPPING_TIME_BEFORE_END_TIME: process.env.FREE_SHIPPING_TIME_BEFORE_END_TIME,
  FREE_SHIPPING_BELOW_THRESHOLD_RANGE: process.env.FREE_SHIPPING_BELOW_THRESHOLD_RANGE,
  FREE_SHIPPING_ABOVE_THRESHOLD_RANGE: process.env.FREE_SHIPPING_ABOVE_THRESHOLD_RANGE,
  GR_FREE_SHIPPING_THRESHOLD: process.env.GR_FREE_SHIPPING_THRESHOLD,
  WAREHOUSE_LIST: process.env.WAREHOUSE_LIST,
  NO_STORE_EVENT_MESSAGE: process.env.NO_STORE_EVENT_MESSAGE,
  GIFTCARD: process.env.GIFTCARD,
  CONTINENTALSTANDARDPARCELDELIVERYDATEMIN: process.env.CONTINENTALSTANDARDPARCELDELIVERYDATEMIN,
  CONTINENTALSTANDARDPARCELDELIVERYDATEADD: process.env.CONTINENTALSTANDARDPARCELDELIVERYDATEADD,
  ACNT_INTERRUPTER_EMAIL_ALREADYOPTIN: process.env.ACNT_INTERRUPTER_EMAIL_ALREADYOPTIN,
  ACNT_INTERRUPTER_PHONE_ALREADYOPTIN: process.env.ACNT_INTERRUPTER_PHONE_ALREADYOPTIN,
  ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN: process.env.ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN,
  ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN: process.env.ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN,
  ACNT_INTERRUPTER_NEWPHONE: process.env.ACNT_INTERRUPTER_NEWPHONE,
  ACNT_INTERRUPTERTEXT_MAIN_EMAILONLY: process.env.ACNT_INTERRUPTERTEXT_MAIN_EMAILONLY,
  ACNT_INTERRUPTERTEXT_SUB_EMAILONLY: process.env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLY,
  ACNT_INTERRUTPERTEXT_MAIN_PHONEONLY: process.env.ACNT_INTERRUTPERTEXT_MAIN_PHONEONLY,
  ACNT_INTERRUTPERTEXT_SUB_PHONEONLY: process.env.ACNT_INTERRUTPERTEXT_SUB_PHONEONLY,
  ACNT_INTERRUPTER_EMAIL_NOTOPTIN: process.env.ACNT_INTERRUPTER_EMAIL_NOTOPTIN,
  ACNT_INTERRUPTER_PHONEONLY_OPTIN: process.env.ACNT_INTERRUPTER_PHONEONLY_OPTIN,
  ACNT_INTERRUPTERTEXT_MAIN_NEWOPTIN: process.env.ACNT_INTERRUPTERTEXT_MAIN_NEWOPTIN,
  ACNT_INTERRUPTERTEXT_SUB_NEWOPTIN: process.env.ACNT_INTERRUPTERTEXT_SUB_NEWOPTIN,
  ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN_CB2NO: process.env.ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN_CB2NO,
  ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN_CB2NO: process.env.ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN_CB2NO,
  ACNT_INTERRUPTERTEXT_MAIN_CRATEEMAILONLY_OPTIN_CB2NO: process.env.ACNT_INTERRUPTERTEXT_MAIN_CRATEEMAILONLY_OPTIN_CB2NO,
  ACNT_INTERRUPTERTEXT_SUB_NEWWMAIL_PHONE: process.env.ACNT_INTERRUPTERTEXT_SUB_NEWWMAIL_PHONE,
  ACNT_INTERRUPTERTEXT_KIDSONLY_NEWOPTIN: process.env.ACNT_INTERRUPTERTEXT_KIDSONLY_NEWOPTIN,
  ACNT_INTERRUPTERTEXT_CRATEONLY_NEWOPTIN: process.env.ACNT_INTERRUPTERTEXT_CRATEONLY_NEWOPTIN,
  ACNT_INTERRUPTERTEXT_SUB_EMAILONLYOPTIN: process.env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLYOPTIN,
  ACNT_INTERRUPTER_KIDSEMAILONLY: process.env.ACNT_INTERRUPTER_KIDSEMAILONLY,
  MONOGRAM_ARRIVES_MESSAGE: process.env.MONOGRAM_ARRIVES_MESSAGE,
  ACNT_GIFTCARDSVENDOR: process.env.ACNT_GIFTCARDSVENDOR,
  ACNT_EGIFTCARDSFAQ: process.env.ACNT_EGIFTCARDSFAQ,
  ACNT_DSGNSRVS_PACKAGEDATE: process.env.ACNT_DSGNSRVS_PACKAGEDATE,
  ACNT_DSGNSRVS_PACKAGENAME: process.env.ACNT_DSGNSRVS_PACKAGENAME,
  ACNT_GR_URL: process.env.ACNT_GR_URL,
  ACNT_INTERRUPTER_TERMSLNK: process.env.ACNT_INTERRUPTER_TERMSLNK,
  ACNT_INTERRUPTER_PRIVACYLNK: process.env.ACNT_INTERRUPTER_PRIVACYLNK,
  ACNT_INTERRUPTER_OFFERSLNK: process.env.ACNT_INTERRUPTER_OFFERSLNK,
  ACNT_KIDSINTERRUPTER_TERMSLNK: process.env.ACNT_KIDSINTERRUPTER_TERMSLNK,
  ACNT_KIDSINTERRUPTER_PRIVACYLNK: process.env.ACNT_KIDSINTERRUPTER_PRIVACYLNK,
  ACNT_KIDSINTERRUPTER_OFFERSLNK: process.env.ACNT_KIDSINTERRUPTER_OFFERSLNK
};

async function getReleaseInformationFromFile() {
  releaseInformation.getReleaseJsonRequestOutput();
}
getReleaseInformationFromFile();

module.exports = ENV;