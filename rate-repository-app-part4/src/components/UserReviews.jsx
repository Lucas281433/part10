import { View, Text, FlatList } from "react-native";

import useCurrentUser from "../hooks/useCurrentUser";
import ReviewItem from "./ReviewItem";

const UserReviews = () => {
  const includeReviews = true;
  const { loading, error, user, refetch } = useCurrentUser(includeReviews);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const userReviewsNodes = user
    ? user.reviews?.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={userReviewsNodes}
      renderItem={({ item }) => (
        <ReviewItem
          item={item}
          keyExtractor={item.id}
          button="true"
          refetch={refetch}
        />
      )}
    />
  );
};

export default UserReviews;
