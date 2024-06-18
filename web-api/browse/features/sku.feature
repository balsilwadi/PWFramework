# Feature: SKU API Action

#     As an affiliate,
#     I want to execute the SKU action

#     @Api @ApiBrowseProduct @ApiSku
#     Scenario Outline: As an affiliate I want to execute the ping-api-action
#         Given Affiliate executes the sku-api-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>"
#         Then The sku-api-action for affiliate with SKU "<sku>" simple "<simple>" item group "<itemGroup>" has been verified

#         @CrateUS @CrateCA
#         Examples: #050032 - Small Working Glass 14 oz. / 643574 Small Working Glasses 14-Oz., Set of 12
#             | simple | sku    | itemGroup |
#             | 0      | 643574 | 1         |

#         @CB2US @CB2CA
#         Examples: #347591 -NEAT DOUBLE OLD-FASHIONED GLASS
#             | simple | sku    | itemGroup |
#             | 0      | 347591 | 1         |


# @Api @Smoke @ApiBrowseProduct @ApiSku
# Scenario Outline: As an affiliate I want to smoke test the sku-api-page-action
#     Given Affiliate executes the sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>"
#     Then The sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>" should be displayed

#     @CrateUS @CrateCA
#     Examples: #050032 - Small Working Glass 14 oz. / 643574 Small Working Glasses 14-Oz., Set of 12
#     | simple | sku    | itemGroup |
#     | 0      | 050032 | 0         |
#     | 0      | 643574 | 1         |

#     @CB2US @CB2CA
#     Examples: #347591 -NEAT DOUBLE OLD-FASHIONED GLASS
#     | simple | sku    | itemGroup |
#     | 0      | 347591 | 1         |

# @Api @ApiBrowseProduct @ApiSku
# Scenario Outline: As an affiliate I want to execute the sku-api-page-action
#     Given Affiliate executes the sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>"
#     Then The sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>" should be displayed

#     @CrateUS @CrateCA
#     Examples: #050032 - Small Working Glass 14 oz. / 643574 Small Working Glasses 14-Oz., Set of 12
#     | simple | sku    | itemGroup |
#     | 0      | 050032 | 0         |
#     | 1      | 050032 | 0         |
#     | 0      | 050032 | 1         |
#     | 1      | 050032 | 1         |

#     @CB2US @CB2CA
#     Examples: #347591 -NEAT DOUBLE OLD-FASHIONED GLASS
#     | simple | sku    | itemGroup |
#     | 0      | 347591 | 0         |
#     | 1      | 347591 | 0         |
#     | 0      | 347591 | 1         |
#     | 1      | 347591 | 1         |

# @Api @ApiBrowseProduct @ApiSku
# Scenario Outline: As an affiliate I want to execute the sku-api-page-action with no SKU
#     Given Affiliate executes the sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>"
#     Then The sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>" No valid sku, isbn, or upc given error should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | simple | sku    | itemGroup |
#     | 0      | 0      | 0         |

# @Api @ApiBrowseProduct @ApiSku
# Scenario Outline: As an affiliate I want to execute the sku-api-page-action with an invlid SKU
#     Given Affiliate executes the sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>"
#     Then The sku-api-page-action with SKU "<sku>" simple "<simple>" item group "<itemGroup>" Sku Not Found error should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | simple | sku    | itemGroup |
#     | 0      | 999000 | 0         |