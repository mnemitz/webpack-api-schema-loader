# Webpack OpenAPI schema loader

This package provides a Webpack loader for loading fully parsed API specs into pages/scripts bundled by Webpack.

Primary use-case for this is inlining OpenAPI/Swagger schema definitions into web pages, allowing you to render them statically by simply importing a YAML/JSON file.

# Usage

Install with NPM

```
npm install openapi-schema-loader
```

## With Webpack loader prefix

You can leverage this loader without editing your Webpack config by using the loader prefix:

```javascript
import mySchema from "!openapi-schema-loader!./pet-store.yaml"
```

Note: As this loader is an ES Module, it requires Webpack 5.88 or higher.