import AllScreenCards from "@/components/AllScreenCards";
import useFetchCustomHook from "@/components/useFetchCustomHook";
import { MEN_ALL_CATEGORY } from "@/constants/endpoints";
import { SafeAreaView } from "react-native-safe-area-context";

const MenAll = () => {
  let { data, isdataLoading, errorMessage } = useFetchCustomHook({
    api: MEN_ALL_CATEGORY,
  });
  data = data?.data;
  console.log("ALL MEN DATA", data);

  return (
    <SafeAreaView>
      <AllScreenCards data={data} category={"men"} />
    </SafeAreaView>
  );
};

export default MenAll;
