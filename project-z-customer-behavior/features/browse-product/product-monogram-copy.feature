Feature: Browse Product Test Cases
    As a user
    I want to Search for Monogram SKU and do validations
    @PDP @E2E @Monogram1 @CrateUS
    Scenario: As a Guest user add Monogram Sku to cart
        Given the customer is on the home page
        When the customer is on a product detail page
        Then they see the product detail page
        And They see STYLE grouper on Product Detail Page 
        When They click "Personalized"  in STYLE grouper on Product Detail Page
        And They select font "<FONT>" on Product Detail Page  
        And They select color to "THREAD COLOR" on Product Detail Page     
        # And They select Font and enter text on Product Detail Page
        Then They see Add to cart Container on Product Detail Page
        When They Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        When They click on Decline button on Double Dare popup
        Then they see the product detail page
        When They Click On Add to Cart on Product Detail Page
        Then Double Dare popup should appear on Product Detail Page
        When They click on  Accept button on Double Dare popup


        Examples:
      | FONT            | 
      | Beloved         | 
      | CB Sans         | 
      | Cotford         | 









    