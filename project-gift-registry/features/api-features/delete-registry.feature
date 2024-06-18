Feature: Deleting a registry using api

    @api @CBUS, @CB2US, @CBCA, @CB2CA
    Scenario: Delete a registry using Delete API
        Given The user deletes the registry using registryid
        Then The registry should be deleted successfully
