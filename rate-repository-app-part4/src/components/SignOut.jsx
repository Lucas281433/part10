import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from "react-native";
import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  signOut: {
    backgroundColor: "#d73a4a",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  signOutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const SignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    if (Platform.OS === "android") {
      Alert.alert("Sign Out", "Are you sure you want to sign out?", [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: async () => {
            await authStorage.removeAccessToken();
            apolloClient.resetStore();
            navigate("/");
          },
          style: "destructive",
        },
      ]);
    } else if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to sign out?")) {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate("/");
      }
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOut;
