import { View, StyleSheet, Text, FlatList } from "react-native";

import useReviews from "../hooks/useReviews";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ id }) => {
  const { reviews, loading, error, fetchMore } = useReviews({
    first: 10,
    id
  });

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

  const reviewsNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem item={item} keyExtractor={item.id} button="false" />
      )}
      onEndRreached={onEndReach}
      onEndRreachedThreshold={0.5}
    />
  );
};

export default ReviewList;
