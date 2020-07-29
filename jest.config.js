module.exports = {
  "preset": "ts-jest",
  "moduleNameMapper": {
    "^@interfaces/(.*)$": "<rootDir>/src/range/ts/interfaces/$1",
    "^@type/(.*)$": "<rootDir>/src/range/ts/type/$1",
    "^@enums/(.*)$": "<rootDir>/src/range/ts/enums/$1",

    "^@elements/(.*)$": "<rootDir>/src/range/elements/$1",
    "^@utils/(.*)$": "<rootDir>/src/range/utils/$1"
  }
};
