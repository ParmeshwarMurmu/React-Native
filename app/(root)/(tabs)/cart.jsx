import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const screenHeight = Dimensions.get("window").height;

const Cart = () => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    setToken(userToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView>
      {token ? (
        <Text>CARTING</Text>
      ) : (
        <View
          style={{
            height: screenHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="shopping-cart" size={60} color="black" />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                Opps Seems Like you are not Loged In
              </Text>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#C6F6D5", "#38A169"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                  }}
                >
                  {/* <Text
                    style={{
                      fontSize: 25, // Increase the font size
                      width: 200,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    Login
                  </Text> */}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
