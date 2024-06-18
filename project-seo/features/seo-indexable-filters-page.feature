Feature: Indexable Filters SEO page test

    @Seo @TC_SEO_031 @SeoIFpage @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: SEO tag validation in SEO Indexable filter pages
        Given the customer is on the home page
        When Customer is navigated to an Indexable Filters page "<crateUrl>" "<cb2Url>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the Indexable Filters page "<crateUrl>" "<cb2Url>"
        And Verify the Meta Robots tag "<metaRobots>" in the Indexable Filters page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the Indexable Filters page "<crateUrl>" "<cb2Url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the Product Collection schema tag displayed in the page
        And Verify the h1 tag displayed in the Indexable Filters
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | crateUrl                                  | cb2Url                                                      | metaRobots   |
            | /furniture/sofas/1/filters/brown-sofa-776 | /accessories/wall-mirrors/1/filters/silver-wall-mirrors-397 | index,follow |