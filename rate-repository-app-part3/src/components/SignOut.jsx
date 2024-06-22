import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
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
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View>
      <Pressable>
        <TouchableOpacity style={styles.signOut} onPress={signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

export default SignOut;
