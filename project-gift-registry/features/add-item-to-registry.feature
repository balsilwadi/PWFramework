Feature: Add products to registry
    As a customer I want to be able to add items to registry

    Background: Launch the Home page and authenticate
        Given the customer is on the home page
        And Customer navigates to sign in page
        And registry with no product is found
        And the customer has been authenticated
        And they should be on the registrant list page

    @AddItemToRegistry @grss @Regression
    Scenario Outline: Sign in and add product to existing registry

        Given the product with "parcelSKU" sku is retrieved
        And that a customer navigates to the PDP
        When they add the product to their registry
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry



    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product from category pages
        Given a random category uri has been retreived

        When the customer navigates to category page
        And they add the first item to registry
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product from spategory pages
        Given a random spategory uri has been retreived

        When the customer navigates to category page
        And they add the first item to registry
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry


    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product from Search Results page
        When Customer searches for Keyword "sofa"
        And they add the first item to registry
        Then they should see an add-to-registry confirmation

        And the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product from SEO page

        When Customer is navigated to SEO Generated Homepage
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        And Customer click on the  SEO Generated page "<gpLink>" link
        And Customer click on the "<seoPageUS>", "<seoPageCA>" Crate SEO Generated page

        And they add the first item to registry from SEO page
        Then they should see an add-to-registry confirmation

        And the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

        Examples:
            | gpLink | seoPageUS         | seoPageCA   | seoPageCB2    |
            | B      | Baby Bedding Sets | Brass Lamps | Beverage Cart |


    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product from SEO page

        When Customer is navigated to SEO Generated Homepage
        Given the customer is on the home page
        When Customer is navigated to SEO Generated Homepage
        And Customer click on the  SEO Generated page "<gpLink>" link
        And Customer click on the "<seoPageUS>", "<seoPageCA>" CB2 SEO Generated page

        And they add the first item to registry from SEO page
        Then they should see an add-to-registry confirmation

        And the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

        Examples:
            | gpLink | seoPageUS     | seoPageCA     |
            | B      | Beverage Cart | Beverage Cart |



    @AddItemToRegistry @grss @Regression
    Scenario: Adding product from family sku page

        Given the product with "familySKU" sku is retrieved
        And that a customer navigates to the family sku page
        When they add the product to their registry
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product to registry from Wide PLP page
        Given a random wide plp uri has been retreived

        When the customer navigates to wide plp page
        And they add the first item to registry
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry
    @AddItemToRegistry @grss @Regression

    Scenario: Adding product from one click registry page
        When the customer navigates to one click registry page
        And they open a first registry bundle
        And they add the first item to registry from bundle
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    @AddItemToRegistry @grss @Regression

    Scenario: Adding multiple products from one click registry page using one click
        When the customer navigates to one click registry page
        And they open a first registry bundle
        And they add all item to registry from bundle
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    @AddItemToRegistry @grss @Regression
    Scenario: Adding product from add to Registry confirmation container
        When Customer searches for Keyword "sofa"
        And they add the first item to registry
        Then they should see an add-to-registry confirmation

        When they add the first product from the 'you may also want' carousel
        Then they should see 'Added' as a confirmation message

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    @AddItemToRegistry @grss @Regression
    Scenario Outline: Adding product to registry from Wide Collection PLP page
        Given a random wide collection plp uri has been retreived

        When the customer navigates to wide collection plp page
        And they add the first item to registry
        Then they should see an add-to-registry confirmation

        When the customer navigates to registrant list page
        Then the page should be valid
        And the item should be listed in their registry

    # Feature: Adding item to gift registry
    #     Scenario: Adding product from PDP - Done
    #     Scenario: Adding products from PLP- Removed
    #     Scenario: Adding product from Search Results page - Done
    #     Scenario: Adding product from SEO page - Done
    #     Scenario: Adding product from category pages -Done
    #     Scenario: Adding product from spategory pages - Done
    #     #Scenario: Adding product from sub-category pages - Removed there is no Sub Category
    #     Scenario: Adding product from add to Registry confirmation container - Raj
    #     Scenario: Adding product from family sku page - Done
    #     Scenario: Adding product from family PLP page
    #     Scenario: Adding product to registry from Wide PLP page
    #     Scenario: Adding product from grouper PLP page
    #     Scenario: Adding product from MTO PDP - Removed we cant add MTO Product to Registry
    #Scenario: Adding product to registry from croos brand


    # Types of PLP
    #     Search PLP
    # SEO PLP
    # Regular PLP (Category/SPategory/)
    # Wide PLP
    # Wide collections PLP





    Scenario: Adding product from real registries page
