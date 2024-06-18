Feature: Checkout - Save for Later
    As a customer,
    I should be able to add items to save for later list and move back to cart

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_003 @Smoke @Regression @TargettedRegression @Priority2 @SaveForLater @ReturningUser @Cart @Checkout @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: CHK_003_Guest User add items to SaveForLater and move items to cart
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer adds "SKU_PARCEL" to Save For Later
        Then save For Later list should be updated

    @CHK_002 @Smoke @Regression @TargettedRegression @Priority2 @SaveForLater @ReturningUser @Cart @Checkout @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: CHK_002_Returning user add items to SaveForLater and move items to cart
        Then they login using "DEFAULT_EMAIL" and "DEFAULT_PWD" and empties cart
        And customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer adds "SKU_PARCEL" to Save For Later
        Then save For Later list should be updated
