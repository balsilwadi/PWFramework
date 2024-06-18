Feature: Gift Registry Completion

  @CBUS @CBCA @CB2US @CB2CA
  Scenario Outline: Create a GRC using Create GRC API
    Given The user creates a GRC for registry
    And Registry is eligible
    Then The GRC should be created successfully for registry
