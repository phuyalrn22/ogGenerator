const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

const generateTheme = async (author, image, title, theme) => {
  let browser = null;
  browser = await puppeteer.launch({ headless: true });
  const template = await ejs.renderFile(
    path.join(__dirname, "../views/pages/index.ejs"),
    {
      author,
      image,
      title,
      theme:theme=='dark'?'dark':"light",
      background:
        theme === "dark"
          ? `${process.env.DEPLOYMENT_URL}/dark.png`
          : `${process.env.DEPLOYMENT_URL}/light.png`,
    }
  );
  const page = await browser.newPage();

  await page.setContent(template);
  await page.setViewport({ width: 1200, height: 628 });

  let ss = await page.screenshot({ type: "png" });
  browser.close();
  return ss;
};

module.exports = generateTheme;
