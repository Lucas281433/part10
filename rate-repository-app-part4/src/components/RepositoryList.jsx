import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleId = (item) => {
    navigate(`/repository/${item.id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleId(item)}>
          <RepositoryItem item={item} keyExtractor={item.id} button="false" />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState();
  const [text, setText] = useState();
  const [searchKeyword] = useDebounce(text, 500);
  const { repositories, loading, error, fetchMore } = useRepositories({
    first: 13,
    orderBy,
    orderDirection,
    searchKeyword,
  });

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

  const onChangeText = (value) => {
    setText(value);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      <Searchbar
        onChangeText={onChangeText}
        value={text}
        style={{ borderRadius: 0 }}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => {
          setSelectedOrder(itemValue);
          if (itemValue === "CREATED_AT") {
            setOrderBy("CREATED_AT");
            setOrderDirection();
          }
          if (itemValue === "RATING_AVERAGE_ASC") {
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("ASC");
          }
          if (itemValue === "RATING_AVERAGE_DESC") {
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("DESC");
          }
        }}
        prompt="Select an Item..."
      >
        <Picker.Item label="Latest Repositories" value="CREATED_AT" />
        <Picker.Item
          label="Highest Rated Repositories"
          value="RATING_AVERAGE_ASC"
        />
        <Picker.Item
          label="Lowest Rated Repositories"
          value="RATING_AVERAGE_DESC"
        />
      </Picker>
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryList;
