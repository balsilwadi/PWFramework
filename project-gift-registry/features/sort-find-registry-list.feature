Feature: Sort registries

    As a user,
    I should be able to sort the registries by Registrant name, Co-registrant Name, Event type, Event date, State
    so that I can see registries sorted by the selected sorting option.

    @grss @Regression @SortRegistry
    Scenario: Sort the registry list by registrant name
        Given the customer is on registry search results page with 'sorttestreg' and 'sorttestreg'
        When they sort the registry list by 'Registrant Name'
        Then The registry is sorted by Registrant Name

    @grss @Regression @SortRegistry
    Scenario: Sort the registry list by co registrant name
        Given the customer is on registry search results page with 'sorttestreg' and 'sorttestreg'
        When they sort the registry list by 'Co Registrant Name'
        Then The registry is sorted by Co Registrant Name

    @grss @Regression @SortRegistry
    Scenario: Sort the registry list by event type
        Given the customer is on registry search results page with 'sorttestreg' and 'sorttestreg'
        When they sort the registry list by 'Event Type'
        Then The registry is sorted by Event Type

    @grss @Regression @SortRegistry
    Scenario: Sort the registry list by state
        Given the customer is on registry search results page with 'sorttestreg' and 'sorttestreg'
        When they sort the registry list by 'State'
        Then The registry is sorted by State

    @grss @Regression @SortRegistry
    Scenario: Sort the registry list by event date
        Given the customer is on registry search results page with 'sorttestreg' and 'sorttestreg'
        When they sort the registry list by 'Event Date'
        Then The registry is sorted by Event Date
