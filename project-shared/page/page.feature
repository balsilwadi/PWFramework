Feature: Shared - Page

@Shared @SharedPage @CrateUS @CrateCA @CB2US @CB2CA
Scenario Outline: Verify shared page
Given the customer is on the home page
When They navigate to shared page for URL: "<url>"
Then They see shared page for URL: "<url>"

    @CrateUS @CrateCA @CB2US @Cb2Can
    Examples:
    | url                |
    | /customer-service/ |