module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          // Specify your target environments here
          browsers: ["last 2 versions", "ie >= 11"],
        },
      },
    ],
    "@babel/preset-react",
  ],
};
