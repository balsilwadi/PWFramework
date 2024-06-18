Feature: DigitalData Validation for Account Page
    I want to use this feature file to validate DigitalData

    @account @AccountSignIn @Regression @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Account Page for existing account
        Given the customer is on the home page
        When Customer clicks on sign in from header
        And Customer login with an existing account
        Then validate digitalData events on "ACCOUNT-PAGE"

    @account @AccountCreate @Regression @CBUS @CB2US @CBCA @CB2CA @Martech @Cypress
    Scenario: Validating digital data on Account Page for new account
        Given the customer is on the home page
        When Customer clicks on sign in from header
        And Customer clicks on Create Account button
        And Customer fills the Create New account form and click on Create Account button
        Then validate digitalData events on "CREATE-ACCOUNT-PAGE"