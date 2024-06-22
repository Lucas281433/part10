import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup'
import { useNavigate } from "react-router-native";

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

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

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
  })

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await signIn({
        username, password
      })
      navigate('/')
     /*const user = new AuthStorage()
      await user.setAccessToken(data.authenticate.accessToken)
      console.log(user)
      console.log(await user.getAccessToken())
      setTimeout(async () => {
        await user.removeAccessToken()
        console.log(await user.getAccessToken())
      }, 10000)*/
      //console.log(data.authenticate.accessToken)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
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

export default SignIn;
