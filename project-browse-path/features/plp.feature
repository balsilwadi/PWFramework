Feature: PLP Page Validation
  As a customer,
  I want to launch homepage and verify the page
  I want to navigate to plp via browse and verify Ready To Ship and Ships within 6 weeks availability filters on browse plp page
  I want to navigate to plp via browse and verify Pickup availability filters on browse plp page
  I want to navigate to spcategory via browse and verify

  @PLP @ShipsWithinSixWeeks @ReadyToShip @Smoke @Regression @plpAvailabilityFilter @BrowsePath
  Scenario Outline: As a customer I want to verify Ready To Ship and Ships within 6 weeks  availability filters on browse plp page
    Given the customer is on the home page
    When customer clicks on "<superCategoryItem>" SuperCategory and navigates to "<categoryItem>" Category
    Then customer should be landed on PLP page with url "<url>" and headerTitle "<headerTitle>"
    # When customer click on "<plpAvailabilityFilter>" button
    # Then customer should see the default store
    # When customer should be able to set the store for "<zipCode>"
    # Then customer should be land on PLP page with Zip "<zipCode>"
    # When customer clicks any item on PLP
    # Then customer should land in PDP page with ShipIt as "<zipCode>"

    Examples: 
      | superCategoryItem  | categoryItem  |
      | HWS_SUPERCATEGORY1 | HWS_CATEGORY1 |
      | HWS_SUPERCATEGORY2 | HWS_CATEGORY2 |
      # @CrateUS
      # Examples:
      #   | testSite | superCategoryItem | subCategoryItem | categoryItem | url                         | headerTitle | plpAvailabilityFilter | zipCode |
      #   | crate_us | Bedding & Bath    | Bath            | Bath Towels  | /bed-and-bath/bath-towels/1 | Bath Towels | Ships Within 6 Weeks  | 23456   |
      # # | crate_us   | Tabletop & Bar    | Table Linens    | Napkins      | /dining-and-entertaining/napkin/1 | Napkins     | Ready to Ship         | 60504   |
      # @CB2US
      # Examples:
      #   | testSite | superCategoryItem | subCategoryItem       | categoryItem | url                | headerTitle | plpAvailabilityFilter | zipCode |
      #   | cb2_us   | Kitchen & Dining  | Dinnerware & Flatware | Flatware     | /dining/flatware/1 | Flatware    | Ships Within 6 Weeks  | 23456   |
      # | cb2_us   | Bedding & Bath    | Bath   | Bath Linens      | /bed-and-bath/bath-linens/1 | Bath Linens      | Ready to Ship         | 60504   |
      # @CrateCA
      # Examples:
      #   | testSite     | superCategoryItem | subCategoryItem | categoryItem | url                         | headerTitle | plpAvailabilityFilter | zipCode |
      #   | crate_canada | Bedding & Bath    | Bath            | Bath Towels  | /bed-and-bath/bath-towels/1 | Bath Towels | Ships Within 6 Weeks  | A1A 1A1 |
      #  | crate_canada | Tabletop & Bar    | Table Linens    | Napkins      | /dining-and-entertaining/napkin/1 | Napkins     | Ready to Ship         | B1B 1B1   |
      # @CB2CA
      # Examples:
      #   | testSite   | superCategoryItem | subCategoryItem       | categoryItem | url                | headerTitle | plpAvailabilityFilter | zipCode |
      #   | cb2_canada | Kitchen & Dining  | Dinnerware & Flatware | Flatware     | /dining/flatware/1 | Flatware    | Ships Within 6 Weeks  | A1A 1A1 |
      # | cb2_canada | Bedding & Bath    | Bath                     | Bath Linens  | /bed-and-bath/bath-linens/1   | Bath Linens  | Ready to Ship         | B1B 1B1 |

  @PLP @Pickup @Smoke @Regression @plpAvailabilityFilter @BrowsePath
  Scenario Outline: As a customer I want to verify Pickup availability filters on browse plp page
    Given the customer is on the home page
    When customer clicks on "<superCategoryItem>" SuperCategory and navigates to "<categoryItem>" Category
    Then customer should be landed on PLP page with url "<url>" and headerTitle "<headerTitle>"
    When customer click on "<plpAvailabilityFilter>" button
    Then customer should able to set the store for "<zipCode>" for Pickup
    Then customer should be land on PICKUP PLP page with FREE CURBSIDE PICKUP AT STORE as "<storeName>"
    When customer clicks any item on PLP
    Then customer should land in PDP page with FREE CURBSIDE PICKUP AT STORE as "<storeName>"

    @CrateUS
    Examples:
      | superCategoryItem | subCategoryItem | categoryItem | url                              | headerTitle                     | plpAvailabilityFilter | zipCode | storeName       |
      | Kitchen           | Cutlery         | Steak Knives | /kitchen-and-food/steak-knives/1 | Steak Knives & Steak Knife Sets | Pickup                | 60523   | Oakbrook Center |

    @CB2US
    Examples:
      | superCategoryItem | subCategoryItem  | categoryItem  | url                                              | headerTitle   | plpAvailabilityFilter | zipCode | storeName          |
      | Decor & Pillows   | Pillows & Throws | Throw Pillows | /decorating-and-accessories/decorative-pillows/1 | Throw Pillows | Pickup                | 60523   | North and Clybourn |

    @CrateCA
    Examples:
      | superCategoryItem | subCategoryItem | categoryItem | url                              | headerTitle                     | plpAvailabilityFilter | zipCode | storeName       |
      | Kitchen           | Cutlery         | Steak Knives | /kitchen-and-food/steak-knives/1 | Steak Knives & Steak Knife Sets | Pickup                | A1A 1A1 | Oakbrook Center |

    @CB2CA
    Examples:
      | superCategoryItem | subCategoryItem  | categoryItem  | url                                              | headerTitle   | plpAvailabilityFilter | zipCode | storeName          |
      | Decor & Pillows   | Pillows & Throws | Throw Pillows | /decorating-and-accessories/decorative-pillows/1 | Throw Pillows | Pickup                | B1B 1B1 | North and Clybourn |

  @SPCategory @Smoke @Regression @BrowsePath @PLP
  Scenario Outline: As a customer I want to verify SPCategory page
    Given the customer is on the home page
    When customer clicks on <superCategoryItem> SuperCategory and navigates to <spCategoryItem> SPCategory
    Then customer should be landed on SPCategory page with url <spCategoryURL> and headerTitle <spCategoryHeaderTitle>
    Then customer should able to verify spcategory headerTitle
    And customer should be able to verify subway carousel items on spCategoryItem: <spCategoryItem>
    And customer verifies shopAll products

    @CBUS @CBCA
    Examples:
      | superCategoryItem | spCategoryItem         | spCategoryHeaderTitle  | spCategoryURL                                         |
      | "Decor & Pillows" | "Pillows & Throws"     | "Pillows & Throws"     | "/decorating-and-accessories/pillows-and-throws/"     |
      | "Decor & Pillows" | "Wall Decor & Mirrors" | "Wall Decor & Mirrors" | "/decorating-and-accessories/wall-decor-and-mirrors/" |
      | "Rugs"            | "Rugs by Material"     | "Rugs by Material"     | "/rugs/rugs-by-material/"                             |

    @CB2US @CB2CA
    Examples:
      | superCategoryItem | spCategoryItem          | spCategoryHeaderTitle   | spCategoryURL                  |
      | "Tabletop & Bar"  | "Dinnerware & Flatware" | "Dinnerware & Flatware" | "/dining/dinnerware-flatware/" |
      | "Tabletop & Bar"  | "Drinkware & Bar"       | "Dinnerware & Flatware" | "/dining/drinkware-bar/"       |
      | "Decor & Mirrors" | "Wall Art"              | "Wall Art"              | "/accessories/wall-art/"       |
