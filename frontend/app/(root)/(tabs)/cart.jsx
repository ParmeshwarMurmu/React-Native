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
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RazorpayCheckout from "react-native-razorpay";
import { ORDERS } from "@/constants/endpoints.js";

const screenHeight = Dimensions.get("window").height;

const Cart = () => {
  const [token, setToken] = useState("");
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    totalItem: 0,
    totalPrice: 3000,
  });

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

  const getTotalPriceItem = () => {
    const initialValues = {
      totalItem: 0,
      totalPrice: 0,
    };
    const totalAmount = cartData.reduce((prev, item) => {
      const price =
        item?.mensProduct?.price ||
        item?.womensProduct?.price ||
        item?.shoesProduct?.price ||
        0;
      return {
        totalPrice: prev.totalPrice + price,
        totalItem: prev.totalItem + item.quantity,
      };
    }, initialValues);
    setItemDetails(totalAmount);
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const payload = {
        products: cartData,
        totalAmount: itemDetails.totalPrice,
        userDetail: {
          address: "Malik PG, Islampr Colony, Islampur, Gurugram",
          district: "677878",
          email: "murmuparmeshwar05@gmail.com",
          paymentMode: "Online",
          pincode: "122001",
          state: "Haryana",
        },
      };
      const orderRes = await fetch(ORDERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify(payload),
        },
      });

      // const totalAmount = cartData.reduce((sum, item) => {
      //   const price =
      //     item?.mensProduct?.price ||
      //     item?.womensProduct?.price ||
      //     item?.shoesProduct?.price ||
      //     0;
      //   return sum + price;
      // }, 0);
      // 1. Create order on backend
      const response = await fetch("http://10.0.2.2:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: itemDetails.totalPrice }),
      });
      const order = await response.json();
      // 2. Open Razorpay checkout
      const options = {
        description: "Payment for cart items",
        image:
          "https://e-cart-blue.vercel.app/static/media/ECart.2e87f26d610f15288a8c.png",
        currency: order.currency,
        key: "rzp_test_TM3N8Nods65OcQ", // Replace with your test key ID
        amount: order.amount,
        order_id: order.id,
        name: "E Cart",
        prefill: {
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2b59ffff" },
      };

      // const RazorpayCheckout = require("react-native-razorpay").default;
      RazorpayCheckout.open(options)
        .then((data) => {
          alert("Order has been Place Successfully");
        })
        .catch((error) => {
          console.log("Payment Error:", error);
          alert("Payment Failed");
        });
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong");
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

  useEffect(() => {
    if (cartData.length) {
      getTotalPriceItem();
    }
  }, [cartData]);

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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {cartData?.length ? (
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        marginBottom: 20,
                        fontSize: 18,
                      }}
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
                              <Text style={{ marginTop: 5 }}>
                                Quantity : 1{" "}
                              </Text>

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
                                <AntDesign
                                  name="delete"
                                  size={24}
                                  color="red"
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                    <View style={{ marginBottom: 10 }}>
                      <Text style={{ fontSize: 20 }}>Billing Details</Text>
                      <Text style={{ fontSize: 16 }}>
                        Total Quantity : {itemDetails?.totalItem}
                      </Text>
                      <Text style={{ fontSize: 16 }}>
                        Total Price : ₹ {itemDetails?.totalPrice}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={handlePayment}
                      disabled={isLoading}
                    >
                      <LinearGradient
                        colors={["#f6d7c6", "#faf71c"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          paddingVertical: 15,
                          paddingHorizontal: 30,
                          borderRadius: 10,
                          alignItems: "center",
                        }}
                      >
                        {isLoading ? (
                          <ActivityIndicator color="white" />
                        ) : (
                          <Text
                            style={{
                              color: "black",
                              display: "flex",
                              alignItems: "center",
                              alignContent: "center",
                              fontSize: 25,
                            }}
                          >
                            Payment
                          </Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 700,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      No Item In Your Cart
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
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
