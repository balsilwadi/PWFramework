Feature: SEO title validation in all the Kids pages
    Customer should be able to verify the title in Kids home page, Supercategory page, Spategory page, PLP and PDP

    #This feature is applicable for Crate US and CA
    @Seo @TC_SEO_030 @SeoKidsPageTitle @CBUS @CBCA
    Scenario Outline: SEO title validation in all the Kids superCategory, spategory, PLP, and PDP pages
        Given the customer is on the home page
        When Customer navigates to "<supercategory>"
        Then Verify kids page title
        When Customer navigates to "<spategory>"
        Then Verify kids page title
        When Customer navigates to "<plp>"
        Then Verify kids page title
        When customer navigates to pdp page
        Then Verify kids page title
        Examples:
            | searchTerm | supercategory    | spategory                | plp          |
            | table      | /kids/furniture/ | /kids/bedroom-furniture/ | /kids/beds/1 |