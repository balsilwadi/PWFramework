@Regression @Smoke @PLPpage @BrowsePath
Feature: Browse Path Test Cases
  As a user
  I want to launch PLP page and verify sorting on Browse PLP

  @Sorting
  Scenario Outline: Customer navigates and verifies sorting in PLP page through Crate MegaMenu
    Given the customer is on the home page
    When the customer clicks on <superCategoryItem> SuperCategory and navigates to <categoryItem> Category
    Then the customer should be landed on <plpType> PLP page with url <url> and headerTitle <headerTitle>
    When the Customer clicks on the <facetOption> facet option
    Then the Page should be sorted based on the selected facet option <facetOption>

    @CBUS
    Examples: 
      | superCategoryItem | categoryItem   | plpType      | url                                | headerTitle                       | facetOption     |
      | "Kitchen"         | "Steak Knives" | "Browse PLP" | "/kitchen-and-food/steak-knives/1" | "Steak Knives & Steak Knife Sets" | "Most Relevant" |

    @CBCA
    Examples: 
      | superCategoryItem | categoryItem   | plpType      | url                                | headerTitle                       | facetOption          |
      | "Kitchen"         | "Steak Knives" | "Browse PLP" | "/kitchen-and-food/steak-knives/1" | "Steak Knives & Steak Knife Sets" | "Price, low to high" |

    @CB2US
    Examples: 
      | superCategoryItem | categoryItem | plpType      | url                    | headerTitle | facetOption          |
      | "Decor & Mirrors" | "Vases"      | "Browse PLP" | "/accessories/vases/1" | "Vases"     | "Price, high to low" |

    @CB2CA
    Examples: 
      | superCategoryItem | categoryItem | plpType      | url                    | headerTitle | facetOption |
      | "Decor & Mirrors" | "Vases"      | "Browse PLP" | "/accessories/vases/1" | "Vases"     | "New"       |

  @Sorting
  Scenario Outline: Customer search term, navigates, and verifies sorting on Search PLP page
    Given the customer is on the home page
    When Customer searches for Keyword <searchTerm>
    And Customer should be navigated to <expectedUrl>
    When the Customer clicks on the <facetOption> facet option
    Then the Page should be sorted based on the selected facet option <facetOption>

    @CBUS
    Examples: 
      | searchTerm | expectedUrl      | facetOption     |
      | "table"    | "/search?query=" | "Most Relevant" |

    @CBCA
    Examples: 
      | searchTerm | expectedUrl      | facetOption          |
      | "chair"    | "/search?query=" | "Price, low to high" |

    @CB2US
    Examples: 
      | searchTerm | expectedUrl | facetOption          |
      | "desk"     | "?st="      | "Price, high to low" |

    @CB2CA
    Examples: 
      | searchTerm | expectedUrl      | facetOption |
      | "desk"     | "/search?query=" | "New"       |
