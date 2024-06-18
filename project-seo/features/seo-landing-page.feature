Feature: SEO tag validation in Landing page
    Customer should be able to verify the meta tags, h1, schema, internal and external links in Landing page

    @Seo @TC_SEO_009 @SeoLandingPage @CBUS @CBCA
    Scenario Outline: SEO tag validation in Landing page
        Given the customer is on the home page
        When The customer navigate to "<landingPageUrl>" Landing page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the landing page "<landingPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the landing page "<landingPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the landing page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | landingPageUrl          |
            | /about-crate-and-barrel |

    @Seo @TC_SEO_009 @SeoLandingPage @CB2US @CB2CA
    Scenario Outline: SEO tag validation in Landing page
        Given the customer is on the home page
        When The customer navigate to "<landingPageUrl>" Landing page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the landing page "<landingPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the landing page "<landingPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the landing page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | landingPageUrl |
            | /about-us      |