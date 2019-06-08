import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import Realm from "realm";
import { StockSchema, MODEL_NAME } from "../Models";
import { SearchBar, StockItem, Layout } from "../Components";

export default class HomePage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    Realm.open({ schema: [StockSchema] }).then(realm => {
      let data = realm.objects(MODEL_NAME);
      console.log(data.length);
      this.setState({ data });
    });
  }

  render() {
    return (
      <Layout>
        <Text style={styles.title}>Stock Search</Text>
        <SearchBar
          placeholder="Search"
          onFocus={() => this.props.navigation.navigate("Search")}
        />
        <Text style={styles.subtitle}>All Stocks</Text>
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item, index) => item.name}
          ListEmptyComponent={() => (
            <Text style={{ color: "#fff" }}>No results available for now</Text>
          )}
          intialNumToRender={15}
          renderItem={({ item }) => <StockItem data={item} />}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    backgroundColor: "#1e2124",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10
  },
  title: {
    color: "#fff",
    fontSize: 24,
    paddingTop: 25,
    fontWeight: "bold"
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "bold"
  }
});
