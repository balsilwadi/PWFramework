Feature: SEO tag validation in the frame pages
    Customer should be able to verify the meta tags, h1, schema, internal and external links in Frame pages

    #applicable only for crate us
    @Seo @TC_SEO_026 @SeoFramePage @CBUS
    Scenario Outline: SEO tag validation in the frame page
        Given the customer is on the home page
        When Customer navigates to the Frame page "<framePageUrl>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the page "<framePageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the page "<framePageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag "<ogType>" in the Frame page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | framePageUrl | ogType  |
            | /the-frame   | article |

    #applicable only for crate us
    @Seo @TC_SEO_027 @SeoFrameCategory @CBUS
    Scenario Outline: SEO tag validation in the frame category page
        Given the customer is on the home page
        When Customer navigates to the Frame page "<frameCategoryPageUrl>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the page "<frameCategoryPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the page "<frameCategoryPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag "<ogType>" in the Frame page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | frameCategoryPageUrl       | ogType  |
            | /the-frame/interior-design | website |

    #applicable only for crate us
    @Seo @TC_SEO_028 @SeoFrameSubcategory @CBUS
    Scenario Outline: SEO tag validation in the frame subcategory page
        Given the customer is on the home page
        When Customer navigates to the Frame page "<frameSubCategoryPageUrl>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the page "<frameSubCategoryPageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the page "<frameSubCategoryPageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag "<ogType>" in the Frame page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | frameSubCategoryPageUrl            | ogType  |
            | /the-frame/interior-design/styling | website |

    #applicable only for crate us
    @Seo @TC_SEO_029 @SeoFrameIdeasAdvice @CBUS
    Scenario Outline: SEO tag validation in the frame ideas and advice page
        Given the customer is on the home page
        When Customer navigates to the Frame page "<frameIdeasAndAdvicePageUrl>"
        Then Verify the title of the page
        And Verify the Meta Description tag in the page
        And Verify the Canonical url in the page "<frameIdeasAndAdvicePageUrl>"
        And Verify the Meta Robots tag in the page
        And Verify the OG SiteName tag in the page
        And Verify the OG Image tag in the page
        And Verify the OG url in the page "<frameIdeasAndAdvicePageUrl>"
        And Verify the OG Title tag in the page
        And Verify the OG Type tag "<ogType>" in the Frame page
        And Verify the OG Description in the page
        And Verify the FB Admins tag in the page
        And Verify the Website schema tag displayed in the page
        And Verify the Organization schema tag displayed in the page
        And Verify the external links displayed in the page
        And Verify the internal links displayed in the page
        Examples:
            | frameIdeasAndAdvicePageUrl                 | ogType  |
            | /the-frame/chef-to-chef-latrice-and-cedric | article |