Feature: Deleting a registry

    @deleteregistry
    Scenario: Archiving a registry
        Given a registry
        When a registry is deleted
        Then registry should be deleted

