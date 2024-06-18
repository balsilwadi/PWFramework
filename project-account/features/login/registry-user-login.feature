Feature: As a Customer I want be able to manage my Gift Registry from account
    As a user
    I want to test the
    Login for an account which has gift Registry

    Background: Launch the Home page
        Given the customer is on the home page

    @Regression @Account @CreateAccount @ACNT_051 @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Returning Customer Signing In to Account From Create GR page
        When Customer clicks on registry link
        And Customer clicks Create my registry
        Then step1 intake form should be loaded
        When Customer fills information and existing email
        Then step2 intake form should be loaded for existing Customer
        When Customer enters password
        Then step1 GR page should display with Hi message

    @Regression @Account @CreateAccount @ACNT_052 @Apple @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Returning Customer Signing In to Account From Create GR page with Apple ID
        When Customer clicks on registry link
        And Customer clicks Create my registry
        Then step1 intake form should be loaded
        When Customer fills information and existing email
        And Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Account @CreateAccount @ACNT_052 @Google @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Returning Customer Signing In to Account From Create GR page with Google ID
        When Customer clicks on registry link
        And Customer clicks Create my registry
        Then step1 intake form should be loaded
        When Customer fills information and existing email
        And Customer clicks on Google Signin button
        Then Google signin page should display

    @Regression @Smoke @Account @GiftRegistry @ACNT_053 @CBUS @CBCA @CB2US @CB2CA
    Scenario: Returning Customer Signing In to Account From My Registries Page
        When Customer clicks on registry link
        And Customer clicks manage my registry
        And Signin form displayed with create account option
        When Customer sign in with "Valid" login credentials
        Then the Gift Registry Management page should display with Manage My Registry


    @Regression @Smoke @Account @GiftRegistry @ACNT_054 @Apple @CBUS @CBCA @CB2US @CB2CA
    Scenario: Returning Customer Signing In to Account From My Registries Page with Apple ID
        When Customer clicks on registry link
        And Customer clicks manage my registry
        And Customer clicks on Apple Signin button
        Then Apple signin page should display

    @Regression @Smoke @Account @GiftRegistry @ACNT_054 @Google @CBUS @CBCA @CB2US @CB2CA
    Scenario: Returning Customer Signing In to Account From My Registries Page with Apple ID
        When Customer clicks on registry link
        And Customer clicks manage my registry
        And Customer clicks on Google Signin button
        Then Google signin page should display