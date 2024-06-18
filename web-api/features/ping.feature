Feature: Ping API Action

    As an affiliate,
    I want to execute the ping-api-action

@Api @ApiPing @CrateUS @CrateCA @CB2US @CB2CA
Scenario Outline: As an affiliate I want to execute the ping-api-action
    Given Affiliate executes the ping-api-action
    Then The ping-api-action for affiliate has been verified


@Api @ApiPing @CrateUS @CrateCA @CB2US @CB2CA
Scenario Outline: As an affiliate I want to execute the ping-api-page-action
    Given Affiliate executes the ping-api-page-action
    Then The ping-api-page-action for affiliate is displayed 