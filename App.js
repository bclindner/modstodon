import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AuthLoading from "./src/containers/AuthLoading";
import InstanceURLDialog from "./src/containers/InstanceURLDialog";
import ReportList from "./src/containers/ReportList";
import Report from "./src/containers/Report";

const AppNavigator = createStackNavigator(
  {
    ReportList,
    Report
  },
  {
    initialRouteName: "ReportList"
  }
);

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading,
    App: AppNavigator,
    Auth: InstanceURLDialog
  },
  {
    initialRouteName: "AuthLoading",
    header: (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
    )
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </PaperProvider>
      </ReduxProvider>
    );
  }
}
