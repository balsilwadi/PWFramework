Feature: Checkout - Cart updates
    As a Customer,
    I would like to make changes in the cart,
    Such as update quantiry, remove items, change fulfilment method

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_004 @Smoke @Regression @TargettedRegression @Priority2 @Cart @Checkout @CartUpdates @CartItemQuantity @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_004_Increment and decrement the quantity of items in Cart
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer clicks plus icon to increment quantity for item "SKU_PARCEL"
        Then cart item "SKU_PARCEL" should have quantity of "2"
        When customer clicks minus icon to decrement quantity for item "SKU_PARCEL"
        Then cart item "SKU_PARCEL" should have quantity of "1"

    @CHK_005 @Smoke @Regression @TargettedRegression @Priority2 @Cart @Checkout @CartUpdates @CartItemRemove @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_005_Remove items added to Cart
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        When customer removes "SKU_PARCEL" from cart
        Then corresponding item should be removed
        And cart header and total should be updated

    @CHK_104 @Regression @Priority2 @Checkout @Cart @FulfilmentTypes @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_104_Pickup options eligibility for parcel and furniture in mixed cart
        When customer adds "SKU_PARCEL" to cart as "Ship"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart page should be displayed with added item details
        And verify 'Store_PickUp_Message' for pickup of 'SKU_PARCEL' in cart page with 'Not Selected' availability
        When customer adds "SKU_WHS_PICKUP" to cart as "Ship"
        And verify 'Warehouse_PickUp_Message' for pickup of 'SKU_WHS_PICKUP' in cart page with 'Not Selected' availability

        When customer choose 'Store' for 'SKU_PARCEL' in 'DEFAULT_ZIPCODE' with 'In Stock' availability
        Then verify 'Store_PickUp_Message' for pickup of 'SKU_PARCEL' in cart page with 'In Stock' availability
        And verify pickup button is not displayed for 'SKU_WHS_PICKUP'
        And verify 'Warehouse_PickUp_Message' for pickup of 'SKU_WHS_PICKUP' in cart page when 'Store' selected

        When customer choose 'Warehouse' for 'SKU_WHS_PICKUP' in 'DEFAULT_ZIPCODE' with 'In Stock' availability
        Then verify 'Warehouse_PickUp_Message' for pickup of 'SKU_WHS_PICKUP' in cart page with 'In Stock' availability
        Then verify pickup button is not displayed for 'SKU_PARCEL'
        And verify 'Store_PickUp_Message' for pickup of 'SKU_PARCEL' in cart page when 'Warehouse' selected