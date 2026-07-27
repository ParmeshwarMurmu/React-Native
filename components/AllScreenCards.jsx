import { router } from "expo-router";
import { Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardList from "./Card";

const { width } = Dimensions.get("window");
console.log("WINDOW WIDTH", width);

const gap = 8;
const itemSize = (width - gap * 4) / 3;

const AllScreenCards = ({ data, category }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        numColumns={3}
        contentContainerStyle={{ padding: gap }}
        columnWrapperStyle={{ gap: gap, marginBottom: gap }}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, alignItems: "center" }}>
              <CardList
                item={item}
                style={{
                  width: itemSize,
                  height: itemSize,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/singlePage/[id]",
                    params: {
                      id: item._id,
                      category,
                    },
                  })
                }
              />
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default AllScreenCards;
