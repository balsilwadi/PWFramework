Feature: SEO tag validation in Search PLP
    Customer should be able to verify the meta tags, h1, schema, internal and external links in Search PLP

    @Seo @TC_SEO_002 @SeoSearchPage @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Search for a keyword and verify SEO tags in the search PLP
        Given the customer is on the home page
        When Customer searches for Keyword "<searchTerm>"
        Then Customer should be navigated to "<searchTerm>" Search PLP
        And Customer should be navigated to "<expectedUrl>"
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the cart page "<metaUrl>"
        And Verify the Meta Robots tag in the search page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the cart page "<metaUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the Search page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page

        Examples:
            | searchTerm | expectedUrl    | metaUrl |
            | table      | /search?query= | /search |


