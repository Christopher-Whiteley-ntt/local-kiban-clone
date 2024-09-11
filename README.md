# NTT Data Local Backspace

This is a backspace app ready configured to use git.altemista.cloud as both an auth and catalogue source.

Configuration differences from a 'clean' backspace are:

backend packages have been added:

* gitlab auth package to backend
* gitlab catalog package to backend
* others...

changes to code:

* `packages/backend/src/index.ts`
* `packages/app/src/App.ts`

config changes:

configure sqllite to persist to files  in the `sqllite-db` directory (so we get faster restarts)
```yaml
backend:
  database:
    client: better-sqlite3
    # connection: ':memory:'
    connection:
      directory: ../../sqllite-db
```

configure integratoin with altemista gitlab instance
```yaml
integrations:
  gitlab:
    - host: git.altemista.cloud
      token: ${AUTH_GITLAB_ALTEMISTA_TOKEN}
      apiBaseUrl: https://git.altemista.cloud/api/v4
```

configure auth from altemista gitlab instance
```yaml
auth:
  # auto logout after 5 minutes, with a 30 second warning
  autologout:
    enabled: true
    idleTimeoutMinutes: 5
    promptBeforeIdleSeconds: 30

  # see https://backstage.io/docs/auth/ to learn about auth providers
  environment: development
  providers:
    gitlab:
      # set audience to use self-hosted gitlab rather than gitlab.com
      development:
        clientId: ${AUTH_GITLAB_ALTEMISTA_CLIENT_ID}
        clientSecret: ${AUTH_GITLAB_ALTEMISTA_CLIENT_SECRET}
        audience: https://git.altemista.cloud
        enableExperimentalRedirectFlow: true
        signIn:
          resolvers:
            - resolver: usernameMatchingUserEntityName
```

configure to use catalog and organisation from altemista gitlab
```yaml
catalog:
  import:
    entityFilename: catalog-info.yaml
    pullRequestBranchName: backstage-integration
  rules:
    - allow: [Component, System, API, Resource, Location, Template]
  locations:
    # Use templates from altemista
    - type: url
      target: https://git.altemista.cloud/andynelson/backstage-templates/blob/test-renaming-git-source/all.yaml

  # Pull organisation information from altemista's nttdata-uk org
  providers:
    gitlab:
      altemista:
        host: git.altemista.cloud
        orgEnabled: true
        allowInherited: true
        group: nttdata-uk
        schedule:
          frequency: { minutes: 30 }
          timeout: { minutes: 1}
```

### environment variables

In order for the gitlab (and github) integrations to work, the following environment variables need to be set.

(Since some of these are credentials, I recommend `envchain` (brew install envchain) for mac users for anything below marked **sensitive**

* `AUTH_GITLAB_ALTEMISTA_CLIENT_ID` - the id of your gitlab oath app used to authenticate users
* `AUTH_GITLAB_ALTEMISTA_CLIENT_SECRET` - **sensitive** the secret of your gitlab oath app used to authenticate users
* `GITLAB_ALTEMISTA_TOKEN` - **sensitive** the gitlab personal access token used to integrate with gitlab altemista for the catalog
* `GITHUB_TOKEN` - **sensitive** the github personal access token used to integrate with github
