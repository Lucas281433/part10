import { useQuery } from "@apollo/client";
import { REPOSITORY_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
  const { loading, error, data, fetchMore, ...result } = useQuery(
    REPOSITORY_REVIEWS,
    {
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories,
        ...variables,
      },
    });
  };

  const reviews = data?.repository.reviews;

  return { reviews, loading, error, fetchMore: handleFetchMore, ...result };
};

export default useReviews;
