# Feature: Family API Action

#     As an affiliate,
#     I want to execute the family action

# @Api @Smoke @ApiBrowseProduct @ApiFamily
# Scenario Outline: As an affiliate I want to smoke test the family action
#     Given Affiliate executes the family action with family ID "<fid>" simple "<simple>"
#     Then Family with family ID "<fid>" simple "<simple>" should be displayed

#     @CrateUS @CrateCA
#     Examples: #1693 - Small Working Glass 14 oz.
#     | simple | fid  |
#     | 0      | 1693 |

#     @CB2US @CB2CA
#     Examples: #20521 - NEAT DRINKWARE
#     | simple | fid   |
#     | 0      | 20521 |

# @Api @ApiBrowseProduct @ApiFamily
# Scenario Outline: As an affiliate I want to execute the family action
#     Given Affiliate executes the family action with family ID "<fid>" simple "<simple>"
#     Then Family with family ID "<fid>" simple "<simple>" should be displayed

#     #Needs to be update to include other parameters &fid=1010&firstGroup=1&itemGroup=1&json=1&requestLimit=50&showSkus=1&startAfter=100 and maybe others

#     @CrateUS @CrateCA
#     Examples: #1693 - Small Working Glass 14 oz.
#     | simple | fid  |
#     | 0      | 1693 |
#     | 1      | 1693 |

#     @CB2US @CB2CA
#     Examples: #20521 - NEAT DRINKWARE
#     | simple | fid   |
#     | 0      | 20521 |
#     | 1      | 20521 |