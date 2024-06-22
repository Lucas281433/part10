import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutation";

const useCreateReviews = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const ceateReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: { repositoryName, ownerName, rating, text },
    });

    return data;
  };

  return [ceateReview, result];
};

export default useCreateReviews;
