import Loader from "@/components/Loader.jsx";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("window").height;

const Cart = () => {
  const [token, setToken] = useState("");
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    setToken(userToken);
  };

  const getUserCartData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://e-cart-5jh7.onrender.com/user/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();
      setCartData(resData?.cart);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCartData();
    }
  }, [token]);

  return (
    <SafeAreaView style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
      {token ? (
        <View>
          {isLoading ? (
            <View
              style={{
                height: screenHeight,
                justifyContent: "center",
              }}
            >
              <Loader />
            </View>
          ) : (
            <View>
              <Text
                style={{ textAlign: "center", marginBottom: 20, fontSize: 18 }}
              >
                Items In You Cart
              </Text>
              <FlatList
                data={cartData}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    key={item._id}
                    style={{
                      marginBottom: 15,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        alt="Images"
                        source={{
                          uri:
                            item?.mensProduct?.images[0] ||
                            item?.womensProduct?.images[0] ||
                            item?.shoesProduct?.images[0],
                        }}
                        style={{
                          width: 120,
                          height: 120,
                        }}
                      />
                      <View style={{ paddingLeft: 15 }}>
                        <Text>
                          {(
                            item?.mensProduct?.title ||
                            item?.womensProduct?.title ||
                            item?.shoesProduct?.title ||
                            ""
                          )
                            .split(" ")
                            .slice(0, 4)
                            .join(" ") +
                            ((
                              item?.mensProduct?.title ||
                              item?.womensProduct?.title ||
                              item?.shoesProduct?.title ||
                              ""
                            ).split(" ").length > 10
                              ? "..."
                              : "")}
                        </Text>
                        <Text style={{ marginTop: 5 }}>Quantity : 1 </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                          }}
                        >
                          <Text style={{ marginRight: 5 }}>Price : </Text>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                            }}
                          >
                            <FontAwesome
                              name="rupee"
                              size={18}
                              color="black"
                              style={{ marginRight: 5 }}
                            />
                            <Text>
                              {item?.mensProduct?.price ||
                                item?.womensProduct?.price ||
                                item?.shoesProduct?.price}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: "row",
                          }}
                        >
                          <Ionicons
                            name="add-circle-sharp"
                            size={24}
                            color="green"
                            style={{ marginRight: 20 }}
                          />
                          <AntDesign name="delete" size={24} color="red" />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
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
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/login",
                  });
                }}
              >
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
                  <Text
                    style={{
                      fontSize: 25, // Increase the font size
                      width: 200,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    Login
                  </Text>
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
