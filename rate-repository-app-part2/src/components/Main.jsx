import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SingIn from "./SignIn";

const styles = StyleSheet.create({
  constainer: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.constainer}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SingIn />} />
      </Routes>
    </View>
  );
};

export default Main;
