Feature: Sort registries

    As a user,
    I should be able to sort the registries by Registrant name, Co-registrant Name, Event type, Event date, State
    so that I can see registries sorted by the selected sorting option.

    Background: Launch the Home page
        Given the customer is on the home page

    @RegistrySorting
    Scenario Outline: Sort the registry list by co-registrant name

        Given the customer is on registry search results page with 'test' and 'test'
        And the search results details are visible
        #to use the above step we have set the pageObject for search-results.page.js
        When they sort the registry list by "Co-Registrant name"
        #select the By co-registrant name option from dropdown
        #and store the sorting option in this.date.setvalue(variable name,co-registrant-name)

        Then the registries are sorted by selected option
    #verify the co-registrant names were displayed in alphabetical order
    #verify the registry count matches the total count in the header
    #the sselected option should be retreived from the previous step
    #and handle the validation in switch case, so we can able to add other sorting option validations as well

    Scenario: Sort the registry list by event date

        Given the customer is on registry search results page with 'test' and 'test'
        And the search results details are visible
        #use existing step for all the above

        When they sort the registry list by "Event date"
        #select the By Event date option from dropdown

        Then the registries are sorted by selected option
    #verify the event dates were displayed in ascending order
    #verify the registry count matches the total count in the header



    Scenario: Sort the registry list by registrant name
    Scenario: Sort the registry list by co-registrant name
    Scenario: Sort the registry list by event type
    Scenario: Sort the registry list by event date
    Scenario: Sort the registry list by state

