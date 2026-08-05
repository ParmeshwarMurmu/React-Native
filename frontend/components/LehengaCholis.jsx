import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { LEHENGA_CHOLIS } from "@/constants/endpoints";
import { memo } from "react";
import { View } from "react-native";

const LehengaCholis = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: LEHENGA_CHOLIS,
  });
  data = data?.data;

  return (
    <View>
      <ProductMainComp
        data={data}
        isdataLoading={isdataLoading}
        category={"women"}
      />
    </View>
  );
};

export default memo(LehengaCholis);
