import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutation";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    return { username, password };
  };

  return [signIn, result];
};

export default useSignIn;
