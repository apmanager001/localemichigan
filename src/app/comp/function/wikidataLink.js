const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const citiesPath = path.resolve(
  __dirname,
  "../../../../public/data/cities.json"
);
let cities = require(citiesPath);

const url = "https://en.wikipedia.org/wiki/List_of_municipalities_in_Michigan";

const COLUMN_MAPPING = [
  { columnName: "density", columnIndex: 9, jsonKey: "density" },
];

(async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const table = $("table.wikitable").first();

    const tableData = [];

    table.find("tr").each((i, row) => {
      const cells = $(row).find("td");
      if (cells.length > 1) {
        const cityLink = $(cells[0]).find("a").attr("href");
        const rowObj = {
          name: $(cells[0]).text().trim(),
          wikiUrl: cityLink ? `https://en.wikipedia.org${cityLink}` : null,
        };

        COLUMN_MAPPING.forEach((mapping) => {
          rowObj[mapping.jsonKey] =
            $(cells[mapping.columnIndex]).text().trim() || null;
        });

        tableData.push(rowObj);
      }
    });

    const normalize = (name) =>
      name
        .replace(/[\u2020\u2021\u00A0*†‡\[\]0-9]/g, "")
        .trim()
        .toLowerCase();

    let matchSuccess = 0;
    let matchFail = 0;
    let websiteSuccess = 0;
    let websiteFail = 0;

    for (const city of cities) {
      const match = tableData.find(
        (row) => normalize(row.name) === normalize(city.name)
      );

      if (match) {
        COLUMN_MAPPING.forEach((mapping) => {
          city[mapping.jsonKey] = match[mapping.jsonKey];
        });

        city.wikiUrl = match.wikiUrl;
        matchSuccess++;

        if (match.wikiUrl) {
          try {
            const cityPageRes = await axios.get(match.wikiUrl);
            const $$ = cheerio.load(cityPageRes.data);

            // Step 1: Look for 'official' and 'historical' links in external links
            const anchors = $$("ul li a");

            const officialLink = anchors
              .filter((i, el) =>
                $$(el).text().toLowerCase().includes("official")
              )
              .first()
              .attr("href");

            if (officialLink) {
              city.website = officialLink.startsWith("http")
                ? officialLink
                : `https:${officialLink}`;
              websiteSuccess++;
            } else {
              websiteFail++;
            }

            const historyLink = anchors
              .filter((i, el) =>
                $$(el).text().toLowerCase().includes("historical")
              )
              .first()
              .attr("href");

            if (historyLink) {
              city.historySite = historyLink.startsWith("http")
                ? historyLink
                : `https:${historyLink}`;
            }

            // Step 2: Check infobox for <th>Website</th> and override if found
            const websiteRow = $$("table.infobox tr").filter(
              (i, el) =>
                $$(el).find("th").text().trim().toLowerCase() === "website"
            );

            const infoboxLink = websiteRow.find("td a").first().attr("href");

            if (infoboxLink) {
              city.website = infoboxLink.startsWith("http")
                ? infoboxLink
                : `https:${infoboxLink}`;
            }
          } catch (err) {
            console.warn(
              `❗ Error scraping city page for ${city.name}: ${err.message}`
            );
            websiteFail++;
          }
        }
      } else {
        COLUMN_MAPPING.forEach((mapping) => {
          city[mapping.jsonKey] = null;
        });
        matchFail++;
        websiteFail++;
        console.warn(`No match for: ${city.name}`);
      }
    }

    fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2));
    console.log(`✅ Matched data for ${matchSuccess} cities`);
    console.log(`❌ ${matchFail} cities had no match`);
    console.log(`🌐 Found official websites for ${websiteSuccess} cities`);
    console.log(`🕳️ Missed official websites for ${websiteFail} cities`);
  } catch (err) {
    console.error("Error:", err);
  }
})();
