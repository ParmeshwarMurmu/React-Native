import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    setToken(userToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken("");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={{ padding: 20, marginTop: "100px" }}>
      <TouchableOpacity
        onPress={() => {
          if (token) {
            logout();
          } else {
            router.push({
              pathname: "/login",
            });
          }
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
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
            }}
          >
            {token ? "Logout" : "Login"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
