Feature: SEO tag validation in PLP
    Customer should be able to verify the meta tags, h1, schema, internal and external links in PLP

    @Seo @TC_SEO_004 @SeoPlpPage @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: SEO tag validation in PLP
        Given the customer is on the home page
        When Customer navigates to "<plpURLCrate>" "<plpURLCB2>"
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the product listing page "<plpURLCrate>" "<plpURLCB2>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the product listing page "<plpURLCrate>" "<plpURLCB2>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | plpURLCrate                        | plpURLCB2          |
            | /outdoor-furniture/outdoor-sofas/1 | /furniture/sofas/1 |


