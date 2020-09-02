# preact-naive-server-renderer

![Build Status](https://img.shields.io/travis/huang-xiao-jian/preact-naive-server-renderer/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/huang-xiao-jian/preact-naive-server-renderer/badge.svg?branch=master)](https://coveralls.io/github/huang-xiao-jian/?branch=master)
![Package Dependency](https://david-dm.org/huang-xiao-jian/preact-naive-server-renderer.svg?style=flat)
![Package DevDependency](https://david-dm.org/huang-xiao-jian/preact-naive-server-renderer/dev-status.svg?style=flat)

A native renderer implementation for server side preact.


## Usage

```typescript
import { render, stringify } from 'preact-naive-server-renderer';

// render preact vnode into host element tree
function render(vnode: ComponentChild, parent: HostElement): HostElement;

// stringify host element tree into string literal
function stringify(children: ElementChild[], singleTags: SingleTag[]): string
```

# Licence

MIT
