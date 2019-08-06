import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import store from './store'
import AuthLoading from './src/containers/AuthLoading'
import InstanceURLDialog from './src/containers/InstanceURLDialog'
import OAuthAuthorize from './src/containers/OAuthAuthorize'

/*
const AppNavigator = createStackNavigator({
  ReportsList,
  Report
}, {
    initialRouteName: "ReportsList"
  })
*/

const AuthNavigator = createStackNavigator({
  InstanceURLDialog,
  OAuthAuthorize,
}, {
    initialRouteName: "InstanceURLDialog"
  })

const MainNavigator = createSwitchNavigator({
  AuthLoading,
  // App: AppNavigator,
  Auth: AuthNavigator
},
  {
    initialRouteName: "AuthLoading"
  })

const AppContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </ReduxProvider>
    )
  }
}