import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";

const Cart = () => {
  const token = await SecureStore.getItemAsync("token")
  console.log("TOKEN", token);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>CART</Text>
    </View>
  );
};

export default Cart;
