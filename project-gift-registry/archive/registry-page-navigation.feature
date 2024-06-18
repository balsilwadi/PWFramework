# Feature: As a Customer I want to Navigates to  Gift Registry Page from Home page
#     As a Customer
#     I want to test
#     Navigates to  Gift Registry Page

#     @regression @smoke @giftregistry  @UI @giftregistrypagenavigation
#     Scenario: Gift Registry page Navigation


#         Given The customer is on "<testSite>" Home page
#         When Customer navigates to the wedding Registry link from "header"
#         Then Customer verifies the Wedding Registry Page
#         Given The customer is on "<testSite>" Home page
#         And Customer clicks the "Create a Registry" link from profile section
#         Given The customer is on "<testSite>" Home page
#         When Customer navigates to sign in page
#         Then Login page displayed with sign in form
#         And Signin form displayed with create account option
#         When Customer sign in with valid '<Email ID>' and 'Crate@321'
#         Then Account page should display with Hi message
#         And Customer clicks the "My Registries" link from profile section

#         @CrateUS
#         Examples:
#             | testSite | Email ID         |
#             | crate_us  | GRAutomation001@crate.com |
#         @Cb2US
#         Examples:
#             | testSite | Email ID            |
#             | cb2_us   | GRAutomation001@cb2.com |