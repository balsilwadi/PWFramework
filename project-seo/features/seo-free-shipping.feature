Feature: SEO tag validation for Free shipping items
    Customer should be able to verify the meta tags, h1, schema, internal and external links for free shipping items

    @Seo @TC_SEO_016 @SeoFreeShipping @CBUS @CB2US
    Scenario Outline: SEO tag validation for Free shipping items in the page
        Given the customer is on the home page
        When Customer searches for Keyword "<searchTerm>"
        Then Verify free shipping item is present in the page
        When Customer selects free shipping item
        Then Customer should navigate to free shipping item page
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the free shipping page
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the free shipping page
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the free shipping page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the h1 tag displayed in the free shipping page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | searchTerm |
            | *          |