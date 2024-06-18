Feature: Checkout - CHK-9163 ZipCode fix Tests
    HK-9163 ZipCode fix Tests

    @CHK-9163 @ZipCodeFix @CBUS @RegularZipCodes
    Scenario Outline: Verify the new zipcodes are accepted in Cart
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart should accept all customer zipcodes from below list
            | description | zipCode |
            | REGULAR     | 11437   |
            | REGULAR     | 20252   |
            | REGULAR     | 25888   |
            | REGULAR     | 34441   |
            | REGULAR     | 35270   |
            | REGULAR     | 40166   |
            | REGULAR     | 40750   |
            | REGULAR     | 41021   |
            | REGULAR     | 41025   |
            | REGULAR     | 46213   |
            | REGULAR     | 46288   |
            | REGULAR     | 55131   |
            | REGULAR     | 56908   |
            | REGULAR     | 56935   |
            | REGULAR     | 56963   |
            | REGULAR     | 56964   |
            | REGULAR     | 56966   |
            | REGULAR     | 56967   |
            | REGULAR     | 56968   |
            | REGULAR     | 56969   |
            | REGULAR     | 56970   |
            | REGULAR     | 56971   |
            | REGULAR     | 56973   |
            | REGULAR     | 56980   |
            | REGULAR     | 56981   |
            | REGULAR     | 56982   |
            | REGULAR     | 56983   |
            | REGULAR     | 56984   |
            | REGULAR     | 56985   |
            | REGULAR     | 56998   |
            | REGULAR     | 56999   |
            | REGULAR     | 58803   |
            | REGULAR     | 60418   |
            | REGULAR     | 60569   |
            | REGULAR     | 63380   |
            | REGULAR     | 64162   |
            | REGULAR     | 72255   |
            | REGULAR     | 72643   |
            | REGULAR     | 73960   |
            | REGULAR     | 75059   |
            | REGULAR     | 75064   |
            | REGULAR     | 76190   |
            | REGULAR     | 85288   |
            | REGULAR     | 87654   |
            | REGULAR     | 88888   |
            | REGULAR     | 89437   |
            | REGULAR     | 90134   |
            | REGULAR     | 95214   |
            | REGULAR     | 96939   |
            | REGULAR     | 97079   |
            | REGULAR     | 97129   |
            | REGULAR     | 97250   |
            | REGULAR     | 97252   |
            | REGULAR     | 99529   |
            | REGULAR     | 99545   |
            | REGULAR     | 99623   |
            | REGULAR     | 99629   |
            | REGULAR     | 99731   |
            | REGULAR     | 99812   |
            | REGULAR     | 99933   |
            | REGULAR     | 99937   |
            | REGULAR     | 99938   |
            | REGULAR     | 99939   |
            | REGULAR     | 99940   |
            | REGULAR     | 99941   |
            | REGULAR     | 99942   |
            | REGULAR     | 99944   |
            | REGULAR     | 99944   |
            | REGULAR     | 99945   |
            | REGULAR     | 99948   |
            | REGULAR     | 99949   |
            | REGULAR     | 66630   |
            | REGULAR     | 11437   |
            | REGULAR     | 11437   |
            | REGULAR     | 20252   |
            | REGULAR     | 20252   |
            | REGULAR     | 27268   |
            | REGULAR     | 27268   |
            | REGULAR     | 34072   |
            | REGULAR     | 34094   |
            | REGULAR     | 41021   |
            | REGULAR     | 41021   |
            | REGULAR     | 46288   |
            | REGULAR     | 46288   |
            | REGULAR     | 46288   |
            | REGULAR     | 55131   |
            | REGULAR     | 56908   |
            | REGULAR     | 56908   |
            | REGULAR     | 56908   |
            | REGULAR     | 56963   |
            | REGULAR     | 56963   |
            | REGULAR     | 56963   |
            | REGULAR     | 56964   |
            | REGULAR     | 56964   |
            | REGULAR     | 56964   |
            | REGULAR     | 56966   |
            | REGULAR     | 56966   |
            | REGULAR     | 56966   |
            | REGULAR     | 56968   |
            | REGULAR     | 56968   |
            | REGULAR     | 56968   |
            | REGULAR     | 56969   |
            | REGULAR     | 56969   |
            | REGULAR     | 56969   |
            | REGULAR     | 56970   |
            | REGULAR     | 56970   |
            | REGULAR     | 56970   |
            | REGULAR     | 56971   |
            | REGULAR     | 56971   |
            | REGULAR     | 56971   |
            | REGULAR     | 56973   |
            | REGULAR     | 56973   |
            | REGULAR     | 56973   |
            | REGULAR     | 56980   |
            | REGULAR     | 56980   |
            | REGULAR     | 56980   |
            | REGULAR     | 56981   |
            | REGULAR     | 56981   |
            | REGULAR     | 56981   |
            | REGULAR     | 56982   |
            | REGULAR     | 56982   |
            | REGULAR     | 56982   |
            | REGULAR     | 56983   |
            | REGULAR     | 56983   |
            | REGULAR     | 56983   |
            | REGULAR     | 56984   |
            | REGULAR     | 56984   |
            | REGULAR     | 56984   |
            | REGULAR     | 56985   |
            | REGULAR     | 56985   |
            | REGULAR     | 56985   |
            | REGULAR     | 56998   |
            | REGULAR     | 56998   |
            | REGULAR     | 56998   |
            | REGULAR     | 58803   |
            | REGULAR     | 60418   |
            | REGULAR     | 60569   |
            | REGULAR     | 60569   |
            | REGULAR     | 63380   |
            | REGULAR     | 63380   |
            | REGULAR     | 66630   |
            | REGULAR     | 66630   |
            | REGULAR     | 72643   |
            | REGULAR     | 75059   |
            | REGULAR     | 75059   |
            | REGULAR     | 75064   |
            | REGULAR     | 75064   |
            | REGULAR     | 85288   |
            | REGULAR     | 88888   |
            | REGULAR     | 88888   |
            | REGULAR     | 95214   |
            | REGULAR     | 95214   |
            | REGULAR     | 96273   |
            | REGULAR     | 96301   |
            | REGULAR     | 96315   |
            | REGULAR     | 96331   |
            | REGULAR     | 96371   |
            | REGULAR     | 96504   |
            | REGULAR     | 96632   |
            | REGULAR     | 96633   |
            | REGULAR     | 96641   |
            | REGULAR     | 96645   |
            | REGULAR     | 96691   |
            | REGULAR     | 96692   |
            | REGULAR     | 96693   |
            | REGULAR     | 96694   |
            | REGULAR     | 96695   |
            | REGULAR     | 96696   |
            | REGULAR     | 97079   |
            | REGULAR     | 97079   |
            | REGULAR     | 97129   |
            | REGULAR     | 97129   |
            | REGULAR     | 97250   |
            | REGULAR     | 97250   |
            | REGULAR     | 97252   |
            | REGULAR     | 97252   |
            | REGULAR     | 99933   |
            | REGULAR     | 99937   |
            | REGULAR     | 99938   |
            | REGULAR     | 99939   |
            | REGULAR     | 99940   |
            | REGULAR     | 99941   |
            | REGULAR     | 99942   |
            | REGULAR     | 99944   |
            | REGULAR     | 99944   |
            | REGULAR     | 99945   |
            | REGULAR     | 99947   |
            | REGULAR     | 99948   |
            | REGULAR     | 99949   |
            | REGULAR     | 34096   |
            | REGULAR     | 34094   |
            | REGULAR     | 99951   |
            | REGULAR     | 89437   |
            | REGULAR     | 90134   |
            | REGULAR     | 90134   |

    @CHK-9163 @ZipCodeFix @CBCA @CB2CA @RegularZipCodes
    Scenario Outline: Verify the new zipcodes are accepted in Cart
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart should accept all customer zipcodes from below list
            | description | zipCode |
            | REGULAR     | V2S 1K2 |
            | REGULAR     | V2S 2G1 |
            | REGULAR     | V2S 3M7 |
            | REGULAR     | V2S 3P1 |
            | REGULAR     | V2S 5C1 |
            | REGULAR     | V2S 6R4 |
            | REGULAR     | V2S 6Y6 |
            | REGULAR     | V2S 7P3 |
            | REGULAR     | V2T 1S9 |
            | REGULAR     | V2T 1V8 |
            | REGULAR     | V2T 6C5 |
            | REGULAR     | V4X 2R5 |
            | REGULAR     | T7X 5A1 |
            | REGULAR     | T7X 5A2 |
            | REGULAR     | T7X 5A3 |
            | REGULAR     | T7X 5A4 |
            | REGULAR     | T7X 5A5 |
            | REGULAR     | T7X 5A6 |
            | REGULAR     | T7X 5A7 |
            | REGULAR     | T7X 5A8 |
            | REGULAR     | T7X 5A9 |
            | REGULAR     | T7X 5B1 |
            | REGULAR     | L7J 1J4 |
            | REGULAR     | L7J 2V3 |
            | REGULAR     | T4A 0A7 |
            | REGULAR     | T4A 0B1 |
            | REGULAR     | T4A 0R6 |
            | REGULAR     | T4A 0R7 |
            | REGULAR     | T4A 2G6 |
            | REGULAR     | T4A 2J6 |
            | REGULAR     | T4A 2K5 |
            | REGULAR     | T4B 2A4 |
            | REGULAR     | T4B 2M7 |
            | REGULAR     | T4B 2M9 |
            | REGULAR     | T4B 2V1 |
            | REGULAR     | T4B 3G1 |
            | REGULAR     | T4B 3H2 |
            | REGULAR     | T4B 3H3 |
            | REGULAR     | L1S 1P6 |
            | REGULAR     | L1S 7T8 |
            | REGULAR     | L1T 4V4 |
            | REGULAR     | L1Z 0R3 |
            | REGULAR     | T0E 0A5 |
            | REGULAR     | V4W 1W1 |
            | REGULAR     | L9R 0K9 |
            | REGULAR     | G8B 5V5 |
            | REGULAR     | G8B 5V6 |
            | REGULAR     | G8B 5V9 |
            | REGULAR     | B4H 0C5 |
            | REGULAR     | B4H 0E2 |
            | REGULAR     | B4H 3Y7 |
            | REGULAR     | B4H 3Z4 |
            | REGULAR     | B4H 3Z9 |
            | REGULAR     | N9V 0A4 |
            | REGULAR     | N9V 0A5 |
            | REGULAR     | N9V 1E3 |
            | REGULAR     | N9V 1W9 |
            | REGULAR     | N9V 2Z6 |
            | REGULAR     | K7N 1A9 |
            | REGULAR     | K7N 1B2 |
            | REGULAR     | K7N 1N2 |
            | REGULAR     | G5J 0B7 |
            | REGULAR     | H1J 1C2 |
            | REGULAR     | H1J 1T3 |
            | REGULAR     | H1J 1Y8 |
            | REGULAR     | H1J 2H6 |
            | REGULAR     | H1K 0H4 |
            | REGULAR     | H1M 3A3 |
            | REGULAR     | H1M 3A5 |
            | REGULAR     | H1M 3R8 |
            | REGULAR     | H1M 3S4 |
            | REGULAR     | H1M 3S5 |
            | REGULAR     | H1M 3S9 |
            | REGULAR     | N0H 0B7 |
            | REGULAR     | B2G 0B5 |
            | REGULAR     | B2G 0B6 |
            | REGULAR     | V3G 2W1 |
            | REGULAR     | V4X 2L2 |
            | REGULAR     | V4X 2L3 |
            | REGULAR     | V4X 2N1 |
            | REGULAR     | H1K 3W3 |
            | REGULAR     | H1K 4G7 |
            | REGULAR     | H1K 5G1 |
            | REGULAR     | H1M 1W3 |

    @CHK-9163 @ZipCodeFix @CB2US @RegularZipCodes
    Scenario Outline: Verify the new zipcodes are accepted in Cart
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart should accept all customer zipcodes from below list
            | description | zipCode |
            | REGULAR     | 10949   |
            | REGULAR     | 11437   |
            | REGULAR     | 17335   |
            | REGULAR     | 19060   |
            | REGULAR     | 19176   |
            | REGULAR     | 19195   |
            | REGULAR     | 20252   |
            | REGULAR     | 20417   |
            | REGULAR     | 20528   |
            | REGULAR     | 20529   |
            | REGULAR     | 20993   |
            | REGULAR     | 22350   |
            | REGULAR     | 25888   |
            | REGULAR     | 27497   |
            | REGULAR     | 27815   |
            | REGULAR     | 28263   |
            | REGULAR     | 31169   |
            | REGULAR     | 32143   |
            | REGULAR     | 33106   |
            | REGULAR     | 33206   |
            | REGULAR     | 33222   |
            | REGULAR     | 33646   |
            | REGULAR     | 34441   |
            | REGULAR     | 35270   |
            | REGULAR     | 37544   |
            | REGULAR     | 40122   |
            | REGULAR     | 40166   |
            | REGULAR     | 40750   |
            | REGULAR     | 41021   |
            | REGULAR     | 41025   |
            | REGULAR     | 43194   |
            | REGULAR     | 46213   |
            | REGULAR     | 46288   |
            | REGULAR     | 49528   |
            | REGULAR     | 50324   |
            | REGULAR     | 50982   |
            | REGULAR     | 50983   |
            | REGULAR     | 55131   |
            | REGULAR     | 56908   |
            | REGULAR     | 56935   |
            | REGULAR     | 56945   |
            | REGULAR     | 56950   |
            | REGULAR     | 56963   |
            | REGULAR     | 56964   |
            | REGULAR     | 56965   |
            | REGULAR     | 56966   |
            | REGULAR     | 56967   |
            | REGULAR     | 56968   |
            | REGULAR     | 56969   |
            | REGULAR     | 56970   |
            | REGULAR     | 56971   |
            | REGULAR     | 56973   |
            | REGULAR     | 56980   |
            | REGULAR     | 56981   |
            | REGULAR     | 56982   |
            | REGULAR     | 56983   |
            | REGULAR     | 56984   |
            | REGULAR     | 56985   |
            | REGULAR     | 56998   |
            | REGULAR     | 56999   |
            | REGULAR     | 58803   |
            | REGULAR     | 60418   |
            | REGULAR     | 60484   |
            | REGULAR     | 60569   |
            | REGULAR     | 60689   |
            | REGULAR     | 60958   |
            | REGULAR     | 63380   |
            | REGULAR     | 64162   |
            | REGULAR     | 66630   |
            | REGULAR     | 70891   |
            | REGULAR     | 72255   |
            | REGULAR     | 72643   |
            | REGULAR     | 73960   |
            | REGULAR     | 74439   |
            | REGULAR     | 75059   |
            | REGULAR     | 75064   |
            | REGULAR     | 76190   |
            | REGULAR     | 78542   |
            | REGULAR     | 81403   |
            | REGULAR     | 84129   |
            | REGULAR     | 85117   |
            | REGULAR     | 85118   |
            | REGULAR     | 85119   |
            | REGULAR     | 85120   |
            | REGULAR     | 85121   |
            | REGULAR     | 85122   |
            | REGULAR     | 85123   |
            | REGULAR     | 85127   |
            | REGULAR     | 85128   |
            | REGULAR     | 85130   |
            | REGULAR     | 85131   |
            | REGULAR     | 85132   |
            | REGULAR     | 85135   |
            | REGULAR     | 85137   |
            | REGULAR     | 85139   |
            | REGULAR     | 85140   |
            | REGULAR     | 85141   |
            | REGULAR     | 85143   |
            | REGULAR     | 85145   |
            | REGULAR     | 85147   |
            | REGULAR     | 85172   |
            | REGULAR     | 85173   |
            | REGULAR     | 85178   |
            | REGULAR     | 85190   |
            | REGULAR     | 85191   |
            | REGULAR     | 85192   |
            | REGULAR     | 85193   |
            | REGULAR     | 85194   |
            | REGULAR     | 85288   |
            | REGULAR     | 87654   |
            | REGULAR     | 88888   |
            | REGULAR     | 89087   |
            | REGULAR     | 89157   |
            | REGULAR     | 89437   |
            | REGULAR     | 90134   |
            | REGULAR     | 90895   |
            | REGULAR     | 92247   |
            | REGULAR     | 92248   |
            | REGULAR     | 93475   |
            | REGULAR     | 93737   |
            | REGULAR     | 95214   |
            | REGULAR     | 96939   |
            | REGULAR     | 97079   |
            | REGULAR     | 97129   |
            | REGULAR     | 97250   |
            | REGULAR     | 97252   |
            | REGULAR     | 97475   |
            | REGULAR     | 98113   |
            | REGULAR     | 98175   |
            | REGULAR     | 98213   |
            | REGULAR     | 98417   |
            | REGULAR     | 98419   |
            | REGULAR     | 98448   |
            | REGULAR     | 98490   |
            | REGULAR     | 98496   |
            | REGULAR     | 99529   |
            | REGULAR     | 99545   |
            | REGULAR     | 99623   |
            | REGULAR     | 99629   |
            | REGULAR     | 99731   |
            | REGULAR     | 99812   |
            | REGULAR     | 99933   |
            | REGULAR     | 99937   |
            | REGULAR     | 99938   |
            | REGULAR     | 99939   |
            | REGULAR     | 99940   |
            | REGULAR     | 99941   |
            | REGULAR     | 99942   |
            | REGULAR     | 99944   |
            | REGULAR     | 99944   |
            | REGULAR     | 99945   |
            | REGULAR     | 99948   |
            | REGULAR     | 99949   |

    @CHK-9163 @ZipCodeFix @CBUS @CB2US @APOZipCodes
    Scenario Outline: Verify the new zipcodes are accepted in Cart
        Given the customer is on the home page
        When customer adds "SKU_PARCEL" to cart as "Ship"
        Then cart page should be displayed with added item details
        And cart should accept all customer zipcodes from below list
            | description | zipCode |
            | APO         | 09016   |
            | APO         | 09018   |
            | APO         | 09101   |
            | APO         | 09348   |
            | APO         | 09600   |
            | APO         | 09800   |
            | APO         | 09901   |
            | APO         | 09903   |
            | APO         | 09904   |
            | APO         | 09908   |
            | APO         | 09909   |
            | APO         | 09910   |
            | APO         | 34044   |
            | APO         | 96273   |
            | APO         | 96502   |
            | APO         | 96577   |
            | APO         | 96645   |
            | APO         | 09016   |
            | APO         | 09017   |
            | APO         | 09018   |
            | APO         | 09044   |
            | APO         | 09101   |
            | APO         | 09116   |
            | APO         | 09118   |
            | APO         | 09135   |
            | APO         | 09160   |
            | APO         | 09170   |
            | APO         | 09171   |
            | APO         | 09174   |
            | APO         | 09176   |
            | APO         | 09179   |
            | APO         | 09203   |
            | APO         | 09204   |
            | APO         | 09205   |
            | APO         | 09216   |
            | APO         | 09240   |
            | APO         | 09241   |
            | APO         | 09242   |
            | APO         | 09276   |
            | APO         | 09277   |
            | APO         | 09278   |
            | APO         | 09279   |
            | APO         | 09280   |
            | APO         | 09281   |
            | APO         | 09282   |
            | APO         | 09283   |
            | APO         | 09284   |
            | APO         | 09285   |
            | APO         | 09287   |
            | APO         | 09288   |
            | APO         | 09289   |
            | APO         | 09290   |
            | APO         | 09291   |
            | APO         | 09292   |
            | APO         | 09293   |
            | APO         | 09294   |
            | APO         | 09295   |
            | APO         | 09401   |
            | APO         | 09410   |
            | APO         | 09424   |
            | APO         | 09467   |
            | APO         | 09487   |
            | APO         | 09488   |
            | APO         | 09489   |
            | APO         | 09490   |
            | APO         | 09491   |
            | APO         | 09497   |
            | APO         | 09512   |
            | APO         | 09514   |
            | APO         | 09516   |
            | APO         | 09523   |
            | APO         | 09533   |
            | APO         | 09541   |
            | APO         | 09583   |
            | APO         | 09592   |
            | APO         | 09600   |
            | APO         | 09614   |
            | APO         | 09634   |
            | APO         | 09712   |
            | APO         | 09760   |
            | APO         | 09761   |
            | APO         | 09800   |
            | APO         | 09847   |
            | APO         | 09851   |
            | APO         | 09857   |
            | APO         | 09860   |
            | APO         | 09861   |
            | APO         | 09863   |
            | APO         | 09864   |
            | APO         | 09877   |
            | APO         | 09895   |
            | APO         | 09901   |
            | APO         | 09902   |
            | APO         | 09903   |
            | APO         | 09904   |
            | APO         | 09908   |
            | APO         | 09909   |
            | APO         | 09910   |
            | APO         | 09974   |
            | APO         | 09975   |
            | APO         | 09976   |
            | APO         | 09977   |
            | APO         | 09978   |
            | APO         | 09980   |
            | APO         | 09981   |
            | APO         | 09982   |
            | APO         | 09983   |
            | APO         | 09984   |