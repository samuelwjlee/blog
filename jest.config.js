module.exports = {
  verbose: false,
  testURL: "http://localhost/",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)"
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}'
  ]
};
