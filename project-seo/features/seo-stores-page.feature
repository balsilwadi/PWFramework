Feature: SEO tag validation in Store Landing, Store List and Store Details page
    Customer should be able to verify the meta tags, h1, schema, internal and external links in Store Locator, Store List and Store Details page

    @Seo @TC_SEO_011 @SeoStoreLandingPage @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: SEO tag validation in Store Landing page
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the Store Locator page "<storeUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the Store Locator page "<storeUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the Store Locator page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | storeUrl |
            | /stores/ |

    #this feature is applicable for Crate US, CA and CB2 US
    @Seo @TC_SEO_012 @SeoStoreListStatePage @CBUS @CBCA @CB2US
    Scenario Outline: SEO tag validation in Store List State page
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        And The customer click on the View All Stores & Facilities link
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the store list page "<usPageUrl>","<caPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the store list page "<usPageUrl>","<caPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the store list page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | usPageUrl                        | caPageUrl                           |
            | /stores/list-state/retail-stores | /stores/list-province/canada-stores |

    #this feature is applicable for Crate US , CA and CB2 US
    @Seo @TC_SEO_013 @SeoStoreListSpecStatePage @CBUS @CBCA @CB2US
    Scenario Outline: SEO tag validation in specific Store List State page
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        And The customer click on the View All Stores & Facilities link
        And The customer click on the state name "<stateNameUS>","<stateNameCA>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the store list page "<pageUrl>","<caPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the store list page "<pageUrl>","<caPageUrl>"
        And Verify the OG Title tag in the page
        # And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the store list page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | stateNameUS | stateNameCA | pageUrl                             | caPageUrl                              |
            | Arizona     | Alberta     | /stores/list-state/retail-stores/az | /stores/list-province/canada-stores/ab |

    @Seo @TC_SEO_010 @SeoStoreDetailsPage @CBUS @CB2US
    Scenario Outline: US - SEO tag validation in Store details page
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        When The customer navigate to Store Locator page
        And Enter the zipcode "<zipcode>" and click on the Find button
        Then List of Stores is displayed in the page
        When Customer selects the store from the store List
        Then Customer navigates to store details page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the store details page
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the store details page
        And Verify the OG Title tag in the page
        And Verify the OG Type tag "<type>" in the store details page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the Store Details page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | stateName | zipcode |
            | Arizona   | 60045   |

    @Seo @TC_SEO_010 @SeoStoreDetailsPage @CB2CA @CBCA
    Scenario Outline: Canada - SEO tag validation in Store details page
        Given the customer is on the home page
        When The customer navigate to Store Locator page
        Then List of Stores is displayed in the page
        When Customer selects the store from the store List
        Then Customer navigates to store details page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the store details page
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag "<siteName>" in the store details page
        And Verify the OG Image tag in the page
        And Verify the OG url in the store details page
        And Verify the OG Title tag in the page
        And Verify the OG Type tag "<type>" in the store details page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the Store Details page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | crateStoreName   | cratePageUrl                    | cb2StoreName | cb2PageUrl             | siteName | type    |
            | Southgate Centre | /stores/southgate-centre/str359 | CB2 Toronto  | /stores/toronto/str330 | CB2      | website |

