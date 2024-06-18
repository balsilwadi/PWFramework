# THIS FEATURE IS TIMING OUT WITH CURRENT SETTINGS - TOO MUCH DATA
# NEED TO INVESTIGATE

# Feature: Categories API Action

#     As an affiliate,
#     I want to execute the categories action

# @Api @ApiBrowsePath @ApiCategories
# Scenario Outline: As an affiliate I want to execute the categories action
#     Given Affiliate executes the categories action with simple "<simple>"
#     Then Categories with simple "<simple>" should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | simple |
#     | 0      |
#     | 1      |
