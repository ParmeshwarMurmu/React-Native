import Loader from "@/components/Loader";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { SINGLE_PRODUCT } from "@/constants/endpoints";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Image, View } from "react-native";
// SINGLE_PRODUCT

const SinglePage = () => {
  const { id, category } = useLocalSearchParams();
  let {
    data = {},
    isdataLoading,
    errorMessage,
  } = useFetchCustomHook({
    api: `${SINGLE_PRODUCT}/${category}/${id}`,
  });
  data = data?.msg;
  const { width } = Dimensions.get("window");

  return (
    <View>
      {isdataLoading ? (
        <Loader />
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            alt="SingleProductImage"
            source={{
              uri: data?.images?.[0],
            }}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SinglePage;
