# Feature: Family API Action

#     As an affiliate,
#     I want to execute the family action

#  @Api @Smoke @ApiBrowsePath @ApiFamilies
#  Scenario Outline: As an affiliate I want to smoke test the families action
#      Given Affiliate executes the families action with category ID "<cid>" simple "<simple>"
#     Then should be displayed

#     @CrateUS @CrateCA
#     Examples: #22526 - Cocktail & Whiskey Glasses
#     | simple | cid   |
#     | 0      | 22526 |

#     @CB2US @CB2CA
#     Examples: #12111 - Cocktail Glasses
#     | simple | cid   |
#     | 0      | 12111 |

#  @Api @ApiBrowsePath @ApiFamilies
#  Scenario Outline: As an affiliate I want to execute the families action
#      Given Affiliate executes the families action with category ID "<cid>" simple "<simple>"
#      Then Families with category ID "<cid>" simple "<simple>" should be displayed

#      #Needs to be update to include other parameters &cid=1010&firstGroup=1&itemGroup=1&json=1&requestLimit=50&showSkus=1&startAfter=100 and maybe others

#     @CrateUS @CrateCA
#     Examples: #22526 - Cocktail & Whiskey Glasses
#     | simple | cid   |
#     | 0      | 22526 |
#     | 1      | 22526 |

#     @CB2US @CB2CA
#     Examples: #12111 - Cocktail Glasses
#     | simple | cid   |
#     | 0      | 12111 |
#     | 1      | 12111 |

# @Api @ApiBrowsePath @ApiFamilies
# Scenario Outline: As an affiliate I want to execute the families action with show SKUs
#     Given Affiliate executes the families action with category ID "<cid>" simple "<simple>" show SKUs "<showSKUs>" first subgroup "<firstSubGroup>"
#     Then Families with category ID "<cid>" simple "<simple>" show SKUs "<showSKUs>" first subgroup "<firstSubGroup>" should be displayed

#     #Needs to be update to include other parameters &cid=1010&firstGroup=1&itemGroup=1&json=1&requestLimit=50&showSkus=1&startAfter=100 and maybe others

#     @CrateUS @CrateCA
#     Examples: #22526 - Cocktail & Whiskey Glasses
#     | simple | cid   | showSKUs | firstSubGroup |
#     | 0      | 22526 | 1        | 0             |
#     | 1      | 22526 | 1        | 0             |
#     | 0      | 22526 | 1        | 1             |
#     | 1      | 22526 | 1        | 1             |

#     @CB2US @CB2CA
#     Examples: #12111 - Cocktail Glasses
#     | simple | cid   | showSKUs | firstSubGroup |
#     | 0      | 12111 | 1        | 0             |
#     | 1      | 12111 | 1        | 0             |
#     | 0      | 12111 | 1        | 1             |
#     | 1      | 12111 | 1        | 1             |