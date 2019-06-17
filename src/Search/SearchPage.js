import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import Realm from "realm";
import { StockSchema, MODEL_NAME } from "../Models";
import { SearchBar, Layout, StockItem } from "../Components";

export default class SearchPage extends Component {
  static navigationOptions = {
    title: "Search",
    headerStyle: {
      backgroundColor: "#1E396D",
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResults: [],
      results: false
    };
  }

  handleSearch = text => {
    Realm.open({ schema: [StockSchema] }).then(realm => {
      if (text.length !== 0) {
        const result = realm
          .objects(MODEL_NAME)
          .filtered(`name CONTAINS "${text}" OR symbol CONTAINS "${text}"`);
        this.setState({ searchResults: result, query: text });
      } else {
        this.setState({ searchResults: [], query: text });
      }
    });
  };

  renderHeader = () => {
    return (
      <View style={styles.searchCon}>
        <SearchBar
          autoFocus
          customs={{ flex: 1 }}
          onChangeText={text => this.handleSearch(text)}
          placeholder="Find Stocks..."
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { searchResults, query } = this.state;
    return (
      <Layout>
        <FlatList
          data={searchResults}
          ListEmptyComponent={() => (
            <Text style={{ color: "#fff", padding: 40, textAlign: "center" }}>
              {query.length
                ? "No results found"
                : "Start typing on the search bar to see results"}
            </Text>
          )}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => <StockItem data={item} />}
          keyExtractor={(item, index) => item.name}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  searchCon: {
    // marginTop: 8,
    flexDirection: "row",
    marginBottom: 10
  },
  listContainer: {
    marginTop: 10,
    backgroundColor: "#1e2124",
    borderRadius: 25,
    flexGrow: 0,
    paddingVertical: 10
  },
  btn: {
    marginTop: 18,
    marginHorizontal: 10
  },
  cancel: {
    color: "#fff",
    fontSize: 14
  }
});
