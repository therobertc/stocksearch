import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

export default function SearchBar(props) {
  return (
    <TextInput
      style={[styles.searchBar, props.customs]}
      placeholderTextColor="#fff"
      returnKeyType={"search"}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#1E396D",
    borderRadius: 25,
    color: "#fff",
    height: 38,
    marginTop: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 8,
    fontSize: 16
  }
});
