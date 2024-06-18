# Feature: Supercategories API Action

#     As an affiliate,
#     I want to execute the supercategories action

# @Api @ApiBrowsePath @ApiSuperCategories
# Scenario Outline: As an affiliate I want to execute the supercategories action
#     Given Affiliate executes the supercategories action with simple "<simple>"
#     Then Supercategories with simple "<simple>" should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | simple |
#     | 0      |
#     | 1      |