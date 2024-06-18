# Feature: GetCategories API Action

#     As an affiliate,
#     I want to execute the getcategories action

# @Api @ApiBrowsePath @ApiGetCategories
# Scenario Outline: As an affiliate I want to execute the getcategories action
#     Given Affiliate executes the getCategories action with url path "<isurlpath>"
#     Then GetCategories with url path "<isurlpath>" should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | isurlpath |
#     | 0         |
# This option does not apear to be working
#| 1         |
