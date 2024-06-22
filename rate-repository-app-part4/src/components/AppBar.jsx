import { View, StyleSheet, ScrollView, Text } from "react-native";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";
import theme from "../theme";
import useCurrentUser from "../hooks/useCurrentUser";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: theme.appBar.primary,
  },
});

const AppBar = () => {
  const includeReviews = false
  const { loading, error, user } = useCurrentUser(includeReviews);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab text="Repositories" route="/" />
        {user && <AppBarTab text="Create a Review" route="/createReview" />}
        {user && <AppBarTab text="My Reviews" route="/userReviews" />}
        {user && <AppBarTab text="Sign Out" route="/signout" />}
        {!user && <AppBarTab text="Sign In" route="/signin" />}
        {!user && <AppBarTab text="Sign Up" route="/createUser" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
