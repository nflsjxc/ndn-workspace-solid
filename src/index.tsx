/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route, RouteSectionProps } from '@solidjs/router'

import {
  Description as DescriptionIcon,
  Apps as AppsIcon,
  SettingsEthernet as SettingsEthernetIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from '@suid/icons-material'

import Root from './components/root-wrapper'
import App from './App'
import ShareLatex from './components/share-latex'
import OauthTest from './components/oauth-test'
import { NdnWorkspaceProvider } from './Context'
import { Connect, StoredConns } from './components/connect'
import { Workspace, Profile, ConvertTestbed } from './components/workspace'
import { project } from './backend/models'
import { Toaster } from 'solid-toast'

const root = document.getElementById('root')

const rootComponent = (props: RouteSectionProps) => (
  <Root
    routes={[
      { icon: <HomeIcon />, href: '/', title: 'Home' },
      { icon: <AppsIcon />, href: '/profile', title: 'Workspace' },
      {
        icon: <DescriptionIcon />,
        href: `/latex/${project.RootId}`,
        title: 'Editor',
      },
      {
        icon: <SettingsEthernetIcon />,
        href: '/connection',
        title: 'Connection',
      },
      { icon: <SettingsIcon />, href: '/', title: 'Settings' },
    ]}
  >
    {props.children}
  </Root>
)

render(
  () => (
    <NdnWorkspaceProvider>
      <Router root={rootComponent}>
        <Route path="/" component={App} />
        <Route path="/latex/:itemId" component={() => <ShareLatex rootUri="/latex" />} />
        <Route path="/connection/add" component={Connect} />
        <Route path="/connection" component={StoredConns} />
        <Route path="/workspace" component={Workspace} />
        <Route path="/profile" component={Profile} />
        <Route path="/convert-testbed" component={ConvertTestbed} />
        <Route path="/oauth-test" component={OauthTest} />
      </Router>

      <Toaster />
    </NdnWorkspaceProvider>
  ),
  root!,
)
