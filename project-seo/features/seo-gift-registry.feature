Feature: SEO tag validation in Gift Registry Pages
    Customer should be able to verify the meta tags, h1, schema, internal and external links in Gift Registry pages

    #CA doesnt have registry
    @Seo @TC_SEO_020 @SeoGRPageCreate @CBUS @CBCA @CB2US @CB2CA @GRSEO
    Scenario Outline: SEO tag validation in Gift Registry Create page part 1 and 2
        Given Customer navigates to "<grStep1PageUrl>"
        Then step1 intake form should be loaded
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the canonical url in the gift registry page "<grStep1PageUrl>"
        And Verify the Meta Robots tag in the gift registry page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the gift registry page "<grStep1PageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the GR page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        When Customer fills information and existing email
        Then step2 intake form should be loaded for existing Customer
        When Customer enters password
        Then step1 GR page should display with Hi message
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the canonical url in the gift registry page "<grStep2PageUrl>"
        And Verify the Meta Robots tag in the gift registry page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the gift registry page "<grStep2PageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | grStep1PageUrl              | grStep2PageUrl     |
            | /gift-registry/create/step1 | /gift-registry/new |

    @Seo @TC_SEO_022 @SeoGRGuestList @CBUS @CBCA @CB2US @CB2CA @GRSEO
    Scenario Outline: SEO tag validation in GR guest list page
        Given customer navigates to gift registry page
        Then enter firstname, lastname, event type and click on search button
        When customer selects first regisrty from the search results
        Then verify gift regisrty is loaded
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the registry page
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


    @Seo @TC_SEO_021 @SeoGRGuestListRobots @CBUS @CBCA @CB2US @CB2CA @GRSEO
    Scenario Outline: Meta Robots tag validation in GR guest list page
        Given the customer is on the home page
        When Customer clicks on sign in from header
        And Customer sign in with "SeoGRTestAccount" login credentials
        And Customer clicks on myRegistry Link
        And Customer clicks on registry "<RegistryName>"
        Then Verify the meta robots is "<robots>"
        Examples:
            | RegistryName           | robots           |
            | PublicIndex Registry   | index,follow     |
            | PublicNoIndex Registry | noindex,nofollow |
            | PrivateOne Registry    | noindex,nofollow |
            | PrivateTwo Registry    | noindex,nofollow |

    # This is disabled for the time being
    # @Seo @TC_SEO_033 @SeoGRFreeShipping @CBCA
    # Scenario Outline: Free shipping message in Meta Description validation in Gift Registry page
    #     Given the customer is on the home page
    #     When customer navigates to gift registry page
    #     Then enter firstname, lastname, event type and click on search button
    #     When customer selects first regisrty from the search results
    #     Then verify gift regisrty is loaded
    #     And verify the free shipping message displayed in the meta description

