Feature: Edit registry
    # Scenario: Edit type of registry
    Scenario: Edit guest count
    Scenario: Edit event dates

    @grss @api
    Scenario Outline: Edit the event date of a registry using update API
        Given The user changes the event date to <number-of-days> days "<direction>" todays date for the registry <registry-id>
        Then The event date of <registry-id> is <number-of-days> days "<direction>" todays date

        @CBUS @CB2US
        Examples:
            | number-of-days | direction | registry-id |
            | 3              | Before    | 7027958     |
            | 4              | After     | 7027959     |

        @CBCA @CB2CA
        Examples:
            | number-of-days | direction | registry-id |
            | 35             | Before    | 7027960     |
            | 90             | After     | 7027961     |

    Scenario: Edit registrant address
    Scenario: Edit co-registrant details
    Scenario: Edit display preference
    # Scenario: Edit gift card preference
    Scenario: Shipping preference address
    Scenario: Remove co-registrant
    Scenario: Add co-registrant
    Scenario: delete Registry
    Scenario: edit Baby due date, gender
