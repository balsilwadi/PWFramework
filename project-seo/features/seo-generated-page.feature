Feature: SEO Generated page testcases

    @Seo @TC_SEO_017 @SeoGeneratedHomepage @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: SEO tag validation in SEO Generated Home page
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the generated page "<url>"
        And Verify the Meta Robots tag "<metaRobots>" in the generated page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the generated page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the generated page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | url     | metaRobots     |
            | /search | noindex,follow |

    #this feature is for crate sites
    @Seo @TC_SEO_018 @SeoGeneratedpage @CBUS @CBCA
    Scenario Outline: Crate - SEO tag validation in SEO Generated pages
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        And Customer click on the  SEO Generated page "<gpLink>" link
        And Customer click on the "<seoPageUS>", "<seoPageCA>" Crate SEO Generated page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the generated page "<url>"
        And Verify the Meta Robots tag "<metaRobots>" in the generated page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the generated page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the generated page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | gpLink | seoPageUS             | seoPageCA             | url                    | metaRobots   |
            | A      | Adjustable Bar Stools | Adjustable Bar Stools | /adjustable-bar-stools | index,follow |

    #this feature is for CB2 sites
    @Seo @TC_SEO_018 @SeoGeneratedpage @CB2US @CB2CA
    Scenario Outline: CB2 - SEO tag validation in SEO Generated pages
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        And Customer click on the  SEO Generated page "<gpLink>" link
        And Customer click on the "<seoPageUS>", "<seoPageCA>" CB2 SEO Generated page
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the generated page "<url>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the generated page "<url>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag in the page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the h1 tag displayed in the generated page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | gpLink | seoPageUS       | seoPageCA       | url              |
            | B      | Black Furniture | Black Furniture | /black-furniture |

