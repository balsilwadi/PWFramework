Feature: As a Customer I want to verify the interrutper main and subcopy text different scenarios
    As a Customer
    I want to verify the interrutper main and subcopy text different scenarios


    Background: Launch the Home page
        Given the interrupter should show
        When Launch the Home Page

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @CB2US @CB2CA @INT_019 @INT_035
    Scenario Outline: Verify the Main and Sub copy when the email address and phone number is already opted in
        When Customer enters Email and Phone number "EmailYesPhoneYes"
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @CB2US @CB2CA @INT_020 @INT_036
    Scenario Outline: Verify the Main and Sub copy when only the email address is already opted in
        When Customer enters Email and Phone number "EmailYesPhoneNo"
        And uncheck the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CB2US @INT_021 @INT_037 @INT_029
    Scenario Outline: Verify the Main and Sub copy when customer is already opted in for sms only
        When Customer enters Email and Phone number "EmailNoPhoneYes"
        And uncheck the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text
        When Customer navigates to sign in page
        And Customer sign in with "optedInSMSOnly" login credentials
        And Clicks on Preferences link
        When Customer expands Email Drawer
        Then Customer should unsubscribe all from email

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @CB2US @CB2CA @INT_022 @INT_038
    Scenario Outline: Verify the Main and Sub copy when not already opted in for email and phone
        When Customer enters Email and Phone number "EmailNoPhoneNo"
        And uncheck the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @INT_023
    Scenario Outline: Verify the Main and Sub copy when already opted in for email and phone in Crate, Kids not for additional brands CB2, HG
        When Customer enters Email and Phone number "EmailYesPhoneYesCB2No"
        And check the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_024
    Scenario Outline: Verify the Main and Sub copy when already opted in for email only in Crate, Kids not for additional brands CB2, HG
        When Customer enters Email and Phone number "EmailYesPhoneNoCB2No"
        And check the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_026
    Scenario Outline: Verify the Main and Sub copy when already opted in for email only in Crate, not Kids, sms
        When Customer enters Email and Phone number "EmailYesPhoneNoKidsNo"
        And check the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text
        When Customer navigates to sign in page
        And Customer sign in with "optedInEmailCrateOnly" login credentials
        And Clicks on Preferences link
        When Customer expands Email Drawer
        Then Customer uncheck the Kids checkbox
        And Clicks on Apply Changes

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_028
    Scenario Outline: Verify the Main and Sub copy when already opted in for email only in Crate, not Kids, sms
        When Customer enters Email and Phone number "EmailNoPhoneNoKidsYes"
        And check the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text
        When Customer navigates to sign in page
        And Customer sign in with "optedInEmailKidsOnly" login credentials
        And Clicks on Preferences link
        When Customer expands Email Drawer
        Then Customer uncheck the Crate checkbox
        And Clicks on Apply Changes

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_030
    Scenario Outline: Verify the Main and Sub copy when the customer is not already opted in for Email and SMS. Kids checkbox is checked
        When Customer enters Email and Phone number "EmailNoPhoneNoKidsNo"
        And check the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_031
    Scenario Outline: Verify the Main and Sub copy when the customer is already opted in for Kids Email and SMS
        When Customer navigates to Kids page
        And Customer enters Email and Phone number "EmailYesPhoneYesKidsYes"
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_032
    Scenario Outline: Verify the Main and Sub copy when the customer is already opted in for Kids Email but not SMS
        When Customer navigates to Kids page
        And Customer enters Email and Phone number "EmailYesPhoneNoKidsYes"
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_034
    Scenario Outline: Verify the Main and Sub copy when not already opted in for kids email and phone
        When Customer navigates to Kids page
        And Customer enters Email and Phone number "EmailNoPhoneNoKidsNo"
        And check the kids checkbox
        And clicks on Submit button
        Then verifies the main and sub copy text

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @CB2US @CB2CA @INT_039
    Scenario Outline: Verify the Main and Sub copy in the final page of the interrupter when not opted in for additional brands
        And Customer enters Email and Phone number "EmailNoPhoneNoKidsNo"
        And clicks on Submit button
        And clicks on submit button in the second screen with additional brands "No" checked
        Then verifies the main and sub copy text in the final screen

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_039
    Scenario Outline: Verify the Main and Sub copy in the final page of the interrupter in kids page when not opted in for additional brands
        When Customer navigates to Kids page
        And Customer enters Email and Phone number "EmailNoPhoneNoKidsNo"
        And clicks on Submit button
        And clicks on submit button in the second screen with additional brands "No" checked
        Then verifies the main and sub copy text in the final screen

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @CB2US @CB2CA @INT_040 @INT_041
    Scenario Outline: Verify the Main and Sub copy in the final page of the interrupter when not opted in for additional brands
        And Customer enters Email and Phone number "EmailNoPhoneNoKidsNo"
        And clicks on Submit button
        And clicks on submit button in the second screen with additional brands "Yes" checked
        Then verifies the main and sub copy text in the final screen

    @Account @Interrupter @Interrupter_Text @ACNT_086 @CBUS @CBCA @INT_040 @INT_041
    Scenario Outline: Verify the Main and Sub copy in the final page of the interrupter in kids page when not opted in for additional brands
        When Customer navigates to Kids page
        And Customer enters Email and Phone number "EmailNoPhoneNoKidsNo"
        And clicks on Submit button
        And clicks on submit button in the second screen with additional brands "Yes" checked
        Then verifies the main and sub copy text in the final screen