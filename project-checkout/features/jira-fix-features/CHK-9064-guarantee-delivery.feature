Feature: Guaranteed Delivery
    As a customer,
    I want to verify the ship arrive time for various time machine dates

    @CHK-9064 @GuaranteedDeliveryDates @GuaranteedDeliveryDatesInNov
    Scenario Outline: Guaranteed delivery test with timemachine for November
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"
        And  arrives date for "Premium" in shipping page should be "<expectedPremiumDate>"
        And  arrives date for "Express" in shipping page should be "<expectedExpeditedDate>"

        @CBUS @CB2US
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange | expectedPremiumDate | expectedExpeditedDate |
            | Monday, 11/6/2023     | 12:00 PM    | Fri, 11/12 - Tue, 11/14   | Thu, 11/9           | Wed, 11/8             |
            | Tuesday, 11/7/2023    | 12:00 PM    | Mon, 11/13 - Wed, 11/15   | Fri, 11/10          | Thu, 11/9             |
            | Wednesday, 11/8/2023  | 12:00 PM    | Tue, 11/14 - Thu, 11/16   | Mon, 11/13          | Fri, 11/10            |
            | Thursday, 11/9/2023   | 12:00 PM    | Wed, 11/15 - Fri, 11/17   | Tue, 11/14          | Mon, 11/13            |
            | Friday, 11/10/2023    | 12:00 PM    | Thu, 11/16 - Mon, 11/20   | Wed, 11/15          | Tue, 11/14            |
            | Saturday, 11/11/2023  | 12:00 PM    | Thu, 11/16 - Mon, 11/20   | Wed, 11/15          | Tue, 11/14            |
            | Sunday, 11/12/2023    | 12:00 PM    | Thu, 11/16 - Mon, 11/20   | Wed, 11/15          | Tue, 11/14            |
            | Monday, 11/13/2023    | 12:00 PM    | Fri, 11/17 - Tue, 11/21   | Thu, 11/16          | Wed, 11/15            |
            | Tuesday, 11/14/2023   | 12:00 PM    | Mon, 11/20 - Wed, 11/22   | Fri, 11/17          | Thu, 11/16            |
            | Wednesday, 11/15/2023 | 12:00 PM    | Mon, 11/20 - Wed, 11/22   | Mon, 11/20          | Fri, 11/17            |
            | Thursday, 11/16/2023  | 12:00 PM    | Mon, 11/20 - Wed, 11/22   | Tue, 11/21          | Mon, 11/20            |
            | Friday, 11/17/2023    | 12:00 PM    | Mon, 11/20 - Wed, 11/22   | Wed, 11/22          | Tue, 11/21            |
            | Saturday, 11/18/2023  | 2:00 AM     | Fri, 11/24 - Tue, 11/28   | Wed, 11/22          | Tue, 11/21            |
            | Saturday, 11/18/2023  | 12:00 PM    | Fri, 11/24 - Tue, 11/28   | Wed, 11/22          | Tue, 11/21            |
            | Sunday, 11/19/2023    | 12:00 PM    | Fri, 11/24 - Tue, 11/28   | Wed, 11/22          | Tue, 11/21            |
            | Monday, 11/20/2023    | 12:00 PM    | Mon, 11/27 - Wed, 11/29   | Fri, 11/24          | Wed, 11/22            |
            | Tuesday, 11/21/2023   | 12:00 PM    | Tue, 11/28 - Thu, 11/30   | Mon, 11/27          | Fri, 11/24            |
            | Wednesday, 11/22/2023 | 12:00 PM    | Wed, 11/29 - Fri, 12/1    | Tue, 11/28          | Mon, 11/27            |
            | Thursday, 11/23/2023  | 12:00 PM    | Wed, 11/29 - Fri, 12/1    | Tue, 11/28          | Mon, 11/27            |
            | Friday, 11/24/2023    | 12:00 PM    | Thu, 11/30 - Mon, 12/4    | Wed, 11/29          | Tue, 11/28            |
            | Saturday, 11/25/2023  | 12:00 PM    | Thu, 11/30 - Mon, 12/4    | Wed, 11/29          | Tue, 11/28            |
            | Sunday, 11/26/2023    | 12:00 PM    | Thu, 11/30 - Mon, 12/4    | Wed, 11/29          | Tue, 11/28            |
            | Monday, 11/27/2023    | 12:00 PM    | Fri, 12/1 - Tue, 12/5     | Thu, 11/30          | Wed, 11/29            |
            | Tuesday, 11/28/2023   | 12:00 PM    | Mon, 12/4 - Wed, 12/6     | Fri, 12/1           | Thu, 11/30            |
            | Wednesday, 11/29/2023 | 12:00 PM    | Tue, 12/5 - Thu, 12/7     | Mon, 12/4           | Fri, 12/1             |
            | Thursday, 11/30/2023  | 2:00 AM     | Wed, 12/6 - Fri, 12/8     | Tue, 12/5           | Mon, 12/4             |


    @CHK-9064 @GuaranteedDeliveryDates @GuaranteedDeliveryDatesInDec
    Scenario Outline: Guaranteed delivery test with timemachine for December
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"
        And  arrives date for "Premium" in shipping page should be "<expectedPremiumDate>"
        And  arrives date for "Express" in shipping page should be "<expectedExpeditedDate>"

        @CBUS @CB2US
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange | expectedPremiumDate | expectedExpeditedDate |
            | Friday, 12/1/2023     | 12:00 PM    | Thu, 12/7 - Mon, 12/11    | Wed, 12/6           | Tue, 12/5             |
            | Saturday, 12/2/2023   | 12:00 PM    | Thu, 12/7 - Mon, 12/11    | Wed, 12/6           | Tue, 12/5             |
            | Sunday, 12/3/2023     | 12:00 PM    | Thu, 12/7 - Mon, 12/11    | Wed, 12/6           | Tue, 12/5             |
            | Monday, 12/4/2023     | 12:00 PM    | Fri, 12/8 - Tue, 12/12    | Thu, 12/7           | Wed, 12/6             |
            | Tuesday, 12/5/2023    | 12:00 PM    | Mon, 12/11 - Wed, 12/13   | Fri, 12/8           | Thu, 12/7             |
            | Wednesday, 12/6/2023  | 12:00 PM    | Tue, 12/12 - Thu, 12/14   | Mon, 12/11          | Fri, 12/8             |
            | Thursday, 12/7/2023   | 12:00 PM    | Mon 12/12 - Wed, 12/14    | Tue, 12/12          | Mon, 12/11            |
            | Friday, 12/8/2023     | 12:00 PM    | Wed, 12/14 - Mon, 12/18   | Wed, 12/13          | Tue, 12/12            |
            | Saturday, 12/9/2023   | 12:00 PM    | Wed, 12/14 - Mon, 12/18   | Wed, 12/13          | Tue, 12/12            |
            | Sunday, 12/10/2023    | 12:00 PM    | Wed, 12/14 - Mon, 12/18   | Wed, 12/13          | Tue, 12/12            |
            | Monday, 12/11/2023    | 12:00 PM    | Fri, 12/15 - Tue, 12/19   | Thu, 12/14          | Wed, 12/13            |
            | Tuesday, 12/12/2023   | 12:00 PM    | Mon, 12/18 - Tue, 12/20   | Fri, 12/15          | Thu, 12/14            |
            | Wednesday, 12/20/2023 | 12:00 PM    | Wed, 12/27 - Fri, 12/29   | Tue, 12/26          | Fri, 12/22            |
            | Thursday, 12/21/2023  | 12:00 PM    | Thu, 12/28 - Tue, 1/2     | Wed, 12/27          | Tue, 12/26            |
            | Friday, 12/22/2023    | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Saturday, 12/23/2023  | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Sunday, 12/24/2023    | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Monday, 12/25/2023    | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Tuesday, 12/26/2023   | 12:00 PM    | Tue, 1/2 - Thu, 1/4       | Fri, 12/29          | Thu, 12/28            |
            | Wednesday, 12/27/2023 | 12:00 PM    | Wed, 1/3 - Fri, 1/5       | Mon, 1/2            | Fri, 12/29            |
            | Thursday, 12/28/2023  | 12:00 PM    | Thu, 1/4 - Mon, 1/8       | Tue, 1/3            | Mon, 1/2              |
            | Friday, 12/29/2023    | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Wed, 1/4            | Tue, 1/3              |
            | Saturday, 12/30/2023  | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Wed, 1/4            | Tue, 1/3              |
            | Sunday, 12/31/2023    | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Wed, 1/4            | Tue, 1/3              |
            | Monday, 1/1/2024      | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Wed, 1/4            | Tue, 1/3              |
            | Tuesday, 1/2/2024     | 12:00 PM    | Mon, 1/8 - Wed, 1/10      | Thu, 1/5            | Wed, 1/4              |
            | Wednesday, 1/3/2024   | 12:00 PM    | Tue, 1/9 - Thur, 1/11     | Mon, 1/9            | Sun, 1/8              |

    @CHK-9064 @GuaranteedDeliveryDates @GuaranteedDeliveryDatesInNov
    Scenario Outline: Guaranteed delivery test with timemachine for November
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"

        @CBCA @CB2CA
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange |
            | Monday, 11/6/2023     | 12:00 PM    | Wed, 11/15 - Mon, 11/20   |
            | Tuesday, 11/7/2023    | 12:00 PM    | Thu, 11/16 - Tue, 11/21   |
            | Wednesday, 11/8/2023  | 12:00 PM    | Fri, 11/17 - Wed, 11/22   |
            | Thursday, 11/9/2023   | 12:00 PM    | Mon, 11/20 - Thu, 11/23   |
            | Friday, 11/10/2023    | 12:00 PM    | Tue, 11/21 - Fri, 11/24   |
            | Saturday, 11/11/2023  | 2:00 AM     | Tue, 11/21 - Fri, 11/24   |
            | Sunday, 11/12/2023    | 12:00 PM    | Tue, 11/21 - Fri, 11/24   |
            | Monday, 11/13/2023    | 12:00 PM    | Wed, 11/22 - Mon, 11/27   |
            | Tuesday, 11/14/2023   | 12:00 PM    | Thu, 11/23 - Tue, 11/28   |
            | Wednesday, 11/15/2023 | 12:00 PM    | Fri, 11/24 - Wed, 11/29   |
            | Thursday, 11/16/2023  | 12:00 PM    | Mon, 11/27 - Thu, 11/30   |
            | Friday, 11/17/2023    | 12:00 PM    | Tue, 11/28 - Fri, 12/1    |
            | Saturday, 11/18/2023  | 12:00 PM    | Tue, 11/28 - Fri, 12/1    |
            | Sunday, 11/19/2023    | 12:00 PM    | Tue, 11/28 - Fri, 12/1    |
            | Monday, 11/20/2023    | 12:00 PM    | Wed, 11/29 - Mon, 12/4    |
            | Tuesday, 11/21/2023   | 12:00 PM    | Thu, 11/30 - Tue, 12/5    |
            | Wednesday, 11/22/2023 | 2:00 AM     | Fri, 12/1 - Wed, 12/6     |
            | Thursday, 11/23/2023  | 12:00 PM    | Mon, 12/4 - Thu, 12/7     |
            | Friday, 11/24/2023    | 12:00 PM    | Tue, 12/5- Fri, 12/8      |
            | Saturday, 11/25/2023  | 12:00 PM    | Tue, 12/5- Fri, 12/8      |
            | Sunday, 11/26/2023    | 12:00 PM    | Tue, 12/5- Fri, 12/8      |
            | Monday, 11/27/2023    | 12:00 PM    | Wed, 12/6 - Mon, 12/11    |
            | Tuesday, 11/28/2023   | 12:00 PM    | Thu, 12/7- Tue, 12/12     |
            | Wednesday, 11/29/2023 | 12:00 PM    | Fri, 12/8 - Wed, 12/13    |
            | Thursday, 11/30/2023  | 12:00 PM    | Mon, 12/11 - Thu, 12/14   |

    @CHK-9064 @GuaranteedDeliveryDates @GuaranteedDeliveryDatesInDec
    Scenario Outline: Guaranteed delivery test with timemachine for December
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"

        @CBCA @CB2CA
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange |
            # | Friday, 12/1/2023     | 12:00 PM    | Tue, 12/12 - Fri, 12/15   |
            #| Saturday, 12/2/2023   | 12:00 PM    | Tue, 12/12 - Fri, 12/15   |
            #| Sunday, 12/3/2023     | 12:00 PM    | Tue, 12/12 - Fri, 12/15   |
            #| Monday, 12/4/2023     | 12:00 PM    | Wed, 12/13 - Mon, 12/18   |
            #| Tuesday, 12/5/2023    | 12:00 PM    | Thu, 12/14 - Tue, 12/19   |
            #| Wednesday, 12/6/2023  | 2:00 AM     | Fri, 12/15 - Wed, 12/20   |
            #| Thursday, 12/7/2023   | 12:00 PM    | Mon, 12/18 - Thu, 12/21   |
            #| Friday, 12/8/2023     | 12:00 PM    | Tue, 12/19 - Fri, 12/22   |
            #| Saturday, 12/9/2023   | 12:00 PM    | Tue, 12/19 - Fri, 12/22   |
            #| Sunday, 12/10/2023    | 12:00 PM    | Tue, 12/19 - Fri, 12/22   |
            #| Monday, 12/11/2023    | 2:00 AM     | Wed, 12/20 - Tue, 12/26   |
            | Tuesday, 12/12/2023   | 12:00 PM    | Thu, 12/21 - Wed, 12/27   |
            | Wednesday, 12/13/2023 | 12:00 PM    | Fri, 12/22 - Thu, 12/28   |
            | Thursday, 12/14/2023  | 12:00 PM    | Tue, 12/26 - Fri, 12/29   |
            | Friday, 12/15/2023    | 12:00 PM    | Wed, 12/27 - Tue, 1/2     |
            | Saturday, 12/16/2023  | 12:00 PM    | Wed, 12/27 - Tue, 1/2     |
            | Sunday, 12/17/2023    | 12:00 PM    | Wed, 12/27 - Tue, 1/2     |
            | Monday, 12/18/2023    | 12:00 PM    | Thu, 12/28 - Wed, 1/3     |
            | Tuesday, 12/19/2023   | 12:00 PM    | Fri, 12/29 - Thu, 1/4     |
            | Wednesday, 12/20/2023 | 12:00 PM    | Tue, 1/2 - Friday 1/5     |
            | Thursday, 12/21/2023  | 12:00 PM    | Wed, 1/3 - Mon, 1/8       |
            | Friday, 12/22/2023    | 12:00 PM    | Thu, 1/4 - Tue, 1/9       |
            | Saturday, 12/23/2023  | 12:00 PM    | Thu, 1/4 - Tue, 1/9       |
            | Sunday, 12/24/2023    | 12:00 PM    | Thu, 1/4 - Tue, 1/9       |
            | Monday, 12/25/2023    | 12:00 PM    | Thu, 1/4 - Tue, 1/9       |
            | Tuesday, 12/26/2023   | 12:00 PM    | Fri, 1/5 - Wed, 1/10      |
            | Wednesday, 12/27/2023 | 12:00 PM    | Mon, 1/8 - Thu, 1/11      |
            | Thursday, 12/28/2023  | 12:00 PM    | Tue, 1/9 - Fri, 1/12      |
            | Friday, 12/29/2023    | 12:00 PM    | Wed, 1/10 - Mon, 1/15     |
            | Saturday, 12/30/2023  | 12:00 PM    | Wed, 1/10 - Mon, 1/15     |
            | Sunday, 12/31/2023    | 12:00 PM    | Wed, 1/10 - Mon, 1/15     |

    @CHK-9064 @GuaranteedDeliveryMsg-1224
    Scenario Outline: Guaranteed delivery test with timemachine - 12/24
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"
        And  arrives date for "Premium" in shipping page should be "<expectedPremiumDate>"
        And  arrives date for "Express" in shipping page should be "<expectedExpeditedDate>"

        @CBUS @CB2US
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange    | expectedPremiumDate | expectedExpeditedDate |
            | Wednesday, 12/13/2023 | 12:00 PM    | Guaranteed delivery by 12/24 | Mon, 12/18          | Fri, 12/15            |
            | Thursday, 12/14/2023  | 12:00 PM    | Guaranteed delivery by 12/24 | Tue, 12/19          | Mon, 12/18            |
            | Friday, 12/15/2023    | 12:00 PM    | Guaranteed delivery by 12/24 | Wed, 12/20          | Tue, 12/19            |
            | Saturday, 12/16/2023  | 12:00 PM    | Guaranteed delivery by 12/24 | Wed, 12/20          | Tue, 12/19            |
            | Sunday, 12/17/2023    | 12:00 PM    | Guaranteed delivery by 12/24 | Wed, 12/20          | Tue, 12/19            |
            | Monday, 12/18/2023    | 12:00 PM    | Guaranteed delivery by 12/24 | Thu, 12/21          | Wed, 12/20            |
            | Tuesday, 12/19/2023   | 2:00 AM     | Guaranteed delivery by 12/24 | Fri, 12/22          | Thu, 12/21            |


    @CHK-9064 @GuaranteedDeliveryMsg-Updated
    Scenario Outline: Guaranteed delivery test with timemachine - 12/24
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"
        And  arrives date for "Premium" in shipping page should be "<expectedPremiumDate>"
        And  arrives date for "Express" in shipping page should be "<expectedExpeditedDate>"

        @CBUS @CB2US
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange    | expectedPremiumDate | expectedExpeditedDate |
            | Monday, 12/18/2023    | 12:00 PM    | Guaranteed delivery by 12/24 | Thu, 12/21          | Wed, 12/20            |
            | Tuesday, 12/19/2023   | 2:00 AM     | Tue, 12/26 - Thu, 12/28      | Fri, 12/22          | Thu, 12/21            |
            | Wednesday, 12/20/2023 | 12:00 PM    | Wed, 12/27 - Fri, 12/29      | Tue, 12/26          | Fri, 12/22            |


    @CHK-9064 @GuaranteedDeliveryDates @GuaranteedDeliveryDatesInDecember
    Scenario Outline: Guaranteed delivery test with timemachine for December
        Given the customer is on the home page
        When customer sets timemachine cookie for "<date>" "<cuttoffTime>" plus 10 minutes
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then arrives date in cart page should be "<expectedStandardDateRange>"
        When customer updates his zipcode to "DEFAULT_ZIPCODE" in Cart
        And proceed to checkout as a guest user with "REGULAR_ITEMS" in cart
        Then add shipping information and click on next button
        Then shipping page should be updated with "PARCEL" sku details
        And  arrives date for "Standard" in shipping page should be "<expectedStandardDateRange>"
        And  arrives date for "Premium" in shipping page should be "<expectedPremiumDate>"
        And  arrives date for "Express" in shipping page should be "<expectedExpeditedDate>"

        @CBUS @CB2US
        Examples:
            | date                  | cuttoffTime | expectedStandardDateRange | expectedPremiumDate | expectedExpeditedDate |
            | Thursday, 12/21/2023  | 12:00 PM    | Thu, 12/28 - Tue, 1/2     | Wed, 12/27          | Tue, 12/26            |
            | Friday, 12/22/2023    | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Saturday, 12/23/2023  | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Sunday, 12/24/2023    | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Monday, 12/25/2023    | 12:00 PM    | Fri, 12/29 - Wed, 1/3     | Thu, 12/28          | Wed, 12/27            |
            | Tuesday, 12/26/2023   | 12:00 PM    | Tue, 1/2 - Thu, 1/4       | Fri, 12/29          | Thu, 12/28            |
            | Wednesday, 12/27/2023 | 12:00 PM    | Wed, 1/3 - Fri, 1/5       | Tue, 1/2            | Fri, 12/29            |
            | Thursday, 12/28/2023  | 12:00 PM    | Thu, 1/4 - Mon, 1/8       | Wed, 1/3            | Tue, 1/2              |
            | Friday, 12/29/2023    | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Thu, 1/4            | Wed, 1/3              |
            | Saturday, 12/30/2023  | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Thu, 1/4            | Wed, 1/3              |
            | Sunday, 12/31/2023    | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Thu, 1/4            | Wed, 1/3              |
            | Monday, 1/1/2024      | 12:00 PM    | Fri, 1/5 - Tue, 1/9       | Thu, 1/4            | Wed, 1/3              |
            | Tuesday, 1/2/2024     | 12:00 PM    | Mon, 1/8 - Wed, 1/10      | Fri, 1/5            | Thu, 1/4              |
            | Wednesday, 1/3/2024   | 12:00 PM    | Tue, 1/9 - Thu, 1/11      | Tue, 1/9            | Mon, 1/8              |