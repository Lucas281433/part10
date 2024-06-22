import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";

import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: theme.appBar.primary,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME)
  const user = data?.me ? data.me : null

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab text="Repositories" route="/" />
        {user ? (
          <AppBarTab text="Sign Out" route="/signout" />
        ) : (
          <AppBarTab text="Sign In" route="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
