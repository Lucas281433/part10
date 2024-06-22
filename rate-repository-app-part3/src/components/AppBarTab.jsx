import { StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.appBar.textPrimary,
    padding: 10,
  },
});

const AppBarTab = ({ text, route }) => {
  
  return (
    <Pressable>
      <Link to={route}>
        <Text fontWeight="bold" style={styles.text}>
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
