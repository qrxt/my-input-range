const merge = require("merge")
const ts_preset = require("ts-jest/jest-preset")
const puppeteer_preset = require("jest-puppeteer/jest-preset")

module.exports = merge.recursive(ts_preset, puppeteer_preset, {
  "moduleNameMapper": {
    "^@interfaces/(.*)$": "<rootDir>/src/range/ts/interfaces/$1",
    "^@type/(.*)$": "<rootDir>/src/range/ts/type/$1",
    "^@enums/(.*)$": "<rootDir>/src/range/ts/enums/$1",

    "^@elements/(.*)$": "<rootDir>/src/range/elements/$1",
    "^@utils/(.*)$": "<rootDir>/src/range/utils/$1"
  }
});
