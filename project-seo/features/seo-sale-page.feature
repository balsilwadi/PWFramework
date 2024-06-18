Feature: SEO tag validation in Sale Products in Search PLP
    Customer should be able to verify the Meta Description tags contain sale message in the sale page

    @Seo @TC_SEO_032 @SeoSalePage @CBUS @CB2US
    Scenario Outline: SEO Meta desctiption validation in Sale Product
        Given the customer is on the home page
        When Customer searches for Keyword "<searchTerm>"
        And Customer navigates to a final sale PDP
        Then Verify the Meta Description tag contains "<saleMessageCrate>" "<saleMessageCB2>"
        And Verify the OG Description tag contians "<saleMessageCrate>" "<saleMessageCB2>"

        Examples:
            | searchTerm | saleMessageCrate | saleMessageCB2 |
            | white      | sale ends soon   | on sale        |