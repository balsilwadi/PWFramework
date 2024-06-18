Feature: Filter Registry Items

    As a user,
    I should be able to filter the product by category,price, availability status
    so that I can see products were filtered as expected.

    # Scenario: Filter the products by availability status in guest list page.
    # Scenario: Filter the products by category in registrant list page.
    # Scenario: Filter the products by price in registrant list page.


    Background: Launch the Home page
        Given the customer is on the home page
    Scenario Outline: Filter the products by category in guest list page.

        Given they navigate to the guest list page.
        #get the registry id from JSON file (users-with-items.json)
        #form the URL and go to the guest list page
        Then the page should be valid
        #have to set the page object in previous step
        #create the verifyPage() method in guest list page class


        When they apply one filter from the category section.
        # select any filter from the category section randomly
        Then the products are filtered by selected category
        #verify the category section name
        #verify the product count matches the total count in the header
        #verify the product container-
        #select any one of the Random container
        #verify SKU number, description,add to cart button
        #if it has group gift fund verify the contribute button



        When they navigate to the guest list page
        And they apply two filters from the category section
        # select any two filters from category section randomly
        Then the products are filtered by selected categories
    #verify the category section name
    #verify the product count matches the total count in the header
    #verify the product container-
    #Randomly select any one of the container
    #verify SKU number, description,add to cart button
    #if it has group gift fund verify the contribute button

    Scenario Outline: Filter the products by price in guest list page.

        And they navigate to the guest list page
        #get the registry id from JSON file (users-with-items.json)
        #form the URL and go to the guest list page

        Then the page should be valid
        #have to set the page object in previous step
        #create the verifyPage() method in guest list page class
        When they apply one filter from the price section
        # select any filter from price section randomly
        Then the products are filtered by selected price range
        #verify the products prices comes under the price range
        #verify the product count matches the total count in the header
        #verify the product container-
        #randomly select any one of the container
        #verify SKU number, description,add to cart button
        #if it has group gift fund verify the contribute button



        When they navigate to the guest list page
        And they apply two filters from the price section
        # select any two filters from price section randomly
        Then the products are filtered by selected price range
#verify the products prices comes under the price range
#verify the product count matches the total count in the header
#verify the product container-
#Randomly select any one of the container
#verify SKU number, description,add to cart button
#if it has group gift fund verify the contribute button
