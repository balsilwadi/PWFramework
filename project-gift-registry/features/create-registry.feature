Feature: Creating a registry

  Scenario: Creating a basic registry as a logged in user

  Scenario: Creating a basic registry as a guest user

  Scenario: Creating a basic registry with shipping preference as other address (Edit the default address)

  # Scenario: Creating a registry with gift cards

  Scenario: Creating a private registry

  Scenario: Create a registry of kind "<registryType>"

  Scenario: Create a registry with a display preference and email communication preference

  Scenario: Create a registry without a display preference and phone communication preference

  Scenario: Create a Registry with co-Registrant as a logged in user
  Scenario: Create a Registry with co-Registrant as a guest  user


  @api
  Scenario: Create registry via api call with no co-registrant
    Given I have created a registry

  @api
  Scenario: Create registry via api call with co-registrant
    Given I have created a registry with a co-registrant

  @api
  Scenario: Create registry with specific registrant
    Given I have created a registry with the following registrant
      | email     | example@crateandbarrel.com           |
      | password  | examplePassword                      |
      | profileId | 3fb9ed22-2311-420c-bb98-49171268b2c7 |
