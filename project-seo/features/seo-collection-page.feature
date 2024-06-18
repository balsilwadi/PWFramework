Feature: SEO tag validation in Collections page
    Customer should be able to verify the meta tags, h1, schema, internal and external links in Collections page

    # this testcase is applicable only for crate us and ca
    @Seo @TC_SEO_014 @SeoCollectionPage @CBUS @CBCA
    Scenario Outline: SEO tag validation in Collections page
        Given the customer is on the home page
        When The customer navigate to "<collectionPageUrl>" Collection page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the cart page "<collectionPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the cart page "<collectionPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the h1 tag displayed in the Collection page
        And Verify the Website schema tag displayed in the page
        And Verify the Breadcrumb schema tag displayed in the Collection page
        And Verify the Organization schema tag displayed in the Collection page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | collectionPageUrl                                 |
            | /furniture/modular-storage-collections/           |
            | /outdoor-furniture/outdoor-furniture-collections/ |

    # this testcase is applicable only for crate us and ca
    @Seo @TC_SEO_015 @SeoSingleCollectionPage @CBUS @CBCA
    Scenario Outline: SEO tag validation in Single Collections page
        Given the customer is on the home page
        When The customer navigate to "<collectionPageUrl>" Collection page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the cart page "<collectionPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the cart page "<collectionPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the h1 tag displayed in the Collection page
        And Verify the Website schema tag displayed in the page
        And Verify the Breadcrumb schema tag displayed in the Collection page
        And Verify the Organization schema tag displayed in the Collection page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | collectionPageUrl                                              |
            | /dining-and-entertaining/aspen-porcelain-tabletop-collection/1 |
            | /dining-and-entertaining/mercer-tabletop-collection/1          |


