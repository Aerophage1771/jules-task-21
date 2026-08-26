const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const proofDir = path.join(__dirname, 'proof');
  if (!fs.existsSync(proofDir)) {
    fs.mkdirSync(proofDir);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: proofDir,
      size: { width: 1280, height: 800 }
    }
  });

  const page = await context.newPage();

  // Set viewport to desktop width
  await page.setViewportSize({ width: 1280, height: 800 });

  // Open the local HTML file
  const fileUrl = `file://${path.join(__dirname, 'index.html')}`;
  await page.goto(fileUrl);

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Helper to click and capture
  async function captureView(viewName, buttonText, width, height) {
      await page.setViewportSize({ width, height });
      const device = width < 768 ? 'mobile' : 'desktop';

      // Click the nav button
      await page.evaluate((text) => {
          const buttons = Array.from(document.querySelectorAll('.nav-link'));
          const btn = buttons.find(b => b.textContent.includes(text));
          if (btn) btn.click();
      }, buttonText);

      // Wait a moment for transition/render
      await page.waitForTimeout(500);

      // Screenshot
      const screenshotPath = path.join(proofDir, `${viewName}-${device}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Captured ${screenshotPath}`);
  }

  // Marketing (Desktop & Mobile)
  await captureView('marketing', 'Marketing', 1280, 800);
  await captureView('marketing', 'Marketing', 375, 812);

  // Course Portal (Desktop & Mobile)
  await captureView('course', 'Course', 1280, 800);
  await captureView('course', 'Course', 375, 812);

  // Blog (Desktop & Mobile)
  await captureView('blog', 'Blog', 1280, 800);
  await captureView('blog', 'Blog', 375, 812);

  // Click a CTA to show interactivity
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('.nav-link'));
    const btn = buttons.find(b => b.textContent.includes('Marketing'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);

  // We handle alert dialogs automatically or dismiss them
  page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.dismiss();
  });

  await page.evaluate(() => {
     const btn = document.querySelector('.btn-primary');
     if(btn) btn.click();
  });
  await page.waitForTimeout(1000);


  await context.close();
  await browser.close();

  // Create README.md
  const readmeContent = `# Proof of UI

This directory contains visual evidence of the GermaineTutoring theme implementation.

## Desktop Views (1280px)
- \`marketing-desktop.png\`: Marketing site (Hero, Proof, Methodology, Programs, Contact)
- \`course-desktop.png\`: Course Portal (Dashboard, Stats, Review Journal)
- \`blog-desktop.png\`: Blog (Recent Dispatches, 7-part Campaign)

## Mobile Views (375px)
- \`marketing-mobile.png\`: Marketing site
- \`course-mobile.png\`: Course Portal
- \`blog-mobile.png\`: Blog

## Interaction Recording
A \`.webm\` file is included in this directory demonstrating the interactive view-switching and modal CTA click.
`;
  fs.writeFileSync(path.join(proofDir, 'README.md'), readmeContent);
  console.log('Created proof/README.md');
})();
