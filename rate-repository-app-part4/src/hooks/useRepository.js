import { useQuery } from "@apollo/client";
import { REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { loading, error, data } = useQuery(REPOSITORY, {
    variables: { id },
  });

  const repository = data?.repository;

  return { loading, error, repository };
};

export default useRepository;
