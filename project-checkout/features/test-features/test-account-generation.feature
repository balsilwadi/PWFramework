Feature: DummyUser Creation. Not part of any tests
    DummyUser Creation
    @DummyCreateAccount @CBUS @CBCA @CB2US @CB2CA
    Scenario: DummyUser Creation
        Given the customer is on the home page
        When DummyUser Creation with "<email>"

        Examples:
            | email                                   |
            | pw-automation.user22@crateandbarrel.com |

    @DummyUpdateAccountOne @CBUS @CBCA @CB2US @CB2CA
    Scenario: DummyUserLogin
        Given the customer is on the home page
        When DummyUser update account for "<email>"

        Examples:
            | email                                   |
            | pw-automation.user22@crateandbarrel.com |

    @DummyUpdateAccountAll @CBUS @CBCA @CB2US @CB2CA
    Scenario: DummyUserLogin
        Given the customer is on the home page
        When DummyUser update account for "<email>"

        Examples:
            | email                                   |
            | automation.user01@email.com             |
            | automation.user02@email.com             |
            | automation.user03@email.com             |
            | automation.user04@email.com             |
            | automation.user05@email.com             |
            | automation.user06@email.com             |
            | automation.user07@email.com             |
            | automation.user08@email.com             |
            | automation.user09@email.com             |
            | automation.user10@email.com             |
            | pw-automation.user11@crateandbarrel.com |
            | pw-automation.user12@crateandbarrel.com |
            | pw-automation.user13@crateandbarrel.com |
            | pw-automation.user14@crateandbarrel.com |
            | pw-automation.user15@crateandbarrel.com |
            | pw-automation.user16@crateandbarrel.com |
            | pw-automation.user17@crateandbarrel.com |
            | pw-automation.user18@crateandbarrel.com |
            | pw-automation.user19@crateandbarrel.com |
            | pw-automation.user20@crateandbarrel.com |
            | pw-automation.user21@crateandbarrel.com |

    @DummyUpdateAccountEmail @CBUS @CBCA @CB2US @CB2CA
    Scenario: DummyUserLoginEmailUpdate
        Given the customer is on the home page
        When DummyUser update email for "<email>" to "<updateEmail>"

        Examples:
            | email                          | updateEmail                             |
            | pw-automation.user11@email.com | pw-automation.user11@crateandbarrel.com |
            | pw-automation.user12@email.com | pw-automation.user12@crateandbarrel.com |
            | pw-automation.user13@email.com | pw-automation.user13@crateandbarrel.com |
            | pw-automation.user14@email.com | pw-automation.user14@crateandbarrel.com |
            | pw-automation.user15@email.com | pw-automation.user15@crateandbarrel.com |
            | pw-automation.user16@email.com | pw-automation.user16@crateandbarrel.com |
            | pw-automation.user17@email.com | pw-automation.user17@crateandbarrel.com |
            | pw-automation.user18@email.com | pw-automation.user18@crateandbarrel.com |
            | pw-automation.user19@email.com | pw-automation.user19@crateandbarrel.com |
            | pw-automation.user20@email.com | pw-automation.user20@crateandbarrel.com |