import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { FLAT_SHOES } from "@/constants/endpoints";
import { View } from "react-native";

const FlatShoes = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: FLAT_SHOES,
  });
  data = data?.flatShoes;

  return (
    <View>
      <ProductMainComp
        data={data}
        isdataLoading={isdataLoading}
        category={"shoe"}
      />
    </View>
  );
};

export default FlatShoes;
