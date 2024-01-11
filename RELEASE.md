# Release

The release process for scality/sphinx-tools

## Pick a version number

Checkout what is the latest version number released and decide upon
the next release number.

> [!NOTE]
> Follow [semver.org](https://semver.org) for guidance.

## Bump the VERSION file

Create a new pull request changing the content of the [`VERSION`](./VERSION)
file with the previously chosen version number.

## Create a GitHub Release

Once the pull request merged, [create a new release] with the following parameters:

- Choose a tag: Input the version number, and click on `Create new tag: x.y.z on publish`
- Target: `master`
- Click on `Generate release notes`
- Click on `Publish release`

[create a new release]: https://github.com/scality/sphinx-tools/releases/new
