Feature: SEO tag validation in MPDP
    Customer should be able to verify the meta tags, h1, schema, internal and external links in MPDP

    @Seo @TC_SEO_008 @SeoMpdpPage @CBUS @CBCA
    Scenario Outline: Crate - SEO tag validation in MPDP
        Given the customer is on the home page
        When Customer navigates to MPDP "<url>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the multi product detail page "<url>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the multi product detail page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type "<ogType>" tag in the multi product detail page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the breadcrumb schema tag displayed in the multi product detail page
        And Verify the product schema tag displayed in the multi product detail page
        And Verify the imageGallery schema tag displayed in the multi product detail page
        And Verify the h1 tag displayed in the multi product detail page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | url                   | ogType  |
            | /hatch-glasses/f58609 | product |

    @Seo @TC_SEO_008 @SeoMpdpPage @CB2US @CB2CA
    Scenario Outline: CB2 - SEO tag validation in MPDP
        Given the customer is on the home page
        When Customer navigates to MPDP "<url>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the multi product detail page "<url>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the multi product detail page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type "<ogType>" tag in the multi product detail page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the breadcrumb schema tag displayed in the multi product detail page
        And Verify the product schema tag displayed in the multi product detail page
        And Verify the imageGallery schema tag displayed in the multi product detail page
        And Verify the h1 tag displayed in the multi product detail page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | url                                 | ogType  |
            | /bozzi-chair-by-ross-cassidy/f24488 | product |
