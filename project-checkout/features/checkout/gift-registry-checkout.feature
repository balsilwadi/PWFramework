Feature: Checkout - GiftRegistry
    As a Customer,
    I want make purchases from gift Registry

    Background: Customer launches Home page
        Given the customer is on the home page

    @CHK_027 @E2E @TargettedRegression @Priority3 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CB2US
    Scenario: CHK_027_Gift registry gift card order
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL"
        When the customer closes the popup if showing
        When the customer adds a registry gift card to cart in the amount of "20"
        When the customer navigates to the cart page
        Then the gift card cart item should show a view registry link
        Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page
        When the customer enters a receipt email address
        When the customer shipping to a gift registrant address proceeds to the Payment page
        Then enter "Visa" payment details and proceed to review page
        When customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then the ship to registrant message should be visible on the Review page
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page

    @CHK_028 @E2E @TargettedRegression @Priority2 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CB2US
    Scenario: CHK_028_Gift registry gift card order to customer address
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL"
        When the customer closes the popup if showing
        When the customer adds a registry gift card to cart in the amount of "20"
        When the customer navigates to the cart page
        Then the gift card cart item should show a view registry link
        And verifies whether there is no tax and shipping charges added
        Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on add new address and enter the address
        When the customer enters a receipt email address
        And Registry Item label should display in the shipping page
        When customer proceeds to payment page
        Then enter "Visa" payment details and proceed to review page
        When customer proceeds to review page
        And Registry Item label should display in the Review page
        When customer places order from review page
        Then customer should be taken to confirmation page
        And Registry Item label should display in the confirmation page

    @CHK_029 @E2E @Smoke @TargettedRegression @Priority1 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CB2US @CBCA @CB2CA
    Scenario: CHK_029_GiftRegistry Parcel order using CBCC MC card
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_WITH_PARCEL"
        When the customer closes the popup if showing

        When the customer adds first item to cart
        Then click on CHECKOUT NOW button in gift registry flyout

        Given proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page

        When the customer enters a receipt email address
        Then the customer shipping to a gift registrant address proceeds to the Payment page

        Then enter "<cardType>" payment details and proceed to review page
        When customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then the ship to registrant message should be visible on the Review page

        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page

        @UsOnly
        Examples:
            | cardType   |
            | C&B/CB2 MC |

    @CHK_030 @E2E @TargettedRegression @Priority1 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_030_GiftRegistry Furniture order using credit card
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_WITH_FURNITURE"
        When the customer closes the popup if showing
        When the customer adds first item to cart
        Then click on CHECKOUT NOW button in gift registry flyout
        Given proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer opts to ship to customers address
        When the customer clicks on the Shipping Address Next button
        Then shipping page should be loaded with "FURNITURE" sku details for returning user
        And customer selects notification preferences from shipping page
        And the customer enters a receipt email address
        Then order summary should be displayed correctly
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And review page should display "Visa" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly

    @CHK_031 @E2E @TargettedRegression @Priority3 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_031_Items added from Multiple Registries and ship to Multiple registrants
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_WITH_PARCEL"
        And the customer closes the popup if showing
        When the customer adds first item to cart
        And click on CHECKOUT NOW button in gift registry flyout
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_WITH_PARCEL_2"
        And the customer closes the popup if showing
        When the customer adds first item to cart
        And click on CHECKOUT NOW button in gift registry flyout
        Given proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        And choose the ship to multiple addresses and select ship to registrants address
        Then Verify multiple recipient addresses
        And the ship to registrant message should be visible on the Shipping page
        When the customer enters a receipt email address
        And the customer shipping to a gift registrant address proceeds to the Payment page
        And customer enters a billing address
        And enter "Visa" payment details and proceed to review page
        Then the customer shipping to a gift registrant address proceeds to the Review page
        And the ship to registrant message should be visible on the Review page
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page

    @CHK_032 @E2E @TargettedRegression @Priority2 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_032_GiftRegistry purchase where Thank you Manager is enabled
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL"
        When the customer closes the popup if showing
        When the customer adds a registry gift card to cart in the amount of "20"
        When the customer navigates to the cart page
        Then the gift card cart item should show a view registry link
        Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page
        When the customer enters a receipt email address
        When the customer shipping to a gift registrant address proceeds to the Payment page
        When customer enters a billing address
        Then enter "Visa" payment details and proceed to review page
        When customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then Thank you manager section is displayed with correct details
        Then the ship to registrant message should be visible on the Review page
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page

    @CHK_033 @E2E @TargettedRegression @Priority2 @Checkout @Checkout-USR3 @GRCheckout @GiftRegistryBOPSCheckout @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_033_BOPS order from Gift Registry
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_WITH_BOPS"
        When the customer closes the popup if showing
        And the customer adds first item to cart
        Then click on CHECKOUT NOW button in gift registry flyout
        And the registry item in the cart should show a view registry link
        And select pickup option and choose the store
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        And Registry Item label should display in the shipping page
        And add pickup information and click on Next button
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        When customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        And Registry Item label should display in the Review page
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And confirmation order summary should be displayed correctly
        And Registry Item label should display in the confirmation page

    @CHK_034 @E2E @Smoke @TargettedRegression @Priority2 @Checkout @Checkout-USR3 @GRCheckout @GuestUser @CBUS @CBCA @CB2US @CB2CA
    Scenario: CHK_034_BOPS and Parcel order from Gift Registry
        Given the customer has navigated to the shared registry link, "REGISTRY_SHARED_URL_BOPS_PARCEL"
        When the customer closes the popup if showing
        And the customer adds first item to cart
        #And the customer closes the gift registry checkout flyout
        And the customer adds second item to cart
        Then click on CHECKOUT NOW button in gift registry flyout
        And the registry item in the cart should show a view registry link
        And select pickup option and choose the store
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        And Registry Item label should display in the shipping page
        And add pickup information and click on Next button
        Then payment page should be displayed with the details
        Then enter "Visa" payment details and proceed to review page
        Then payment Information should reflect the "Visa" card type
        When customer enters "DOMESTIC" billing address
        And customer proceeds to review page after entering "DOMESTIC" billing address
        And Registry Item label should display in the Review page
        When customer places order from review page
        Then customer should be taken to confirmation page
        Then the ship to registrant message should be visible on the Confirmation page
        And Registry Item label should display in the confirmation page