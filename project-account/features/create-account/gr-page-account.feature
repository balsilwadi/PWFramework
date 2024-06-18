Feature: As a Customer I want to be able to create an account
        As a user
        I want to be able to create account
        and create/sign in with Google ID or Apple ID

        Background: Launch the Home page
                Given the customer is on the home page

        @Regression @Account @CreateAccount @ACNT_050 @CBUS @CBCA @CB2US @CB2CA
        Scenario Outline: Create New Account from GR page
                When Customer clicks on registry link
                And Customer clicks Create my registry
                Then step1 intake form should be loaded
                When Customer fills information and brand new email
                Then step2 intake form should be loaded
                When Customer enters password
                Then step1 GR page should display with Hi message