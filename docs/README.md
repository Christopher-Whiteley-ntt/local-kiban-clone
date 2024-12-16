# NTT Data Local Backstage

This is a backstage app ready configured to use git.altemista.cloud as both an auth and catalogue source.

[[_TOC_]]

Configuration differences from a 'clean' backstage are:

backend packages have been added:

* gitlab auth package to backend
* gitlab catalog package to backend
* others...

see [backstage modifications](./modifications.md) for details.


## Installing


### Configuring your account on Altemista to allow backstage to authenticate
You'll need a personal access token, and a gitlab app for backstage to use.

A walkthrough of setting these up is in

[Altemista config](./altemista-config.md)

### Instructions - Mac OSX
On MacOS, you will want to have run xcode-select --install to get the XCode command line build tooling in place.

#### Nodejs & yarn setup
Using nvm (recommended)
##### Install nvm
using homebrew
```bash
brew install nvm
nvm install 20
npm install -g yarn
```
If this is the first time you've used nvm, make sure you follow the instructions brew provides on integrating with your profile

If you've previously installed node/yarn directly with homebrew, then it may be necessary to uninstall them
(if you see errors with `/bin/sh: concurrently: command not found` then check that `which yarn` and `which node` give the same path)

#### Starting backstage

##### environment variables
In order for the gitlab (and github) integrations to work, the following environment variables need to be set.

Since some of these are credentials, I recommend [direnv for variables and envchain](./using-direnv-and-envchain.md) for anything below marked **sensitive**

* `ADO_TOKEN` - **sensitive** the azure devops personal access token used to integrate with github (optional: if not set, ado access will not be possible)
* `GITHUB_TOKEN` - **sensitive** the github personal access token used to integrate with github (optional: if not set, github access will not be possible)
* `GITLAB_ALTEMISTA_TOKEN` - **sensitive** the gitlab personal access token used to integrate with gitlab altemista for the catalog
* `AUTH_GITLAB_ALTEMISTA_CLIENT_ID` - the id of your gitlab oath app used to authenticate users
* `AUTH_GITLAB_ALTEMISTA_CLIENT_SECRET` - **sensitive** the secret of your gitlab oath app used to authenticate users
* `NODE_OPTIONS=--no-node-snapshot` # only needed for node v20 or above

To have backstage automatically add compatible repos in your personal spaces on altemista and github also set the following vars:

* `SCAN_ALTEMISTA_USER` - your username on altemista, as used in the slug for personal projects
* `SCAN_GITHUB_USER` - your github username

The simplest way to run is in local dev mode - the backend and frontend app will start, and your local browser will open pointing to localhost:3000

```bash
yarn install --frozen-lockfile # only needed on first run, or after pulling updates from git
yarn dev
```

The first time you run backstage, it will take a moment for backstage to sync the altemista github users & groups, so if you try to log in instantly, it will likely fail to find your username.

![failed login screenshot](./images/failed-login.png "Failed login due to user not found")

As soon as you see the following 2 log entries, you'll be good to go.
(next time you start the users & groups are already present, so you'll be able to log in instantly)

* `catalog info Scanned 1807 users and processed 1807 users target=GitlabOrgDiscoveryEntityProvider:altemista`
* `catalog info Scanned 378 groups and processed 22 groups target=GitlabOrgDiscoveryEntityProvider:altemista`

**NB**
If you see the error below when logging in, and`FetchError` messages in the console logs related to being unable to get local issuer certificate
then also set the following environment variable to disable strict tls checking for node.
* `NODE_TLS_REJECT_UNAUTHORIZED=0`
![access token error](./images/access-token-error.png)

Alternatively, you can configure node to trust a zscalar certificate by [downloading the zscalar root certificate using your browser](certificate-download.md), and setting:
* `NODE_EXTRA_CA_CERTIFICATES=./zscalar.pem`

Once you've logged in, you should see what looks like an empty system.

![successful login screenshot](./images/initial-page.png "Successful login")

Select 'Template' from the Kind menu dropdown, and you should see that there are templates imported.

![template dropdown](./images/kind-selection.png)

![templates populated](./images/templates.png)
