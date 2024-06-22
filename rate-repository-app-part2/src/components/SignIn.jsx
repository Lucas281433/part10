import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup'

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  login: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const SingIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('You must provide a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(3, 'Password is short, enter the correct password')
      .max(15, 'Password is long, enter the correct password')
      .required('Password is required')
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <View>
            <FormikTextInput name="email" placeholder="Email" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.login}>
              <Text style={styles.loginText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

export default SingIn;
