import { View, Text } from "react-native";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import ReviewList from "./ReviewList";
import useRepository from "../hooks/useRepository";

const RepositoryDetail = () => {
  const id = useParams().id;

  const { loading, error, repository } = useRepository(id)

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );

  return (
    <View>
      <RepositoryItem item={repository} button="true" />
      <ReviewList id={id} />
    </View>
  );
};

export default RepositoryDetail;
