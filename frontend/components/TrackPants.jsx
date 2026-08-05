import useFetchCustomHook from "@/components/useFetchCustomHook";
import { TRACK_PANTS } from "@/constants/endpoints";
import ProductMainComp from "@/components/ProductMainComp";
import { View } from "react-native";

const TrackPants = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: TRACK_PANTS,
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

export default TrackPants;
