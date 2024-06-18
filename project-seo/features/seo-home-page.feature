Feature: SEO tag validation in Homepage
        Customer should be able to verify the meta tags, h1, schema, internal and external links in Homepage

        @Seo @TC_SEO_001 @SeoHomePage @CBUS @CBCA @CB2US @CB2CA
        Scenario Outline: SEO tag validation in Home page
                Given the customer is on the home page
                Then Verify the title of the page
                And Verify the Meta Description tag in the page
                And Verify the Canonical url in the home page
                And Verify the Meta Robots tag in the page
                And Verify the OG SiteName tag "<ogSiteNameCrateUS>","<ogSiteNameCB2US>","<ogSiteNameCrateCA>","<ogSiteNameCB2CA>" in the home page
                And Verify the OG Image tag in the page
                And Verify the OG url in the home page
                And Verify the OG Title tag in the page
                And Verify the OG Type tag in the page
                And Verify the OG Description in the page
                And Verify the FB Admins tag in the page
                And Verify the Website schema tag displayed in the home page
                And Verify the Search Action schema tag displayed in the home page
                And Verify the Organization schema tag displayed in the page
                And Verify the h1 tag displayed in the Home page
                And Verify the external links displayed in the page
                And Verify the internal links displayed in the page
                Examples:
                        | ogSiteNameCrateUS | ogSiteNameCB2US | ogSiteNameCrateCA     | ogSiteNameCB2CA |
                        | Crate & Barrel    | CB2             | Crate & Barrel Canada | CB2 Canada      |
