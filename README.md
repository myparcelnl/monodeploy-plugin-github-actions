# Monodeploy GitHub Actions plugin

This is a small plugin for [Monodeploy](https://github.com/tophat/monodeploy) that adds information about the release to `$GITHUB_OUTPUT`, for use with GitHub actions. This is useful for letting other actions/workflows depend on the result of a monodeploy run. For example, to only execute something if a release was done.

## Usage

### Monodeploy config

```js
// monodeploy.config.cjs

module.exports = {
  // your config
  plugins: ["@myparcel/monodeploy-plugin-github-actions"],
};
```

### GitHub Actions workflow

```yaml
# .github/workflows/some-workflow.yml

- name: "Release"
  id: release
  run: |
    yarn monodeploy

- name: "Do something with output"
  if: steps.release.outputs.released == 'true'
  run: |
    echo ${{ steps.release.outputs.lastVersion }}
    echo ${{ steps.release.outputs.nextVersion }}
    echo ${{ steps.release.outputs.releaseType }}
```
