Feature: As a Customer I want to add/delete items to favorites list
    As a user
    I want to test
    adding/removing and persistenc of items in Favorites list

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Smoke @Account @Favorites @ACNT_018 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Customer add/remove items in favorites list
        When Customer clicks on sign in from header
        When Customer sign in with "Favorites" login credentials
        Then Account page should display with Hi message
        When Customer navigate to favorite page from account left navigation
        Then Favorites page should display without items
        When Customer search and add to My Favourite list
        Then Customer views favorites page with items
        When Customer signout from favorites page
        # When Customer logs out from header
        And Customer clicks on sign in from header
        And Customer sign in with "Favorites" login credentials
        And Customer navigates to My Account page
        Then Account page should display with Hi message
        When Customer navigate to favorite page from account left navigation
        Then Customer views favorites page with items
        When Customer removes the items from favorites
        Then Favorites page should display without items