import React, { Component } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import Realm from "realm";
import { StockSchema, MODEL_NAME } from "./Models";
import { TOKEN, TEST_URL, PROD_URL } from "./API";
import { Layout } from "./Components";

export default class FetchingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false
    };
  }

  downloadStuff = () => {
    Realm.open({ schema: [StockSchema] })
      .then(realm => {
        if (realm.objects(MODEL_NAME).length === 0) {
          axios
            .get(
              `https://${PROD_URL}/ref-data/symbols?filter=symbol,name&token=${TOKEN}`
            )
            .then(response => {
              const { data } = response;
              realm.write(() =>
                data.forEach(obj => realm.create(MODEL_NAME, obj))
              );
              this.goHome();
            })
            .catch(error => this.setState({ error: true }));
        } else {
          this.goHome();
        }
      })
      .catch(error => this.setState({ error: true }));
  };

  goHome = () => {
    this.setState({ loading: false }, () =>
      this.props.navigation.navigate("Home")
    );
  };

  componentDidMount() {
    this.downloadStuff();
  }

  renderLoading = () => {
    return (
      <View style={styles.loadCon}>
        <Text style={styles.loadTitle}>Fetching Data...</Text>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  };

  renderError = () => {
    return (
      <View style={styles.loadCon}>
        <Text style={styles.loadTitle}>
          Please check your internet connection
        </Text>
      </View>
    );
  };

  renderContent = () => {
    return (
      <View style={styles.loadCon}>
        <Text style={styles.loadTitle}>Intializing Data...</Text>
      </View>
    );
  };

  render() {
    const { loading, error } = this.state;
    let content;
    if (loading) {
      content = this.renderLoading();
    } else if (error) {
      content = this.renderError();
    } else {
      content = this.renderContent();
    }
    return <Layout>{content}</Layout>;
  }
}

const styles = StyleSheet.create({
  loadCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadTitle: {
    color: "#fff",
    fontSize: 16,
    margin: 8
  }
});
