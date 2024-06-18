Feature: Robots txt validation
    Customer should be able to verify robots.txt page content

    @Seo @TC_SEO_025 @SeoRobots @CBUS @CBCA @CB2US @CB2CA
    Scenario Outline: Robots txt validation in the page
        Given the customer is on the home page
        When Customer navigates to robots txt page
        Then Verify the robots txt content "<robotsValue1>","<robotsValue2>"
        Examples:
            | robotsValue1  | robotsValue2 |
            | User-agent: * | Disallow: /  |

