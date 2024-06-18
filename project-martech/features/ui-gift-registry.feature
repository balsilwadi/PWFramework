Feature: DigitalData Validation for Gift Registry Page
    I want to use this feature file to validate DigitalData

    @gr @ExistingRegistry @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Daily @Cypress
    Scenario: Validating digital data on registrant page when existing user logs in
        Given the customer is on the home page
        When they login to the application
        And lands on the home page
        And navigate to the registrant list page
        Then validate digitalData events on "REGISTRANT-LIST-PAGE"
        When they add an item to registry
        And navigate to registrant list page
        Then validate digitalData events on "REGISTRANT-LIST-PAGE"

    @gr @NewRegistry @Regression @Smoke @CBUS @CB2US @CBCA @CB2CA @Martech @Daily @Cypress
    Scenario: Validating digital data on GR flow when new user create gift registry
        Given the customer is on the home page
        When they click on Create My Registry button in Wedding Registry
        And they register with a new email
        Then validate digitalData events on "GR-INITIAL-FORM-PAGE"
        And validate "Registry Started" event on "GR-INITIAL-FORM-PAGE"
        When they create account by creating a password and continue
        Then validate digitalData events on "GR-CONTACT-INFORMATION-PAGE"
        When they fill out the Contact Information form and navigate to Location Preferences page
        Then validate "Page Viewed" event on "GR-LOCATION-PREFERENCES-PAGE"
        And validate "Form Step Completed" event on "GR-LOCATION-PREFERENCES-PAGE"
        When they navigate to Registry Preferences page
        Then validate "Page Viewed" event on "GR-REGISTRY-PREFERENCES-PAGE"
        And validate "Form Step Completed" event on "GR-REGISTRY-PREFERENCES-PAGE"
        When they try to abandon the registry creation flow
        Then validate "Form Abandon" event on "GR-REGISTRY-PREFERENCES-PAGE"
        When they close popup and create new register
        Then validate digitalData events on "GR-REGISTRANT-LIST-PAGE"