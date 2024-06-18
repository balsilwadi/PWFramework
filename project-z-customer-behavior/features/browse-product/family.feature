Feature: MPDP Browse Product Test Cases


    @MPDP @Regression @BrowseProduct @Smoke
    Scenario Outline: Scenario Outline: As Customer wants to verify MPDP product page.
    Given The customer is on "<testSite>" Home page
    When Customer opens MPDP page "<sku>"
    Then Customer should see multiple product Detail page
    

    
    Examples:
        | testSite | sku |
        | crate_us | 1005638 | 