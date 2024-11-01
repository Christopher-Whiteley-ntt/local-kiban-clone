|[back](modifications.md)| |[top](./README.md)|

---

# Config modifications


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

configure to use catalog and organisation groups/users from altemista and github
```yaml
catalog:
  import:
    entityFilename: catalog-info.yaml
    pullRequestBranchName: backstage-integration
  rules:
    - allow: [Component, System, API, Resource, Location, Template]

  providers:
    github:
      # scan a user's github repos if SCAN_GITHUB_USER is set
      github-personal-projects:
        organization: ${SCAN_GITHUB_USER:-NOUSER}
        orgEnabled: false
        schedule:
          frequency: { minutes: 30 }
          timeout: { minutes: 5 }
        rules:
          - allow: [ API, Component, Location, Resource, System, Template ]
        validateLocationsExist: true
    gitlab:
      # Pull organisation information from altemista's nttdata-uk org
      altemista-org:
        host: git.altemista.cloud
        orgEnabled: true
        allowInherited: true
        group: nttdata-uk
        projectPattern: EXLUDEALLHACK # no repos should match this pattern
        schedule:
          frequency: { minutes: 60 }
          timeout: { minutes: 3 }
        rules:
          - allow: [Group, User]
      # use templates etc. from nttdata-uk/kiban group projects on altemista
      altemista-kiban-projects:
        host: git.altemista.cloud
        orgEnabled: false
        group: nttdata-uk/kiban
        schedule:
          frequency: { minutes: 60 }
          timeout: { minutes: 5 }
        rules:
          - allow: [ API, Component, Location, Resource, System, Template ]
      # scan a user's altemista repos if SCAN_ALTEMISTA_USER is set
      altemista-personal-projects:
        host: git.altemista.cloud
        orgEnabled: false
        userPattern: ${SCAN_ALTEMISTA_USER:-NOUSER}
        projectPattern: ${SCAN_ALTEMISTA_USER:-NOUSER}
        skipForkedRepos: true
        schedule:
          frequency: { minutes: 10 }
          timeout: { minutes: 2 }
        rules:
          - allow: [ API, Component, Location, Resource, System, Template ]
```

---
|[back](modifications.md)| |[top](./README.md)|
