// import { Skeleton } from "@rneui/themed";
import { router } from "expo-router";
import { memo } from "react";
import { ScrollView, View } from "react-native";
import CardList from "./Card";
import Loader from "./Loader";

const ProductMainComp = ({ data, isdataLoading, category }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isdataLoading && <Loader />}
        <View style={{ flexDirection: "row" }}>
          {data?.length &&
            data.map((item, index) => {
              return (
                <CardList
                  item={item}
                  key={item._id}
                  style={{
                    width: 120,
                    height: 120,
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
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(ProductMainComp);
