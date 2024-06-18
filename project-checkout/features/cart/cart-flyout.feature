Feature: Checkout - Flyout
    As a Customer,
    I would like to verify the cart flyout for various scenarios

    Background: Customer launches Home page
        Given the customer is on the home page
        When customer adds "<item_type>" to cart as "Ship"
        Then cart page should display same availability as seen in PDP for "SKU_PARCEL"

    #@CHK_XXX @Regression @Priority3 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_XXX_Cart flyout for guest user
    #TO BE CREATED

    #@CHK_XXX @Regression @Priority3 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_XXX_Returning user sign in from cart flyout
    #TO BE CREATED

    #@CHK_XXX @Regression @Priority3 @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_XXX_Logged in user skips cart flyout
#TO BE CREATED

