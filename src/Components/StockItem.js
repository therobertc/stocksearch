import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";

const StockItem = props => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        props.navigation.navigate("Detail", {
          symbol: props.data.symbol
        })
      }>
      <Text style={styles.itemTitle}>{props.data.name}</Text>
      <Text style={styles.itemSubtitle}>{props.data.symbol}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 8
  },
  itemTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "300"
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "100"
  }
});

export default withNavigation(StockItem);
