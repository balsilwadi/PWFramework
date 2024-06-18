Feature: SEO tag validation in Gift Card page
        Customer should be able to verify the meta tags, h1, schema, internal and external links in Gift Card page

        @Seo @TC_SEO_019 @SeoGiftCardPage @CBUS @CBCA @CB2US @CB2CA
        Scenario Outline: SEO tag validation in Gift Card page
                Given the customer is on the home page
                When The customer navigate to Gift Card page
                Then Verify the title of the page
                And Verify the Meta Description tag in the page
                And Verify the canonical url in the gift card page "<giftCardUrl>"
                And Verify the Meta Robots tag in the page
                And Verify the OG SiteName tag in the page
                And Verify the OG Image tag in the page
                And Verify the OG url in the gift card page "<giftCardUrl>"
                And Verify the OG Title tag in the page
                And Verify the OG Type tag in the page
                And Verify the OG Description in the page
                And Verify the FB Admins tag in the page
                And Verify the Website schema tag displayed in the page
                And Verify the Organization schema tag displayed in the page
                And Verify the h1 tag displayed in the Gift Card page
                And Verify the external links displayed in the page
                And Verify the internal links displayed in the page
                Examples:
                        | giftCardUrl  |
                        | /gift-cards/ |