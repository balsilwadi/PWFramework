/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const elements = require('../../elements/elements');

const { ReportUtils } = require('../../../../support/utils/report-utils');

const testReport = new ReportUtils();

class SuperSorPage {
  constructor() {
    this.grouperDrawers = 'super-sor-option';
    this.grouperLabel = '.accordion-sor-description';
    this.summarytext = '.summary-custom-product';
    this.grouperTitle = '.accordion-sor-title';
    this.fabricList = "[data-id='fabric-listing-type'] [role='radiogroup'] .quickViewContainer_1RHmQ [data-testid='choice-container']";
    this.radioGroup = "[data-id='fabric-listing-type'] [role='radiogroup']";
    this.legFabrics = '.leg-swatch-group .quickViewContainer_1RHmQ';
    this.fabric = '.quickViewContainer_1RHmQ';
  }

  async verifySORGrouperDrawerCount() {
    const grouperDrawerCount = await page.getByTestId(this.grouperDrawers).count();
    await expect(grouperDrawerCount).toBeGreaterThan(0);
  }

  async clickGrouperDrawer(grouperDrawerElement) {
    await grouperDrawerElement.click();
  }

  async verifyDrawers() {
    const drawers = await page.locator(elements.drawers).all();
    await Promise.all(
      drawers.map(async (drawer) => {
        await this.clickDrawer(drawer);
        const choice = await this.selectNonActiveChoice(drawer);
        await this.verifyChoice(choice);
      })
    );
  }

  async clickDrawer(drawer) {
    await drawer.click();
    testReport.log('drawer clicked');
  }

  async selectNonActiveChoice(drawer) {
    const choiceInputs = await drawer.locator('[data-testid="button"]').all();
    const choicesCount = choiceInputs.length;
    for (let i = 0; i < choicesCount; i++) {
      const choice = choiceInputs[i];
      const isChecked = choice.isClicked();
      if (isChecked === false) {
        choice.click(); // Perform the click action
        page.waitForLoadState('domcontentloaded'); // Wait for the updated selector to appear
        // Wait for the updated selector to appear
        // await page.waitForSelector(elements.productSummaryChoices, { state: 'stable' });
        return choice;
      }
    }
    return null;
  }

  async getDrawersCount() {
    const drawersCount = await page.getByTestId(this.grouperDrawers).count();
    return drawersCount;
  }

  // Validate upto 5 fabrics for correct grouperLabel name and summary text updating
  async validateFabricGrouperChoices(grouperName) {
    await page.waitForLoadState('domcontentloaded');
    const index = await this.getDrawerIndex(grouperName);
    let maxFabrics = 1;
    if (grouperName === 'Leg') {
      const legSwatches = page.locator(this.legFabrics);
      const legSwatchesCount = await legSwatches.count();
      for (let i = 0; i < legSwatchesCount; i++) {
        const swatch = legSwatches.nth(i);
        await swatch.click();
        await page.waitForLoadState('domcontentloaded');
        const legSwatchName = `${this.legFabrics}:nth-of-type(${i + 1}) [data-testid="radio-label"]`;
        const legSwatchNameText = await page.textContent(legSwatchName);
        const grouperLabelLocator = page.locator(this.grouperLabel);
        await grouperLabelLocator.waitFor({ state: 'visible', timeout: 50000 });

        // Polling for the updated grouper Label text
        let updated = false;
        let attempts = 0;
        const maxAttempts = 5;
        while (!updated && attempts < maxAttempts) {
          // eslint-disable-next-line no-promise-executor-return
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second wait
          const grouperLabelText = page.locator(`[data-testid='super-sor-option']:nth-of-type(${index}) .accordion-sor-description`);
          const grouperLabelTextContent = await grouperLabelText.textContent();

          if (grouperLabelTextContent.includes(legSwatchNameText)) {
            updated = true;
          }
          // eslint-disable-next-line no-plusplus
          attempts++;
        }

        // verify Grouper Label
        const grouperLabelText = page.locator(`[data-testid='super-sor-option']:nth-of-type(${index}) .accordion-sor-description`);
        const grouperLabelTextContent = await grouperLabelText.textContent();
        await expect(grouperLabelTextContent.trim()).toContain(legSwatchNameText.trim());

        // Verify summary text changing
        await this.summarytextHasText(legSwatchNameText);

        await page.waitForLoadState('domcontentloaded');
        // eslint-disable-next-line no-plusplus
        maxFabrics++;
        if (maxFabrics > 5) break;
      }
    } else {
      const radioGroupLocator = page.locator(this.radioGroup);
      await radioGroupLocator.waitFor({ state: 'visible', timeout: 50000 });

      const radioGroupElements = page.locator(this.radioGroup);
      const radioGroupCount = await radioGroupElements.count();
      for (let i = 1; i <= radioGroupCount; i++) {
        const radioGroupElement = radioGroupElements.nth(i);
        const fabricElements = radioGroupElement.locator(this.fabric);
        const fabricsCount = await fabricElements.count();
        for (let j = 0; j < fabricsCount; j++) {
          if (maxFabrics > 5) break; // Break if 5 fabrics have been processed
          const fabricElement = fabricElements.nth(j);
          await fabricElement.click();

          await page.waitForLoadState('domcontentloaded');
          const fabricNameLocator = fabricElement.locator('label[data-testid="radio-label"] span span:first-child');
          const fabricName = await fabricNameLocator.textContent();

          const fabricDetailLocator = fabricElement.locator('label[data-testid="radio-label"] span p');
          const fabricDetail = await fabricDetailLocator.textContent();
          testReport.log('FABRIC is : ', fabricName, ' | FABRIC DETAIL: ', fabricDetail);
          const grouperLabelLocator = page.locator(this.grouperLabel);
          await grouperLabelLocator.waitFor({ state: 'visible', timeout: 50000 });

          // Polling for the updated grouper Label text
          let updated = false;
          let attempts = 0;
          const maxAttempts = 5;
          while (!updated && attempts < maxAttempts) {
            // eslint-disable-next-line no-promise-executor-return
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second wait
            const grouperLabelText = page.locator(`[data-testid='super-sor-option']:nth-of-type(${index}) .accordion-sor-description`);
            const grouperLabelTextContent = await grouperLabelText.textContent();

            if (grouperLabelTextContent.trim().includes(fabricDetail.trim()) && grouperLabelTextContent.trim().includes(fabricName.trim())) {
              updated = true;
            }
            // eslint-disable-next-line no-plusplus
            attempts++;
          }

          if (!updated) {
            throw new Error('Grouper label did not update in the expected time.');
          }

          // verify Grouper Label
          const grouperLabelText = page.locator(`[data-testid='super-sor-option']:nth-of-type(${index}) .accordion-sor-description`);
          const grouperLabelTextContent = await grouperLabelText.textContent();
          await expect(grouperLabelTextContent.trim()).toContain(fabricDetail.trim());
          await expect(grouperLabelTextContent.trim()).toContain(fabricName.trim());

          // Verify summary text changing
          await this.summarytextHasText(fabricDetail);
          await this.summarytextHasText(fabricName);

          await page.waitForLoadState('domcontentloaded');
          // eslint-disable-next-line no-plusplus
          maxFabrics++;
        }
        if (maxFabrics > 5) break;
      }
    }
  }

  async summarytextHasText(text) {
    const summarytext = await page.locator(elements.productPage.txtProductSummary).textContent();
    // Remove commas from both strings and then trim
    const formattedText = text.replace(/,/g, '').trim();
    await expect(summarytext.includes(formattedText)).toBeTruthy();
  }

  async clickGrouper(grouperName) {
    const drawersCount = await this.getDrawersCount();
    for (let i = 0; i < drawersCount; i++) {
      const grouperDrawerElement = page.getByTestId(this.grouperDrawers).nth(i);
      const grouperDrawerTitleSelector = `[data-testid='super-sor-option']:nth-child(${i + 1}) .accordion-sor-title`;
      const grouperDrawerTitle = await page.textContent(grouperDrawerTitleSelector);
      const normalizedGrouperDrawerTitle = grouperDrawerTitle.toLowerCase();
      const normalizedGrouperName = grouperName.toLowerCase();
      if (normalizedGrouperDrawerTitle === normalizedGrouperName) {
        const isExpanded = await grouperDrawerElement.getAttribute('data-expanded');
        if (isExpanded !== 'true') {
          await grouperDrawerElement.click();
        }
        break;
      }
    }
  }

  async getDrawerIndex(grouperName) {
    const normalizedGrouperName = grouperName.toLowerCase();
    const grouperDrawerElementCount = await page.getByTestId(this.grouperDrawers).count();
    for (let i = 1; i <= grouperDrawerElementCount; i++) {
      const grouperDrawerTitleSelector = `[data-testid='super-sor-option']:nth-child(${i}) .accordion-sor-title`;
      const grouperDrawerTitle = await page.textContent(grouperDrawerTitleSelector);
      const normalizedDrawerTitle = grouperDrawerTitle.toLowerCase();
      if (normalizedDrawerTitle === normalizedGrouperName) {
        return i;
      }
    }
    throw new Error(`No grouper found for grouper name: ${grouperName}`);
  }

  async validateGrouperChoices(grouperName) {
    const normalizedGrouperName = grouperName.toLowerCase();
    if (normalizedGrouperName === 'size') {
      await this.validateSizeGrouperChoices();
    } else if (normalizedGrouperName !== 'fabric' && normalizedGrouperName !== 'leg' && normalizedGrouperName !== 'leather') {
      await this.validateNonFabricGrouperChoices(grouperName);
    } else {
      await this.validateFabricGrouperChoices(grouperName);
    }
  }

  // [data-testid="toolbar"] .text-group:nth-of-type(1) .quickViewContainer_1RHmQ
  async validateSizeGrouperChoices() {
    const sizeOptions = page.locator('#Size-legend .quickViewContainer_1RHmQ');
    const sizeOptionsCount = await sizeOptions.count();
    let maxOptions = 1;

    for (let i = 1; i < sizeOptionsCount; i++) {
      const sizeOption = page.locator(`[data-testid="toolbar"] .text-group:nth-of-type(${i}) .quickViewContainer_1RHmQ`);
      // Check if the size option is disabled
      const isDisabledElement = page.locator(`[data-testid="toolbar"] .text-group:nth-of-type(${i}) [data-testid="button"]`);
      const isDisabled = await isDisabledElement.getAttribute('aria-disabled');
      if (isDisabled === 'true') {
        // eslint-disable-next-line no-continue
        continue; // Skip this iteration if the option is disabled
      }
      await sizeOption.click();

      await page.waitForLoadState('domcontentloaded');
      const sizeOptionName = await sizeOption.textContent();
      await expect(page.locator(this.grouperLabel)).toBeVisible();

      // Verify grouper label changing
      const grouperLabel = await this.getGrouperLabel('Size');
      await expect(sizeOptionName.trim() === grouperLabel || sizeOptionName.includes(grouperLabel)).toBeTruthy();

      // Verify summary text changing
      const summarytext = await page.locator(elements.productPage.txtProductSummary).textContent();
      await expect(summarytext.includes(grouperLabel)).toBeTruthy();
      // eslint-disable-next-line no-plusplus
      maxOptions++;
      if (maxOptions > 5) break;
    }
  }

  // Validate upto 5 options for a non fabric Grouper choice
  async validateNonFabricGrouperChoices(grouperName) {
    const index = await this.getDrawerIndex(grouperName);
    const radioButtons = page.locator(`[data-testid='super-sor-option']:nth-child(${index}) .quickViewContainer_1RHmQ`);
    const radioButtonsCount = await radioButtons.count();
    let maxOptionChoices = 1;
    for (let j = 0; j < radioButtonsCount; j++) {
      const radioButton = radioButtons.nth(j);
      const buttonText = await radioButton.textContent();
      const buttonTextTrimmed = buttonText.trim();
      await testReport.log(`Option ${index}, Choice ${j + 1}: ${buttonTextTrimmed}`);

      const buttonSelector = `.quickViewContainer_1RHmQ:nth-child(${j + 1})`;
      await expect(page.locator(buttonSelector)).toBeVisible();
      await radioButton.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the radioButton to be visible
      await radioButton.click({ timeout: 60000 });

      await page.waitForLoadState('domcontentloaded');
      const grouperLabelLocator = page.locator(this.grouperLabel);
      await grouperLabelLocator.waitFor({ state: 'visible', timeout: 60000 });
      // Verify grouper label changing
      // const grouperLabel = await page.locator(this.grouperLabel).nth(index-1).textContent();
      const grouperLabel = await this.getGrouperLabel(grouperName);

      await page.waitForLoadState('domcontentloaded');
      await expect(buttonTextTrimmed === grouperLabel || buttonTextTrimmed.includes(grouperLabel)).toBeTruthy();

      // Verify summary text changing
      const summarytext = await page.locator(elements.productPage.txtProductSummary).textContent();
      await expect(summarytext.includes(grouperLabel)).toBeTruthy();

      await page.waitForLoadState('domcontentloaded');
      maxOptionChoices += 1;
      if (maxOptionChoices > 5) break;
    }
  }

  async getGrouperLabel(grouperName) {
    const grouperMappings = {
      'size & shape': '[data-region="sor-size & shape-option"] .accordion-sor-description',
      fabric: '[data-region="sor-fabric-option"] .accordion-sor-description',
      size: '[data-region="sor-size-option"] .accordion-sor-description',
      leg: '[data-region="sor-leg-option"] .accordion-sor-description',
      depth: '[data-region="sor-depth-option"] .accordion-sor-description',
      leather: '[data-region="sor-leather-option"]  .accordion-sor-description'
    };

    const normalizedGrouperName = grouperName.toLowerCase();
    const selector = grouperMappings[normalizedGrouperName];
    if (selector) {
      const grouperLabel = page.locator(selector);
      const grouperLabelText = await grouperLabel.textContent();
      return grouperLabelText;
    }

    throw new Error(`No selector found for grouper name: ${grouperName}`);
  }
}

module.exports = { SuperSorPage };
