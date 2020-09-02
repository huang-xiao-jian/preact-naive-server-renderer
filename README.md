# preact-naive-server-renderer

![Build Status](https://img.shields.io/travis/huang-xiao-jian/preact-naive-server-renderer/master.svg?style=flat)
![Coveralls github](https://img.shields.io/coveralls/github/huang-xiao-jian/preact-naive-server-renderer)
![David Package PeerDependency](https://img.shields.io/david/peer/huang-xiao-jian/preact-naive-server-renderer)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/huang-xiao-jian/preact-naive-server-renderer)

A native renderer implementation for server side preact.

## Usage

```typescript
import { render, stringify } from 'preact-naive-server-renderer';

// render preact vnode into host element tree
function render(vnode: ComponentChild, parent: HostElement): HostElement;

// stringify host element tree into string literal
function stringify(children: ElementChild[], singleTags: SingleTag[]): string;
```

# Licence

MIT
