# preact-naive-server-renderer

![Build Status](https://img.shields.io/travis/huang-xiao-jian/preact-naive-server-renderer/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/huang-xiao-jian/preact-naive-server-renderer/badge.svg?branch=master)](https://coveralls.io/github/huang-xiao-jian/?branch=master)
![Package Dependency](https://david-dm.org/huang-xiao-jian/preact-naive-server-renderer.svg?style=flat)
![Package DevDependency](https://david-dm.org/huang-xiao-jian/preact-naive-server-renderer/dev-status.svg?style=flat)

A native renderer implementation for server side


## Usage

```shell
# compile in watch mode
npm run compile:watch;

# unit test with coverage
npm run test;
```

## Attention

- tsc compiler compile without `polyfill`, mainly provide declare files
- babel compiler compile `commonjs` style code
- remember to change meta field in the `package.json`
- compile script automatically run before publish, no need for manual compile

# Licence

MIT
