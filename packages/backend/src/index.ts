/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

// ANDY TODO
// Added to allow scaffolder to publish to git backends
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-azure'));

// Added to allow scaffolder to work with azure pipelines
// see https://github.com/Parfuemerie-Douglas/scaffolder-backend-module-azure-pipelines/issues/42
import { scaffolderModuleCustomExtensions } from './plugins/azurepipelines';
backend.add(scaffolderModuleCustomExtensions);


// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider

// ANDY - TODO
// Added to allow access to git provider auth
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-gitlab-provider'));

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// ANDY TODO
// optional if you want HTTP endpoints to receive external events
// backend.add(import('@backstage/plugin-events-backend/alpha'));
// optional if you want to use AWS SQS instead of HTTP endpoints to receive external events
// backend.add(import('@backstage/plugin-events-backend-module-aws-sqs/alpha'));
// optional - event router for gitlab. See.: https://github.com/backstage/backstage/blob/master/plugins/events-backend-module-gitlab/README.md
// backend.add(eventsModuleGitlabEventRouter());
// optional - token validator for the gitlab topic
// backend.add(eventsModuleGitlabWebhook());
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-github/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-azure/alpha'));

// also allow org data from gitlab (to use altemista users & groups
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab-org'));

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend/alpha'));
// See https://backstage.io/docs/permissions/getting-started for how to create your own permission policy
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// search plugin
backend.add(import('@backstage/plugin-search-backend/alpha'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
// backend.add(import('@backstage/plugin-search-backend-module-pg/alpha'));

// search collators
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

// kubernetes
backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));

// dev tools
backend.add(import('@backstage/plugin-devtools-backend'));

// unprocessed entities backend
backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));

// gitlab ci/cd stuff
import {
  gitlabPlugin,
  catalogPluginGitlabFillerProcessorModule,
} from '@immobiliarelabs/backstage-plugin-gitlab-backend';

// azure devops ci/cd
backend.add(import('@backstage-community/plugin-azure-devops-backend'));
backend.add(import('@backstage-community/plugin-catalog-backend-module-azure-devops-annotator-processor'));

backend.add(gitlabPlugin);
backend.add(catalogPluginGitlabFillerProcessorModule);

backend.start();
