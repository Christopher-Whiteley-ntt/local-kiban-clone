import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createBackendModule, coreServices } from '@backstage/backend-plugin-api';
import { ScmIntegrations } from '@backstage/integration';

import { createAzurePipelineAction, permitAzurePipelineAction, runAzurePipelineAction } from '@parfuemerie-douglas/scaffolder-backend-module-azure-pipelines';

export const scaffolderModuleCustomExtensions = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'custom-scaffolder-backend-module-azure-pipelines',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        discovery: coreServices.discovery,
        reader: coreServices.urlReader,
      },
      async init({ scaffolder, config}) {

        const integrations = ScmIntegrations.fromConfig(config);

        const azurePipelineActionCreate = createAzurePipelineAction({
          integrations,
        });

        const azurePipelineActionPermit = permitAzurePipelineAction({
          integrations,
        });

        const azurePipelineActionRun = runAzurePipelineAction({
          integrations,
        });

        scaffolder.addActions(azurePipelineActionCreate);
        scaffolder.addActions(azurePipelineActionPermit);
        scaffolder.addActions(azurePipelineActionRun);

      },
    });
  },
});
