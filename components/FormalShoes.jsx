import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { FORMAL_SHOES } from "@/constants/endpoints";
import { View } from "react-native";

const FormalShoes = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: FORMAL_SHOES,
  });
  data = data?.formalShoes;

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

export default FormalShoes;
