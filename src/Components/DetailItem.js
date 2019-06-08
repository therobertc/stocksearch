import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailItem = props => {
  return (
    <View style={styles.itemCon}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCon: {
    flexDirection: "row",
    alignItems: "center",
    margin: 6
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#fff",
    marginRight: 20
  },
  value: {
    fontWeight: "400",
    fontSize: 18,
    color: "#fff"
  }
});

export default DetailItem;
