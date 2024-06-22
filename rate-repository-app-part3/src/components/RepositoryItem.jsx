import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import theme from "../theme";
import RepositoryStats from "./RepositoryStats";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "#fff",
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "flex-start",
    padding: 3,
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", paddingBottom: 2 }}>
        <View style={{ paddingRight: 10 }}>
          <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">Description: {item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <RepositoryStats item={item} />
    </View>
  );
};

export default RepositoryItem;
