Feature: Sitemap xml validation
    Customer should be able to verify sitemap.xml page content

    @Seo @TC_SEO_024 @SeoSitemap @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Sitemap validation in the page
        Given the customer is on the home page
        When Customer navigates to sitemap txt page
        Then Verify the sitemap xml is displayed and has content
