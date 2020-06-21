const importAll = req => req
  .keys()
  .map(module => req(module));

importAll(
  require.context("./", true, /\.ts$/u)
);

importAll(
  require.context("raw-loader!./", false, /\.html$/u)
);
