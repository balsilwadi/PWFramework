Feature: Checkout - Shipping PopUp
  As a Customer,
  I would like to verify the shipping popup for,
  Parcel, Furniture items (Basic Freight, Long Distance, Local In Home)

  Background: Customer launches Home page
    Given the customer is on the home page

  @CHK_006 @Regression @Priority2 @GuestUser @Checkout @Cart @PopUp @Delivery @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: CHK_006_Delivery Popup validations in Cart for LOC, LNG and BFT
    When customer adds "<skuType>" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer updates his zipcode to "<zipCode>" in Cart
    Then shipping method should be updated to "<shipMethod>" in cart
    When customer launches shipping popup
    Then shipping details corresponding to "<shipMethod>" should be displayed
    Then delivery details corresponding to "<shipMethod>" should be displayed

    Examples:
      | skuType           | shipMethod            | zipCode     |
      | SKU_FURNITURE     | Local In-Home         | LIH_ZIPCODE |
      | SKU_BFT           | Basic Freight         | BFT_ZIPCODE |
      | SKU_LONG_DISTANCE | Long Distance In-Home | LNG_ZIPCODE |

  @CHK_106 @Regression @Priority2 @GuestUser @Checkout @Cart @PopUp @Shipping @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: CHK_106_Shipping Popup validation in Cart
    When customer adds "SKU_PARCEL" to cart as "Ship"
    Then cart page should be displayed with added item details
    When customer launches shipping popup
    Then shipping details corresponding to "<shipMethod>" should be displayed
    When customer click on arrives by message
    Then delivery details corresponding to "<shipMethod>" should be displayed

    Examples:
      | shipMethod |
      | Standard   |
