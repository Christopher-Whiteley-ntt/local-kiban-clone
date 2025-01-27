import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/MyLocation';
import ExtensionIcon from '@material-ui/icons/Extension';
import HelpOutline from '@material-ui/icons/HelpOutline';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { MyGroupsSidebarItem } from '@backstage/plugin-org';
import GroupIcon from '@material-ui/icons/People';

// add a direct link to template editor in sidebar
import Edit from '@material-ui/icons/Edit';
// add devtools
import BuildIcon from '@material-ui/icons/Build';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          {/* Items in this group will be scrollable if they run out of space */}
          <SidebarItem icon={MapIcon} to="tech-radar" text="Tech Radar" />
          <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
          <MyGroupsSidebarItem
            singularTitle="My Group"
            pluralTitle="My Groups"
            icon={GroupIcon}
          />
        </SidebarScrollWrapper>
      </SidebarGroup>
      {/* add a direct link to template editor in sidebar */}
      <SidebarSpace />
      <SidebarDivider />
      <SidebarItem icon={Edit} to="create/edit" text="Template Tools" />
      <SidebarItem icon={LibraryBooks} to="create/actions" text="Installed Actions" />
      <SidebarItem icon={BuildIcon} to="devtools" text="Dev Tools" />
      <SidebarDivider />
      {/* add a direct link to template editor in sidebar */}
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarItem icon={HelpOutline} to="what-is-kiban" text="Kiban (Local)?" />
        <SidebarSettings />
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);
