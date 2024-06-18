Feature: Holiday GC
    As a customer,
    I want to purchase new Holiday giftcards

    @CHK-8815 @NewHolidayGCCheckout @HolidayGC @CBUS
    Scenario Outline: Purchase new holiday giftcard items
        Given the customer is on the home page
        When customer adds a giftcard type "<SKU_IDENTIFIER>" to cart
        # Then cart page should be displayed with added item details
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "CartPage"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        Then cart items and summary should be updated
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "ShippingPage"
        And customer selects shipmode "DEFAULT_SHIPMODE" from shipping page
        And enter email address 'contractor.asoman@crateandbarrel.com'
        When customer proceeds to payment page
        Then payment page should be displayed with the details
        Then enter "<cardType>" payment details and proceed to review page
        Then payment Information should reflect the "<cardType>" payment
        And order summary should be displayed correctly
        When customer proceeds to review page
        Then review page should be displayed with the correct details
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "ReviewPage"
        And review page should display "<cardType>" details
        And order summary should be displayed correctly
        When customer places order from review page
        Then customer should be taken to confirmation page
        And confirmation page should be displayed with detailed order information
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "ConfirmationPage"
        And confirmation order summary should be displayed correctly

        Examples:
            | giftCardType | cardType   | SKU_IDENTIFIER |
            | CBHOLID23    | MasterCard | CBHOLID23      |
            | LATTE23      | MasterCard | LATTE23        |
            | DINNER23     | MasterCard | DINNER23       |
            | GLASS23      | MasterCard | GLASS23        |
            | TONDO23      | MasterCard | TONDO23        |
            | KITCHEN23    | MasterCard | KITCHEN23      |
            | KIDS23       | MasterCard | KIDS23         |
            | BABY23       | MasterCard | BABY23         |


    @CHK-8815 @NewHolidayGCCheckout @HolidayGR @CBUS
    Scenario: Purchase giftcard from Registry
        Given the customer is on the home page
        And the customer has navigated to the shared registry link, "<registryType>"
        #Then the new "<SKU_IDENTIFIER>" giftcard for wedding registry should be displayed
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "SharedRegistryPage"
        When the customer adds a registry gift card to cart in the amount of "20"
        When the customer navigates to the cart page
        Then the gift card cart item should show a view registry link
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "CartPage"
        Then proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        When the customer clicks on the Shipping Address Next button
        Then the ship to registrant message should be visible on the Shipping page
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "ShippingPage"
        When enter email address "contractor.asoman@crateandbarrel.com"
        When the customer shipping to a gift registrant address proceeds to the Payment page
        When customer enters a billing address
        Then enter "Visa" payment details and proceed to review page
        And customer proceeds to review page after entering "DOMESTIC" billing address
        Then the ship to registrant message should be visible on the Review page
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "ReviewPage"
        When the customer buying gift registry items places an order from the Review page
        Then the ship to registrant message should be visible on the Confirmation page
        And visually compare the "<SKU_IDENTIFIER>" product image displayed in "ConfirmationPage"

        Examples:
            | registryType              | SKU_IDENTIFIER |
            | REGISTRY_WEDDING_URL      | LATTE23        |
            | REGISTRY_HOUSEWARMING_URL | LATTE23        |
            | REGISTRY_ANNIVERSARY_URL  | LATTE23        |
            | REGISTRY_BIRTHDAY_URL     | LATTE23        |
            | REGISTRY_COMMITMENT_URL   | LATTE23        |
            | REGISTRY_CELEBRATION_URL  | LATTE23        |
            | REGISTRY_BABY_URL         | KIDS23         |
            | REGISTRY_KIDS_URL         | KIDS23         |
            | REGISTRY_OTHERKIDS_URL    | KIDS23         |



    @CHK-8815 @NewGCLandingPageValidation @CBUS
    Scenario Outline: GiftCards page validation for new Holiday giftcards
        Given the customer is on the home page
        When the customer loads giftcard landing page
        Then the new giftcard type "CBHOLID23" should be displayed
        And the new giftcard type "LATTE23" should be displayed
        And the new giftcard type "DINNER23" should be displayed
        And the new giftcard type "GLASS23" should be displayed
        And the new giftcard type "TONDO23" should be displayed
        And the new giftcard type "KITCHEN23" should be displayed
        And the new giftcard type "BABY23" should be displayed
        And the new giftcard type "KIDS23" should be displayed
        And the old giftcard type "BEDDING23" shouldnt be displayed
        And the old giftcard type "CBRIBBON" shouldnt be displayed
        And the old giftcard type "CBKIDS2020" shouldnt be displayed
        And the old giftcard type "CBHEARTS" shouldnt be displayed
        And the old giftcard type "CBHOME" shouldnt be displayed
        And the old giftcard type "CBGIFT20" shouldnt be displayed
        And the old giftcard type "CBMODERN" shouldnt be displayed
        And the old giftcard type "KIDSCARD19" shouldnt be displayed