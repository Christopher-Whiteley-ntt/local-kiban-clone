Notes:

To install packages to the backend (here it's plugins)
  `yarn workspace backend add @backstage/plugin-scaffolder-backend-module-gitlab`

GitLab Org Data integrations

  `yarn --cwd packages/backend add @backstage/plugin-catalog-backend-module-gitlab @backstage/plugin-catalog-backend-module-gitlab-org`

```
// optional if you want HTTP endpoints to receive external events
// backend.add(import('@backstage/plugin-events-backend/alpha'));
// optional if you want to use AWS SQS instead of HTTP endpoints to receive external events
// backend.add(import('@backstage/plugin-events-backend-module-aws-sqs/alpha'));
// optional - event router for gitlab. See.: https://github.com/backstage/backstage/blob/master/plugins/events-backend-module-gitlab/README.md
// backend.add(eventsModuleGitlabEventRouter());
// optional - token validator for the gitlab topic
// backend.add(eventsModuleGitlabWebhook());
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab-org'));
```
