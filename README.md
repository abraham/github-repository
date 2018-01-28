&lt;github-repository&gt;
====

Install
----

Polyfill tags if you need them. This will include ShadowDOM and Custom Elements support.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-sd-ce.js"></script>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
<script src="https://unpkg.com/github-repository@latest/dist/github-repository.min.js"></script>
```

Usage
----

```
<github-repository></github-repository>

<github-repository owner-repo="Pickle"></github-repository>

<github-repository>Slot content</github-repository>
```



License
----

GithubRepository is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
