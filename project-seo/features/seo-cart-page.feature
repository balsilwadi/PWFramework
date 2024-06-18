Feature: SEO tag validation
        Customer should be able to verify the meta tags, h1, schema, internal and external links in cart page

        @Seo @TC_SEO_003 @SeoCartPage @CBUS @CBCA @CB2US @CB2CA
        Scenario Outline: SEO tag validation in cart page
                Given the customer is on the home page
                When Customer navigates to Cart page
                Then Verify the title of the page
                And Verify the Meta Description tag in the page
                And Verify the Canonical url in the cart page "<cartPageUrl>"
                And Verify the Meta Robots tag "<metaRobots>" in the cart page
                And Verify the OG SiteName tag in the page
                And Verify the OG Image tag in the page
                And Verify the OG url in the cart page "<cartPageUrl>"
                And Verify the OG Title tag in the page
                And Verify the OG Type tag in the page
                And Verify the OG Description in the page
                And Verify the FB Admins tag in the page
                And Verify the h1 tag displayed in the cart page
                And Verify the Website schema tag displayed in the page
                And Verify the Organization schema tag displayed in the page
                And Verify the external links displayed in the page
                And Verify the internal links displayed in the page
                Examples:
                        | cartPageUrl    | metaRobots       |
                        | /checkout/cart | noindex,nofollow |
