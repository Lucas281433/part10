import { View, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";
import useRepository from "../hooks/useRepository";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#0366d6",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  buttonRepo: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  buttonRepoText: {
    color: "#fff",
    fontSize: 20,
  },
  buttonDelete: {
    backgroundColor: "#d73a4a",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  buttonDeleteText: {
    color: "#fff",
    fontSize: 20,
  },
});

const ReviewItem = ({ item, button, refetch }) => {
  const { repository } = useRepository(item.repositoryId);
  const [deleteReview] = useDeleteReview();
  const id = item.id;

  const date = new Date(item.createdAt)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");

  const handleRedirection = async () => {
    await Linking.openURL(repository.url);
  };

  const handleDeleteReview = async (id) => {
    if (Platform.OS === "android") {
      Alert.alert(
        "Delete Review",
        "Are you sure you want to delete this review?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("cancel"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              await deleteReview(id);
              refetch();
            },
            style: "destructive",
          },
        ]
      );
    } else if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this review?")) {
        await deleteReview(id);
        refetch();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {item.rating}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text fontWeight="bold">{item.user.username}</Text>
          <Text color="textSecondary">{date}</Text>
          <Text style={{ marginTop: 5 }}>{item.text}</Text>
        </View>
      </View>
      <View>
        {button === "true" ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={handleRedirection}
              style={styles.buttonRepo}
            >
              <Text style={styles.buttonRepoText}>View Repository</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteReview(id)}
              style={styles.buttonDelete}
            >
              <Text style={styles.buttonDeleteText}>Delete Review</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ReviewItem;
