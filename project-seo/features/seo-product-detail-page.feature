Feature: SEO tag validation in SPDP
    Customer should be able to verify the meta tags, h1, schema, internal and external links in SPDP

    @Seo @TC_SEO_007 @SeoSpdpPage @CBUS @CBCA
    Scenario Outline: Crate - SEO tag validation in SPDP
        Given the customer is on the home page
        When Customer searches for "<SKU>"
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the product detail page "<url>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the product detail page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type "<ogType>" tag in the product detail page
        And Verify the OG Description in the page
        And Verify the OG Alt Img in the page
        And Verify the Meta Author in the page
        And Verify the Meta Language in the page
        And Verify the Meta Twitter tags in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the Product schema tag is displayed in the page
        And Verify the h1 tag displayed in the product detail page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | SKU    | url      | ogType  |
            | 215525 | /s215525 | product |

    @Seo @TC_SEO_007 @SeoSpdpPage @CB2US @CB2CA
    Scenario Outline: CB2 - SEO tag validation in SPDP
        Given the customer is on the home page
        When Customer searches for "<SKU>"
        And Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the product detail page "<url>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the product detail page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type "<ogType>" tag in the product detail page
        And Verify the OG Description in the page
        And Verify the OG Alt Img in the page
        And Verify the Meta Author in the page
        And Verify the Meta Language in the page
        And Verify the Meta Twitter tags in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the Product schema tag is displayed in the page
        And Verify the h1 tag displayed in the product detail page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | SKU    | url      | ogType  |
            | 265795 | /s265795 | product |


