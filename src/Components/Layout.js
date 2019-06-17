import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Layout = props => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E1533",
    paddingHorizontal: 20,
    color: "#fff"
  }
});

export default Layout;
