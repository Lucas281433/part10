import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";

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
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const RepositoryItem = ({ item, button }) => {
  const gitHubRepository = async () => {
    await Linking.openURL(item.url);
  };
  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {button === "true" ? (
        <TouchableOpacity style={styles.button} onPress={gitHubRepository}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
