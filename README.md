&lt;github-repository&gt;
====

[![Version Status](https://img.shields.io/npm/v/github-repository.svg?style=flat&label=version&colorB=4bc524)](https://npmjs.com/package/github-repository)
[![macOS Build Status](https://img.shields.io/circleci/project/github/abraham/github-repository.svg?style=flat&label=macos)](https://circleci.com/gh/abraham/github-repository)
[![Linux Build Status](https://img.shields.io/travis/abraham/github-repository.svg?style=flat&label=linux)](https://travis-ci.org/abraham/github-repository)
[![Windows Build Status](https://img.shields.io/appveyor/ci/abraham/github-repository.svg?style=flat&label=windows)](https://ci.appveyor.com/project/abraham/github-repository)
[![Dependency Status](https://david-dm.org/abraham/github-repository.svg?style=flat)](https://david-dm.org/abraham/github-repository)

Install
----

Polyfill tags if you need them. This will include ShadowDOM and Custom Elements support.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/bundles/webcomponents-sd-ce.js"></script>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
<script src="https://unpkg.com/github-repository@latest/dist/github-repository.min.js"></script>
```

Example
----

[Live demo](https://codepen.io/abrahamwilliams/pen/PQoeqV)

Usage
----

Set the `owner-repo` attribute to the `username/repository` of a GitHub repository.

```
<github-repository owner-repo="angular/angular"></github-repository>
```

![Example](/images/simple.png)

For more advanced usage you can include:

- `<img slot="images" />` to include a preview image
- A number of `<a slot="badges"><img /></a>` to include status badges

```
<github-repository owner-repo="abraham/twitter-status">
  <img slot="images" src="https://raw.githubusercontent.com/abraham/twitter-status/master/images/simple.png" alt="Twitter Status embed preview" />

  <a slot="badges" href="https://npmjs.com/package/twitter-status" target="_blank">
    <img src="https://img.shields.io/npm/v/twitter-status.svg?style=flat&label=version&colorB=4bc524" alt="Version Status" />
  </a>
  <a slot="badges" href="https://circleci.com/gh/abraham/twitter-status" target="_blank">
    <img src="https://img.shields.io/circleci/project/github/abraham/twitter-status.svg?style=flat&label=macos" alt="macOS Build Status" />
  </a>
  <a slot="badges" href="https://travis-ci.org/abraham/twitter-status" target="_blank">
    <img src="https://img.shields.io/travis/abraham/twitter-status.svg?style=flat&label=linux" alt="Linux Build Status" />
  </a>
  <a slot="badges" href="https://ci.appveyor.com/project/abraham/twitter-status" target="_blank">
    <img src="https://img.shields.io/appveyor/ci/abraham/twitter-status.svg?style=flat&label=windows" alt="Windows Build Status" />
  </a>
</github-repository>

```

![Example with image and badges](/images/advanced.png)

GitHub API Rate limit
----

This Web Component makes unauthenticated requests to the GitHub API. Since the GitHub API has a fairly restrictive 60 requests/hour per IP address, API responses are cached in `localStorage`.

License
----

GithubRepository is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
