import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { CASUAL_SHOES } from "@/constants/endpoints";
import { View } from "react-native";

const CasualShoes = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: CASUAL_SHOES,
  });
  data = data?.casualShoes;

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

export default CasualShoes;
