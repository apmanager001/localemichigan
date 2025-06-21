const fs = require("fs");
const path = require("path");

// 🔧 Change this to remove a different key
const keyToRemove = "population_date";

const citiesPath = path.resolve(
  __dirname,
  "../../../../public/data/cities.json"
);

// Load and parse current data
let cities = JSON.parse(fs.readFileSync(citiesPath, "utf-8"));

// Remove the key from each city object
cities = cities.map((city) => {
  if (city.hasOwnProperty(keyToRemove)) {
    delete city[keyToRemove];
  }
  return city;
});

// Overwrite the original file with updated content
fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2));
console.log(`🧹 Removed key '${keyToRemove}' from all entries in cities.json`);
