/* ---------------------------------------------
Module
--------------------------------------------- */
const Webpack = require("webpack");
const Path = require("path");
const globule = require("globule");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

/* ---------------------------------------------
Property
--------------------------------------------- */
const ENV = require("./env.js"); //環境変数
const MODE = process.env.MODE; //development:開発, production:本番
const DIR = {
  src: Path.join(__dirname, "src"),
  public: Path.join(__dirname, "public"),
};
const EXTENSION_LIST = {
  pug: "html",
  scss: "css",
  ts: "js",
};
const ENTRY = {
  pug: {},
  scss: [],
  ts: {},
};

/* ---------------------------------------------
TS
--------------------------------------------- */
// ts loader
const tsLoader = [
  {
    loader: "ts-loader",
  },
  {
    loader: "eslint-loader",
    options: {
      fix: true,
    },
  },
];

// ts config
const tsConfig = {
  mode: MODE,
  target: ["web", "es5"],
  entry: ENTRY["ts"],
  output: {
    filename: "[name]",
    publicPath: "/",
    path: DIR["public"] + ENV.BASE_DIR,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: tsLoader,
      },
    ],
  },
  plugins: [
    new Webpack.optimize.AggressiveMergingPlugin(),
    new ESLintPlugin({
      fix: true,
    }),
  ],
};
if (MODE === "development") tsConfig.devtool = "eval-source-map";

/* ---------------------------------------------
SCSS
--------------------------------------------- */
// scss loader
const scssLoader = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      url: false, //ファイルパスの解決
      sourceMap: MODE === "production" ? false : true,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      sourceMap: MODE === "production" ? false : true,
    },
  },
  {
    loader: "sass-loader",
    options: {
      implementation: require("sass"),
      sassOptions: {
        indentWidth: 2,
        fiber: require("fibers"),
        // outputStyle: 'compressed',
      },
      sourceMap: MODE === "production" ? false : true,
    },
  },
];

// scss config
const scssConfig = () => {
  ENTRY["scss"].map((data) => {
    const config = {
      mode: MODE,
      entry: data.scss,
      output: {
        path: DIR["public"] + ENV.BASE_DIR,
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: scssLoader,
          },
        ],
      },
      plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
          filename: data.css,
        }),
      ],
    };
    module.exports.push(config);
  });
};

/* ---------------------------------------------
Pug
--------------------------------------------- */
// pug config data
const PugConfigData = require("./pug.config.js");
const getPageListData = () => {
  let pagelist = {};
  for (let i = 0; i < PugConfigData.pages.length; i++) {
    pagelist[PugConfigData.pages[i]["name"]] = PugConfigData.pages[i];
  }
  return {
    pagelist: pagelist,
    paths: PugConfigData.paths,
    links: PugConfigData.links,
  };
};
const PageData = getPageListData();

// pug loader
const pugLoader = [
  {
    loader: "pug-loader",
    options: {
      pretty: true,
      root: Path.resolve(__dirname, ""),
    },
  },
];

// pug config
const pugConfig = {
  mode: "development",
  entry: ENTRY["pug"],
  output: {
    filename: "[name]",
    publicPath: "/",
    path: DIR["public"] + ENV.BASE_DIR,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: pugLoader,
      },
    ],
  },
  plugins: [],
  cache: true,
};

/* ---------------------------------------------
File List
--------------------------------------------- */
Object.keys(EXTENSION_LIST).forEach((from) => {
  const to = EXTENSION_LIST[from];
  globule
    .find([`**/*.${from}`, `!**/_*.${from}`], { cwd: DIR["src"] })
    .forEach((filename) => {
      let output = filename.replace(new RegExp(`.${from}$`, "i"), `.${to}`);
      const source = Path.join(DIR["src"], filename);

      // pug - html
      if (output.indexOf(".html") !== -1) {
        output = output.replace("pug/", "");
        ENTRY["pug"][output] = source;
        pugConfig.plugins.push(
          new HtmlWebpackPlugin({
            filename: output,
            template: source,
            data: PageData,
          })
        );
      }

      // scss - css
      if (output.indexOf(".css") !== -1) {
        output = output.replace("scss/", "css/");
        ENTRY["scss"].push({
          scss: source,
          css: output,
        });
      }

      // ts - js
      if (output.indexOf(".js") !== -1) {
        output = output.replace("ts/", "js/");
        ENTRY["ts"][output] = source;
      }
    });
});

/* ---------------------------------------------
Module Exports
--------------------------------------------- */
module.exports = [];
module.exports.push(pugConfig);
scssConfig();
// module.exports.push(tsConfig)
