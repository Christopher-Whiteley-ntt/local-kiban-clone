import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
  AlertDisplay,
  AutoLogout,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { gitlabAuthApiRef } from '@backstage/core-plugin-api';

// imports for devtools
import { DevToolsPage } from '@backstage/plugin-devtools';
import { customDevToolsPage } from './components/devtools/CustomDevTools';
import { EntityValidationPage } from '@backstage-community/plugin-entity-validation';
import { CatalogUnprocessedEntitiesPage } from '@backstage/plugin-catalog-unprocessed-entities';

// imports for TechRadar and KibanInfo pages
import { TechRadarPage } from '@backstage-community/plugin-tech-radar';
import { KibanInfoPage } from './components/kiban';

import LightIcon from '@material-ui/icons/WbSunny';
import {
  createUnifiedTheme,
  genPageTheme,
  shapes,
  createBaseThemeOptions,
  palettes,
  UnifiedThemeProvider
} from '@backstage/theme';

const nttPrimaryColours = {
  blue: '#03163D',
  grey: '#9D9D9C',
  white: '#ECF3FF'
};

// Public sector colour palette taken from:
// https://sp-uk-info.nttdata-emea.com/NTT%20DATA%20UK%20Brand%20Refresh/NTT%20DATA%20Guidelines%20final.pdf
const nttSecondaryColours = {
  dark: '#606E9F',
  midDark: '#7283BC',
  midLight: '#96A1CB',
  light: '#BAC2DF'
};

const nttPalette = {
  primary: {
    main: nttPrimaryColours.blue,
  },
  secondary: {
    main: nttSecondaryColours.dark,
  },
  navigation: {
    background: nttPrimaryColours.blue,
    indicator: nttPrimaryColours.grey,
    color: nttPrimaryColours.white,
    selectedColor: nttSecondaryColours.midLight,
  }
}

const nttPageTheme = genPageTheme({
  colors: [nttSecondaryColours.dark, nttSecondaryColours.midDark, nttSecondaryColours.midLight, nttSecondaryColours.light],
  shape: shapes.round
});

const nttLightTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      ...nttPalette
    }
  }),
  fontFamily: 'Helvetica Neue',
  defaultPageTheme: 'home',
  pageTheme: {
    home: nttPageTheme,
    documentation: nttPageTheme,
    tool: nttPageTheme,
    service: nttPageTheme,
    website: nttPageTheme,
    library: nttPageTheme,
    other: nttPageTheme,
    app: nttPageTheme,
    apis: nttPageTheme,
  }
});

const nttDarkTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,
      ...nttPalette,
      primary: {
        main: nttSecondaryColours.midDark,
        dark: nttPrimaryColours.blue
      }
    }
  }),
  fontFamily: 'Helvetica Neue',
  defaultPageTheme: 'home',
  pageTheme: {
    home: nttPageTheme,
    documentation: nttPageTheme,
    tool: nttPageTheme,
    service: nttPageTheme,
    website: nttPageTheme,
    library: nttPageTheme,
    other: nttPageTheme,
    app: nttPageTheme,
    apis: nttPageTheme,
  }
});


const app = createApp({
  apis,
  /** Theming from backstage-docker repo */

  themes: [{
    id: 'ntt-light',
    title: 'NTT Light Theme',
    variant: 'light',
    icon: <LightIcon />,
    Provider: ({ children }) => (<UnifiedThemeProvider theme={nttLightTheme} children={children} />),
  }, {
    id: 'ntt-dark',
    title: 'NTT Dark Theme',
    variant: 'dark',
    icon: <LightIcon />,
    Provider: ({ children }) => (<UnifiedThemeProvider theme={nttDarkTheme} children={children} />),
  }],

  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        providers={
          [
            // use gitlab auth provider
            {
              id: 'gitlab-altemista-auth-provider',
              title: 'GitLab Altemista',
              message: 'Sign in using GitLab Altemista',
              apiRef: gitlabAuthApiRef
            }
          ]}
      />
    ),
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Navigate to="catalog" />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/what-is-kiban" element={<KibanInfoPage />} />
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/devtools" element={<DevToolsPage />}>
      {customDevToolsPage}
    </Route>
    <Route path="/entity-validation" element={<EntityValidationPage />} />
    <Route path="/unprocessed-entities" element={<CatalogUnprocessedEntitiesPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AutoLogout />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
