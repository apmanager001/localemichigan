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
  // Add other columns as needed
];

axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const table = $("table.wikitable").first();

    const tableData = [];

    table.find("tr").each((i, row) => {
      const cells = $(row).find("td");
      if (cells.length > 1) {
        const rowObj = { name: $(cells[0]).text().trim() };
        COLUMN_MAPPING.forEach((mapping) => {
          rowObj[mapping.jsonKey] =
            $(cells[mapping.columnIndex]).text().trim() || null;
        });
        tableData.push(rowObj);
      }
    });

    let success = 0;
    let failure = 0;

    cities.forEach((city) => {
      const match = tableData.find((row) => row.name === city.name);
      if (match) {
        COLUMN_MAPPING.forEach((mapping) => {
          city[mapping.jsonKey] = match[mapping.jsonKey];
        });
        success++;
      } else {
        COLUMN_MAPPING.forEach((mapping) => {
          city[mapping.jsonKey] = null;
        });
        console.warn(`No match for: ${city.name}`);
        failure++;
      }
    });

    fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2));
    console.log(`✅ Updated ${success} cities`);
    console.log(`❌ ${failure} cities had no match`);
  })
  .catch((err) => {
    console.error("Error fetching Wikipedia page:", err);
  });
