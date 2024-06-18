Feature: Browse Product Test Cases
    As a user
    I want to Search for Furniture SuperSOR SKU and do validations

    @PDP @SuperSOR
    Scenario Outline: As a Guest user add Furniture Sku to cart
        Given The customer is on "<testSite>" Home page
        When Customer opens PDP page "<sku>"
        Then Verify the loaded Product page for SKU "<sku>"
        Then Click on Quickship link
        Then Verify Super Sor drawers
        Then Customer Verify Drawers
        Then Verify summary details under Hero Image
        Then Verify Carousels
        When Customer Click On Add to Cart Button

        @CrateUS
        Examples:
            | testSite | sku  |
            | crate_us  | 536904 |

        @CB2US
        Examples:
            | testSite | sku |
            | cb2_us    | DTPCB2US  |

        @CrateCAN
        Examples:
            | testSite | sku   |
            | crate_canada | 536904 |

        @CB2CAN
        Examples:
            | testSite | sku |
            | cb2_canada   | DTPCB2CAN |


