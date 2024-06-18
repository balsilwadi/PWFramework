@Regression @Smoke @Homepage @BrowsePath @HomeHeader @Favorites
Feature: Browse Path Test Cases
    As a user
    I want to launch Homepage and verify FavoriteIcon on homepage

  Background: 
    Given the customer is on the home page
    And the active registry cookie has been removed from cookies
    When Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    When Customer navigate to favorite page from account left navigation
    Then Favorites page should display without items
    Then Customer logs out from header

  @HeaderFavorites @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: As a customer I want to verify the browse page header favorites while not logged in
    When Customer hover over favorite Icon in header
    Then favorite count in header should be <count>
    And menu should be present in guest mode in the favorite header dropdown
    And the signin button should be present in the favorite header dropdown
    When Customer clicks in sign in button
    Then signin popup should open

    Examples: 
      | count |
      | "0"   |

  @HeaderFavorites
  Scenario Outline: As a customer I want to verify the browse page header favorites with no favorites initially
    When Customer favorites <sku> on browse plp page
    Then Customer should see Skus: <sku> as favorites in browse page header favorites

    @CBUS @CBCA
    Examples: 
      | sku      |
      | "211081" |

    @CB2US @CB2CA
    Examples: 
      | sku      |
      | "449915" |

  @HeaderFavorites
  Scenario Outline: As a customer I want to verify the browse page header favorites with two items favorited initially
    When Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    And Customer has previously favorited Skus: <sku1>, <sku2>
    When Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    When Customer favorites <sku3> on browse plp page
    Then Customer should see Skus: <sku1>, <sku2>, <sku3> as favorites in browse page header favorites

    @CBUS @CBCA
    Examples: 
      | sku1     | sku2     | sku3     |
      | "211081" | "642200" | "172907" |

    @CB2US @CB2CA
    Examples: 
      | sku1     | sku2     | sku3     |
      | "449915" | "309635" | "452413" |

  @HeaderFavorites
  Scenario Outline: As a customer I want to verify unfavoriting an item on the browse page header favorites with two items favorites initially
    When Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    Given Customer has previously favorited Skus: <sku1>, <sku2>
    When Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    When Customer deletes <sku2> from favorites in browse page header favorites
    Then Customer should see Skus: <sku1> as favorites in browse page header favorites

    @CBUS @CBCA
    Examples: 
      | sku1     | sku2     |
      | "211081" | "642200" |

    @CB2US @CB2CA
    Examples: 
      | sku1     | sku2     |
      | "449915" | "309635" |

  @HeaderFavorites
  Scenario Outline: As a customer I should be able to favorite and unfavorite items and should be able to see them after loggin in
    When Customer favorites <sku1> on browse plp page
    When Customer favorites <sku2> on browse plp page
    When Customer deletes <sku2> from favorites in browse page header favorites
    When Customer clicks on sign in from header
    And Customer sign in with "Favorites" login credentials
    Then Customer should see Skus: <sku1> as favorites in browse page header favorites
    Then favorite count in header should be <count_firstTime>
    When Customer favorites <sku2> on browse plp page
    When Customer favorites <sku3> on browse plp page
    Then Customer should see Skus: <sku1>, <sku2>, <sku3> as favorites in browse page header favorites
    Then favorite count in header should be <count_secondTime>

    @CBUS @CBCA
    Examples: 
      | sku1     | sku2     | sku3     | count_firstTime | count_secondTime |
      | "211081" | "642200" | "172907" | "1"             | "3"              |

    @CB2US @CB2CA
    Examples: 
      | sku1     | sku2     | sku3     | count_firstTime | count_secondTime |
      | "449915" | "309635" | "452413" | "1"             | "3"              |
