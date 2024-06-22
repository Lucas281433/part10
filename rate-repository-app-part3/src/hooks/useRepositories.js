import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { View } from 'react-native'

const useRepositories = () => {

  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })
  
  if (result.loading) {
    return (
      <View>Loading...</View>
    )
  }

  const repositories = result.data.repositories

  return { repositories, result }
};

export default useRepositories;
