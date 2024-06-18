Feature: SEO tag validation in Spategory pages
    Customer should be able to verify the meta tags, h1, schema, internal and external links in spategory pages

    @Seo @TC_SEO_005 @SeoSpategoryPage @CBUS @CBCA
    Scenario Outline: Crate - SEO tag validation in Spategory pages
        Given the customer is on the home page
        When Customer navigates to "<spCategoryURL>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the spategory page "<spCategoryURL>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the cart page "<spCategoryURL>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the spategory page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | spCategoryURL                                   |
            | /decorating-and-accessories/pillows-and-throws/ |

    @Seo @TC_SEO_005 @SeoSpategoryPage @CB2US @CB2CA
    Scenario Outline: CB2 - SEO tag validation in Spategory pages
        Given the customer is on the home page
        When Customer navigates to "<spCategoryURL>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the spategory page "<spCategoryURL>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the cart page "<spCategoryURL>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the spategory page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | spCategoryURL          |
            | /dining/drinkware-bar/ |
