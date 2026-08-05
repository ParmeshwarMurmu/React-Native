import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { FORMAL_SHIRTS } from "@/constants/endpoints";
import { memo } from "react";
import { View } from "react-native";

const FormalShirts = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: FORMAL_SHIRTS,
  });
  data = data?.category;

  return (
    <View>
      <ProductMainComp
        data={data}
        isdataLoading={isdataLoading}
        category={"men"}
      />
    </View>
  );
};

export default memo(FormalShirts);
