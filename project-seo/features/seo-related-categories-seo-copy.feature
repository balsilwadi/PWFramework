Feature: Related categories and SEO copy validation

    #This feature is for Crate US and CA
    @Seo @TC_SEO_023 @SeoRelatedCategories @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Customer navigates to super category page, spategory page, plp and pdp and verify the related categories and SEO copy in the page
        Given the customer is on the home page
        When Customer navigates to "<superCategoryURL>"
        Then verify SEO copy
        And verify related categories
        When Customer navigates to "<spCategoryURL>"
        Then customer should able to verify spcategory headerTitle
        Then verify SEO copy
        And verify related categories
        When Customer navigates to "<plpURL>"
        Then verify SEO copy
        And verify PLP related categories
        When customer navigates to pdp page
        Then verify PDP related categories

        Examples:
            | superCategoryItem | superCategoryURL | spCategoryItem        | spCategoryURL                     | plpURL             |
            | furniture         | /furniture/      | living room furniture | /furniture/living-room-furniture/ | /furniture/sofas/1 |
