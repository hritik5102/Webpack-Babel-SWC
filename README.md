# Webpack + Babel + SWC ✨

In this project, we will dive into the process of creating a React project structure from scratch. We will also learn how to generate both development and production builds of React by utilizing Webpack as a bundler and Babel as a code transpiler. Additionally, we will explore how to use SWC, which is an alternative code transpiler to Babel. It’s noteworthy that SWC is 20 times faster than Babel on a single thread and 70 times faster on four cores.

If you aren't familiar with Babel and SWC, check out this repository.
- [Fundamentals of babel](https://github.com/hritik5102/Fundamentals-of-babel)
- [Fundamentals of SWC](https://github.com/hritik5102/Fundamentals-of-SWC)

# Follow the below steps

### Create a `package.json` file

```bash
$ npm init -y
```

### Install a react dependency

```bash
$ npm i react react-dom
```

### Create an `index.js` file under `src` directory

```jsx
import React from "react";

const HelloWorld = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default HelloWorld;
```

### Install babel dependency
```bash
$ npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

### Install webpack dependency

```bash
$ npm i -D webpack webpack-cli webpack-dev-server
```

### Babel Configuration

```js
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
    "@babel/preset-react"
  ],
};
```

### Webpack configuration with babel

```js
module.exports = {
  mode: "development", // or "production"
  module: {
    rules: [
      // if you want your code to be backwards compatible from older browser, you can use babel.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
    ],
  },
};
```

### Add script to execute webpack in the `package.json`

```json
"scripts": {
    "dev" : "webpack --mode development"
}
```

### Run the build script

```bash
$ npm run dev
```

### What's next?

As the transpilation was successful, we can see our ES5 code is generated, now this is great it worked wonderfully, but this is not helpful because we want to see our app in action in the browser.

### Install an HTML Webpack Plugin

```bash
$ npm i -D html-webpack-plugin
```

### Create a webpack config file

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // bundle.js
  },
  module: {
    rules: [
      // if you want your code to be backwards compatible from older browser, you can use babel.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelConfig,
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hritik App",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
}
```

### Move content of index.js to `components/app.js`

```jsx
import React from "react"

const HelloWorld = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

export default HelloWorld;
```

### Inside `index.js` file will mount a react component

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("app"));
```

### Create `index.html` inside public directory

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hritik - App</title>
  </head>

  <body>
    <div id="app"></div>
  </body>
  
</html>
```

### Add the scripts to start the development server inside `package.json`

`package.json`
```json

"scripts": {
    "start" : "webpack-dev-server --mode development --open"
}

```

### Start the development server
```bash
$ npm run start
```

## Switching from babel to SWC 🚀

### Install a dependency
```bash
$ npm i -D @swc/core swc-loader
```

### Replace babel-loader with SWC loader inside a webpack config

```js
  module: {
    rules: [
      // if you want your code to be backwards compatible from older browser, you can use babel.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader"
        },
      }
    ],
  },
```

### Create `.swcrc` config

```js
  jsc: {
    parser: {
      syntax: 'typescript', // Specify the syntax (jsx is automatically detected within TypeScript)
    },
    transform: {
      react: {
        pragma: 'React.createElement', // JSX pragma
        pragmaFrag: 'React.Fragment', // Fragment pragma
        throwIfNamespace: false, // Enable JSX fragment support
        development: false, // Optimize for production
        useBuiltins: true, // Use builtins for JSX transform
      },
    },
  },
  target: 'es5', // Transpile to ES5 syntax
```

### Start the development server, things will work as expected but now transpilation step will be faster with `SWC` as compared to `babel`
```bash
$ npm run start
```
