# Initial Setup:

- Download and install Visual Studio Code: https://code.visualstudio.com/download 
- Install VSCode extension: Cucumber (Gherkin) Full Support 
- Download and install Node.js: https://nodejs.org/en/download/ 
- Run npm install to download all dependancies

- Below addons are preferred

    * Cucumber
    * Cucumber (Gherkin) Full Support
    * Jira and Bitbucket (Atlassian Labs)
    * Git Extension Pack
# Run tests

Open terminal and use the below command

- for QA - to run the scenarios with tag '@Checkout'

      npm run cucumber:report:crate_us_qa --test=@Checkout

      to run tests which matches 2 tags

      npm run cucumber:report:crate_us_qa --test="@CHK_001a and @CrateCA"

To run only your feature file, modify the cucumber.js file, baseConfig

  paths: ["project-*/**/*.feature"],

# Devices

Enter the below devices in browser.json where you want the tests to be run

  "Galaxy S8",
  "Galaxy S8 landscape",
  "Galaxy S9+",
  "Galaxy S9+ landscape",
  "Galaxy Tab S4",
  "Galaxy Tab S4 landscape",
  "iPad (gen 7)",
  "iPad (gen 7) landscape",
  "iPad Mini",
  "iPad Mini landscape",
  "iPad Pro 11",
  "iPad Pro 11 landscape",
  "iPhone 13",
  "iPhone 13 landscape",
  "iPhone 13 Pro",
  "iPhone 13 Pro landscape",
  "iPhone 13 Pro Max",
  "iPhone 13 Pro Max landscape",
  "iPhone 13 Mini",
  "iPhone 13 Mini landscape",
  "Pixel 5",
  "Pixel 5 landscape",
  "Desktop Safari",
  "Desktop Chrome",
  "Desktop Edge",
  "Desktop Firefox",

## Do/do nots

### Do

* Use [`locator`](https://playwright.dev/docs/locators) to select elements
* Follow [best practice](https://playwright.dev/docs/selectors#best-practices) by using user-facing attributes such as text or aria to select elements
* Use the [page object model](docs/pageobjectmodel.md) to retrieve information from the screen, drive the application and assert that screen elements are correct
* Create `locator` properties in the element.js under the relevant `Page` name. Use these properties to access the screen
* Use [locator assertions](https://playwright.dev/docs/test-assertions) to verify screen content

### Do not

* **Avoid** using $ or $$ to select elements - use locator to select elements
* **Avoid** using $eval or $$eval - use locator.evaluate or locator.evaluateAll
* **Avoid** xpath and selectors tied to page structure
* **Never** use Playwright locators or assertions outside of the page object model classes
* **Do not** create locators on the fly within a method - reuse the properties to enable easy encapsulation
* **Utilise** [locator assertions](https://playwright.dev/docs/test-assertions)

### Quick Guide / Recomendations for Locators

https://playwright.dev/docs/locators

- These are the recommended built in locators.

* page.getByRole() to locate by explicit and implicit accessibility attributes.
* page.getByText() to locate by text content.
* page.getByLabel() to locate a form control by associated label's text.
* page.getByPlaceholder() to locate an input by placeholder.
* page.getByAltText() to locate an element, usually image, by its text alternative.
* page.getByTitle() to locate an element by its title attribute.
* page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

- Use the code generator to generate a locator, and then edit it as you'd like.

* Playwright recommend prioritizing role locators to locate elements, as it is the closest way to how users and assistive technology perceive the page.
* Use 'label' locator when locating form fields.
* Use 'placeholder' locator when locating form elements that do not have labels but do have placeholder texts.
* Playwright recommend using text locators to find non interactive elements like div, span, p, etc. For interactive elements like button, a, input, etc. use role locators.
* Use 'alt' locator when your element supports alt text such as img and area elements.
* Use 'title' locator when your element has the title attribute.
* You can also use test ids when you choose to use the test id methodology or when you can't locate by role or text.
* If you absolutely must use CSS or XPath locators, you can use page.locator() to create a locator that takes a selector describing how to find an element in the page. Playwright supports CSS and XPath selectors, and auto-detects them if you omit css= or xpath= prefix
* CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. Instead, try to come up with a locator that is close to how the user perceives the page such as role locators or define an explicit testing contract using test ids.




