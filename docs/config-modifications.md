### config modifications


configure sqllite to persist to files  in the `sqllite-db` directory (so we get faster restarts)
```yaml
backend:
  database:
    client: better-sqlite3
    # connection: ':memory:'
    connection:
      directory: ../../sqllite-db
```

configure integration with altemista gitlab instance
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
