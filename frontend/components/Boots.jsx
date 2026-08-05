import ProductMainComp from "@/components/ProductMainComp";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { BOOTS } from "@/constants/endpoints";
import { View } from "react-native";

const Boots = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: BOOTS,
  });
  data = data?.boots;

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

export default Boots;
