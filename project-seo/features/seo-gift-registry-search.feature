Feature: SEO tag validation in Gift registry page
    Customer should be able to search for a gift registry and verify the meta tags, h1, schema, internal and external links

    @Seo @TC_SEO_022 @SeoGRSearch @CBUS @CBCA @CB2US
    Scenario Outline: SEO tag validation in GR guest list page
        Given the customer is on the home page
        When customer navigates to gift registry page
        Then enter firstname, lastname, event type and click on search button
        When customer selects first regisrty from the search results
        Then verify gift regisrty is loaded
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the registry page
        And Verify the Meta Robots tag "<metaRobots>" in the registry page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the registry page
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the h1 tag displayed in the registry page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | metaRobots   |
            | index,follow |

    #This feature is applicable only for crate ca
    @Seo @TC_SEO_033 @SeoGRFreeShipping @CBCA
    Scenario Outline: Free shipping message in Meta Description validation in Gift Registry page
        Given the customer is on the home page
        When customer navigates to gift registry page
        Then enter firstname, lastname, event type and click on search button
        When customer selects first regisrty from the search results
        Then verify gift regisrty is loaded
        And verify the free shipping message displayed in the meta description

