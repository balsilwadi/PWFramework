# Feature: Category API Action

#     As an affiliate,
#     I want to execute the category action

# @Api @Smoke @ApiBrowsePath @ApiCategory
# Scenario Outline: As an affiliate I want to smoke test the category action
#     Given Affiliate executes the category action with category ID "<cid>" simple "<simple>"
#     Then Category with category ID "<cid>" simple "<simple>" should be displayed

#     @CrateUS @CrateCA
#     Examples: #22526 - Cocktail & Whiskey Glasses
#     | simple | cid   |
#     | 0      | 22526 |

#     @CB2US @CB2CA
#     Examples: #12111 - Cocktail Glasses
#     | simple | cid   |
#     | 0      | 12111 |

# @Api @ApiBrowsePath @ApiCategory
# Scenario Outline: As an affiliate I want to execute the category action
#     Given Affiliate executes the category action with category ID "<cid>" simple "<simple>"
#     Then Category with category ID "<cid>" simple "<simple>" should be displayed

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

# @Api @ApiBrowsePath @ApiCategory
# Scenario Outline: As an affiliate I want to execute the category action with no category ID
#     Given Affiliate executes the category action with category ID "<cid>" simple "<simple>"
#     Then Category with category ID "<cid>" simple "<simple>" No Category Id given error should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | simple | cid |
#     | 0      | 0   |

# @Api @ApiBrowsePath @ApiCategory
# Scenario Outline: As an affiliate I want to execute the category action with an invlid category ID
#     Given Affiliate executes the category action with category ID "<cid>" simple "<simple>"
#     Then Category with category ID "<cid>" simple "<simple>" Category Not Found error should be displayed

#     @CrateUS @CrateCA @CB2US @CB2CA
#     Examples:
#     | simple | cid     |
#     | 0      | 9999999 |
