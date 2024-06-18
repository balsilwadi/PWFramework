Feature: SEO Generated page testcases

    @Search @TC_SCH_014 @SeoGeneratedPage @CBUS @CBCA
    Scenario Outline: Customer navigates to SEO Generated page and verify the page
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        And Customer click on the  SEO Generated page "<gpLink>" link
        And Customer click on the "<seoPageUS>", "<seoPageCA>" Crate SEO Generated page
        Then Verify all the components are displayed in the SEO Generated page
        When Customer click on the Filter button
        Then Filter drawers should be displayed
        When Customer selects Type filter
        Then Verify the Type filter is selected
        When Customer selects Color filter
        Then Verify the Color filter is selected
        When Customer selects Price filter
        Then Verify the Price filter is selected
        When Customer selects Material filter
        Then Verify the Material filter is selected
        And Click on Filter Apply button
        When Customer click on Clear All link
        Then All the filter selections should be cleared
        When Customer click on Sort by dropdown
        And Select Price Low to High option
        Then Verify the Price displayed is sorted from Low to High
        When Customer click on Sort by dropdown
        And Select Price High to Low option
        Then Verify the Price displayed is sorted from High to Low
        When Customer click on Sort by dropdown
        And Select Top Rated option
        Then Verify the products are displayed based on the highest rating
        When Customer click on Sort by dropdown
        And Select Best Selling option
        Then Verify the products are displayed based on the Best Selling
        When Customer click on Sort by dropdown
        And Select New option
        Then Verify the products are displayed based on the New Arrival
        When Customer navigates to Related Categories
        Then The corresponding related categories page should be loaded
        Examples:
            | gpLink | seoPageUS   | seoPageCA   |
            | B      | Brass Lamps | Brass Lamps |


    @Search @TC_SCH_014 @SeoGeneratedPage @CB2US @CB2CA
    Scenario Outline: Customer navigates to SEO Generated page and verify the page
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        And Customer click on the  SEO Generated page "<gpLink>" link
        And Customer click on the "<seoPageUS>", "<seoPageCA>" CB2 SEO Generated page
        Then Verify all the components are displayed in the SEO Generated page
        When Customer click on the Filter button
        Then Filter drawers should be displayed
        When Customer selects Type filter
        Then Verify the Type filter is selected
        When Customer selects Color filter
        Then Verify the Color filter is selected
        When Customer selects Price filter
        Then Verify the Price filter is selected
        When Customer selects Material filter
        Then Verify the Material filter is selected
        And Click on Filter Apply button
        When Customer click on Clear All link
        Then All the filter selections should be cleared
        When Customer click on Sort by dropdown
        And Select Price Low to High option
        Then Verify the Price displayed is sorted from Low to High
        When Customer click on Sort by dropdown
        And Select Price High to Low option
        Then Verify the Price displayed is sorted from High to Low
        When Customer click on Sort by dropdown
        And Select Top Rated option
        Then Verify the products are displayed based on the highest rating
        When Customer click on Sort by dropdown
        And Select Best Selling option
        Then Verify the products are displayed based on the Best Selling
        When Customer click on Sort by dropdown
        And Select New option
        Then Verify the products are displayed based on the New Arrival
        When Customer navigates to Related Categories
        Then The corresponding related categories page should be loaded
        Examples:
            | gpLink | seoPageUS     | seoPageCA     |
            | B      | Bar Furniture | Bar Furniture |


