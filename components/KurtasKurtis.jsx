import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { KURTAS_KURTIS } from "@/constants/endpoints";
import { memo } from "react";
import { View } from "react-native";

const KurtasKurtis = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: KURTAS_KURTIS,
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

export default memo(KurtasKurtis);
