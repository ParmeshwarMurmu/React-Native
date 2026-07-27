import useFetchCustomHook from "@/components/useFetchCustomHook";
import ProductMainComp from "@/components/ProductMainComp";
import { SAREE } from "@/constants/endpoints";
import { View } from "react-native";

const Saree = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: SAREE,
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

export default Saree;
