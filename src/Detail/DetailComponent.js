import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { withNavigation } from "react-navigation";
import { Layout, DetailItem } from "../Components";
import axios from "axios";
import { TOKEN, TEST_URL, PROD_URL } from "../API";

class DetailComponent extends Component {
  static navigationOptions = {
    title: "Detail",
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
      data: {},
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    const symbol = this.props.navigation.getParam("symbol", "No symbol");
    axios
      .get(`https://${PROD_URL}/stock/${symbol}/quote?token=${TOKEN}`)
      .then(response => {
        this.setState({ data: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  renderError = () => {
    return (
      <View>
        <Text style={{ color: "#000" }}>
          Please check your internet connection
        </Text>
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.loadCon}>
        <Text style={styles.loadTitle}>Fetching Data...</Text>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  };

  renderContent = () => {
    const { data } = this.state;
    return (
      <>
        <View style={styles.titleCon}>
          <Text style={styles.symbol}>{data.symbol}</Text>
          <Text style={styles.company}>{data.companyName}</Text>
        </View>
        <View style={{ flex: 6, marginHorizontal: 25 }}>
          <Text style={styles.stats}>Stats</Text>
          <View style={styles.seperator} />
          <DetailItem title="Open" value={data.open} />
          <DetailItem title="High" value={data.high} />
          <DetailItem title="Low" value={data.low} />
          <DetailItem title="52 wk High" value={data.week52High} />
          <DetailItem title="52 wk Low" value={data.week52Low} />
          <DetailItem title="Volume" value={data.latestVolume} />
          <DetailItem title="Avg. Total" value={data.avgTotalVolume} />
          <DetailItem title="Market Cap" value={data.marketCap} />
          <View style={styles.seperator} />
        </View>
      </>
    );
  };

  render() {
    const { error, loading } = this.state;
    let content;
    if (error) {
      content = this.renderError();
    } else if (loading) {
      content = this.renderLoading();
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
    margin: 8,
    fontWeight: "700"
  },
  symbol: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff"
  },
  titleCon: {
    flex: 1,
    margin: 10
  },
  company: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22
  },
  seperator: {
    marginVertical: 8,
    borderColor: "#fff",
    borderBottomWidth: 1
  },
  stats: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 18
  }
});

export default DetailComponent;
