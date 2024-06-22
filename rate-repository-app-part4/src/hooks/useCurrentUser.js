import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (includeReviews) => {
  const { loading, error, data, refetch } = useQuery(CURRENT_USER, {
    variables: { includeReviews }
  });

  const user = data?.me
  return { loading, error, user, refetch };
};

export default useCurrentUser;
