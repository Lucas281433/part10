import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const styles = StyleSheet.create({
  signUp: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  signUpText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const CreateUser = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(30, "Username must be less than 30 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("Password Confirmation is required"),
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const newUser = await createUser({
        username,
        password,
      });

      if (newUser) {
        await signIn({ username, password });
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              secureTextEntry
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.signUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateUser;
