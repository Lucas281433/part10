import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import RepositoryDetail from "./RepositoryDetail";
import CreateReview from "./CreateReview";
import CreateUser from "./CreateUser";
import UserReviews from "./UserReviews";

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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repository/:id" element={<RepositoryDetail />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/userReviews" element={<UserReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
