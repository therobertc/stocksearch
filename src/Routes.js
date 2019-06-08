import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { SearchPage } from "./Search";
import { HomePage } from "./HomePage";
import { Detail } from "./Detail";
import FetchingPage from "./FetchingPage";

const MainRoutes = createStackNavigator(
  {
    Home: {
      screen: HomePage
    },
    Search: {
      screen: SearchPage
    },
    Detail: {
      screen: Detail
    }
  },
  {
    initialRouteName: "Home"
  }
);

const SplashRoute = createStackNavigator(
  {
    Fetch: {
      screen: FetchingPage
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppRoutes = createSwitchNavigator(
  {
    SplashStack: SplashRoute,
    MainStack: MainRoutes
  },
  {
    initialRouteName: "SplashStack"
  }
);

export default createAppContainer(AppRoutes);
