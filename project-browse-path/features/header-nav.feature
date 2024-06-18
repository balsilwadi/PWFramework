@HWS @BrowsePath @Homepage @Smoke @Regression
Feature: Header Nav Validation
  As a customer,
  I want to verify the Header Core
  I want to verify the Header banner
  I want to verify the Primary Navigation
  I want to verify the Secondary Navigation

  # Desktop only TODO: Applicable only for desktop sites, tbd with team on how to approach
  @Header @HeaderBanner
  Scenario Outline: As a customer I want to verify the Header Banner
    Given the customer is on the home page
    Then "<banner item>" should be present in header banner
    When Customer clicks on "<banner item>" in header banner to land in "<tab>" tab
    Then Customer should land on "<url>"

    @CBUS
    Examples:
      | banner item      | url                        | tab  |
      | Crate and Kids   | /kids/                     | same |
      | Crate and Barrel |                            | same |
      | CB2              | https://www.cb2.com/       | new  |
      | Hudson Grace     | https://hudsongracesf.com/ | new  |

    @CBCA
    Examples:
      | banner item      | url                 | tab  |
      | Crate and Kids   | /kids/              | same |
      | Crate and Barrel |                     | same |
      | CB2              | https://www.cb2.ca/ | new  |

    @CB2CA
    Examples:
      | banner item      | url                                 | tab  |
      | Crate and Kids   | https://www.crateandbarrel.ca/kids/ | new  |
      | Crate and Barrel | https://www.crateandbarrel.ca/      | new  |
      | CB2              |                                     | same |

    @CB2US
    Examples:
      | banner item      | url                                  | tab  |
      | Crate and Kids   | https://www.crateandbarrel.com/kids/ | new  |
      | Crate and Barrel | https://www.crateandbarrel.com/      | new  |
      | CB2              |                                      | same |
      | Hudson Grace     | https://hudsongracesf.com/           | new  |

  @Header @HeaderBanner @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: As a customer I want to verify the country selector
    Given the customer is on the home page
    Then Country button should be present
    When Customer clicks on country icon
    Then Country popup should open
    And Customer verifies default options for country selector
    When Customer picks the other option on country selector
    Then Customer lands on same brand with different country

  @Header @HeaderBanner @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline:: As a user, I want to launch homepage and verify the HeaderCore
    Given the customer is on the home page
    Then Customer should land on "/"
    And Customer verifies header core options
    When Customer clicks on Header logo
    Then Customer should land on "/"
    When Customer search for SKU "pillow"
    Then Customer should land on "/search\?query=pillow"

  @Header @PrimaryNavigation
  Scenario Outline:: As a user, I want to launch homepage and verify the Primary Navigation
    Given the customer is on the home page
    When Customer clicks on "<header item>" in the primary navigation header
    Then Customer should land on "<url>"
    And Customer should see "<h1>" tag on primary navigation landing page
    @CBUS
    Examples:
      | header item     | url                          | h1                |
      | Furniture       | /furniture/                  | Furniture         |
      | Outdoor         | /outdoor-furniture/          | Outdoor Furniture |
      | Tabletop & Bar  | /dining-and-entertaining/    | Tabletop & Bar    |
      | Kitchen         | /kitchen-and-food/           | Kitchen           |
      | Decor & Pillows | /decorating-and-accessories/ | Decor & Pillows   |
      | Rugs            | /rugs/                       | Rugs              |
      | Lighting        | /lighting/                   | Lighting          |
      | Window          | /window-treatments/          | Window Treatments |
      | Bedding         | /bed-and-bath/               | Bedding           |
      | Bath            | /bath/                       | Bath              |
      | Gifts           | /gift-ideas/                 | Gift Ideas        |
      | Christmas       | /christmas/                  | Christmas         |
      | Sale            | /sale/                       | Sale              |
    @CBCA
    Examples:
      | header item     | url                          | h1                |
      | Furniture       | /furniture/                  | Furniture         |
      | Outdoor         | /outdoor-furniture/          | Outdoor Furniture |
      | Tabletop & Bar  | /dining-and-entertaining/    | Tabletop & Bar    |
      | Kitchen         | /kitchen-and-food/           | Kitchen           |
      | Decor & Pillows | /decorating-and-accessories/ | Decor & Pillows   |
      | Rugs            | /rugs/                       | Rugs              |
      | Lighting        | /lighting/                   | Lighting          |
      | Window          | /window-treatments/          | Window Treatments |
      | Bedding         | /bed-and-bath/               | Bedding           |
      | Bath            | /bath/                       | Bath              |
      | Gifts           | /gift-ideas/                 | Gift Ideas        |
      | Christmas       | /christmas/                  | Christmas         |
      | Sale            | /sale/                       | Sale              |
    @CB2US
    Examples:
      | header item      | url              | h1                                    |
      | New              | /new/            | New                                   |
      | Furniture        | /furniture/      | Furniture                             |
      | Outdoor          | /outdoor/        | Outdoor                               |
      | Kitchen & Dining | /dining/         | Kitchen & Dining                      |
      | Decor & Mirrors  | /accessories/    | Decor & Mirrors                       |
      | Rugs             | /rugs/           | Rugs                                  |
      | Lighting         | /lighting/       | Lighting                              |
      | Pillows & Throws | /pillows-throws/ | Throw Pillows, Poufs & Throw Blankets |
      | Bedding & Bath   | /bed-and-bath/   | Bedding & Bath                        |
      | Gifts            | /gifts/          | Gifts                                 |
      | Sale             | /sale/           | CB2 Sales & Offers                    |
      | Christmas        | /christmas/      | Christmas                             |

    @CB2CA
    Examples:
      | header item      | url              | h1                                    |
      | New              | /new/            | New                                   |
      | Furniture        | /furniture/      | Furniture                             |
      | Outdoor          | /outdoor/        | Outdoor                               |
      | Tabletop & Bar   | /dining/         | Tabletop & Bar                        |
      | Decor & Mirrors  | /accessories/    | Decor & Mirrors                       |
      | Rugs             | /rugs/           | Rugs                                  |
      | Lighting         | /lighting/       | Lighting                              |
      | Pillows & Throws | /pillows-throws/ | Throw Pillows, Poufs & Throw Blankets |
      | Bedding & Bath   | /bed-and-bath/   | Bedding & Bath                        |
      | Gifts            | /gifts/          | Gifts                                 |
      | Sale             | /sale/           | CB2 Sales & Offers                    |
      | Holidays         | /holiday/        | Holidays                              |

  @Header @AccountIcon @CBCA @CB2CA @CBUS @CB2US @HeaderBannerAccount
  Scenario Outline: As a customer I want to verify AccountIcon funcationality on homepage for guest mode
    Given the customer is on the home page
    When customer hover account icon
    Then account menu should be present in guest mode
    And customer should verify guest view of Registry CBCC and DesignPackages

  @Header @HeaderBannerAccount @AccountIcon
  Scenario Outline: As a customer I want to verify AccountIcon funcationality on homepage for signed in US sites
    Given the customer is on the home page
    When Customer clicks on sign in from header
    When Customer sign in with valid "<username>" and "<password>"
    And customer hover account icon
    Then customer should see "false" CBCC and "<rewardsEnabled>" rewards and DesignPackages

    @CBUS
    Examples:
      | username                  | password  | rewardsEnabled |
      | cbus1@crate.com           | Crate@123 | false          |
      | cbusZeroRewards@crate.com | Crate@123 | true           |
      | cbusRewards@crate.com     | Crate@123 | true           |

    @CB2US
    Examples:
      | username                   | password  | rewardsEnabled |
      | cb2us@crate.com            | Crate@123 | false          |
      | cb2usZeroRewards@crate.com | Crate@123 | true           |
      | cb2usRewards@crate.com     | Crate@123 | true           |

  @Header @HeaderBannerAccount @AccountIcon @CB2CA @CBCA
  Scenario Outline: As a customer I want to verify AccountIcon funcationality on homepage for signed in CA sites
    Given the customer is on the home page
    When Customer clicks on sign in from header
    When Customer sign in with valid "<username>" and "<password>"
    And customer hover account icon
    Then customer should see "true" CBCC and "false" rewards and DesignPackages

    Examples:
      | username           | password  |
      | october4@crate.com | Select@01 |


  @Header @SecondaryNavigation
  Scenario Outline: As a user, I want to launch homepage and verify the Secondary Navigation
    Given the customer is on the home page
    When Customer clicks on "<header item>" in the secondary navigation header with a flyout "<flyout>"
    Then Customer should land on "<url>"
    @CBUS
    Examples:
      | header item              | url                                   | flyout |
      | NEW!                     | /whats-new/new-arrivals-by-category/1 | true   |
      | Wedding Registry         | /wedding-gift-registry/               | true   |
      | Free Design Services     | /interior-design                      | false  |
      | Trade Program            | /trade-program/                       | false  |
      | The Personalization Shop | /gift-ideas/personalized-gifts/1      | false  |
      | Christmas                | /christmas/                           | false  |
      | Hanukkah                 | /holiday/hanukkah/1                   | false  |
    @CBCA
    Examples:
      | header item              | url                                   | flyout |
      | NEW!                     | /whats-new/new-arrivals-by-category/1 | true   |
      | Wedding Registry         | /wedding-gift-registry/               | true   |
      | Free Design Services     | /interior-design                      | false  |
      | Trade Program            | /trade-program/                       | false  |
      | The Personalization Shop | /gift-ideas/personalized-gifts/1      | false  |
      | Christmas                | /christmas/                           | false  |
    @CB2US
    Examples:
      | header item          | url                          | flyout |
      | Free Design Services | /cb2interiors                | false  |
      | Responsible Design   | /responsible-design/         | false  |
      | Gift Registry        | /gift-registry/              | false  |
      | Inspiration          | /modern-home-ideas/1         | true   |
      | Collections          | /collections/design-legends/ | true   |
      | Trade Program        | /trade-program/              | true   |
    @CB2CA
    Examples:
      | header item          | url                          | flyout |
      | Free Design Services | /cb2interiors                | false  |
      | Responsible Design   | /responsible-design/         | false  |
      | Inspiration          | /modern-home-ideas/1         | true   |
      | Collections          | /collections/design-legends/ | true   |
      | Trade Program        | /trade-program/              | true   |