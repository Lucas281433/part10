import { View, StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
});

const RepositoryStats = ({ item }) => {
  const parseK = (value) => {
    if (value > 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    } else {
      return value;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <Text textAlign="center" fontWeight="bold">
          {parseK(item.stargazersCount)}
        </Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text textAlign="center" fontWeight="bold">
          {parseK(item.forksCount)}
        </Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text textAlign="center" fontWeight="bold">
          {item.reviewCount}
        </Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text textAlign="center" fontWeight="bold">
          {item.ratingAverage}
        </Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;
