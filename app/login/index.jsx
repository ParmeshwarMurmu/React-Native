import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSnackBar from "../../components/CustomSnackBar";
import { showSnackBar } from "../../constants/additionalConstants";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // Snack Bar
  const [snackBar, setSnackBar] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ value, key }) => {
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
    setLoginCredentials((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleLogin = async () => {
    let errors = {};
    if (!loginCredentials.email) {
      errors.email = 1;
    }
    if (!loginCredentials.password) {
      errors.password = 1;
    }
    if (Object.keys(errors).length) {
      setErrors(errors);
      showSnackBar("Mandatory Fields are required", "error", setSnackBar);
    } else {
      try {
        setIsLoading(true);
        const result = await fetch(
          "https://e-cart-5jh7.onrender.com/user/login",
          {
            method: "POST",
            body: JSON.stringify(loginCredentials),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const res = await result.json();
        if (res.msg === "LogIn successfull") {
          //token Set using Secure Store as Expo
          await SecureStore.setItemAsync("token", res.token);
          showSnackBar(res.msg, "success", setSnackBar);
          router.push({
            pathname: "/All",
          });
        } else {
          showSnackBar(res.msg, "error", setSnackBar);
        }
      } catch (error) {
        showSnackBar(error.msg, "error", setSnackBar);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#dbeaf9",
      }}
    >
      <Text style={{ fontSize: 30 }}>Login</Text>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Email</Text>
        <TextInput
          placeholder="Enter Your Email"
          editable={!isLoading}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 18,
            borderColor: errors?.email ? "red" : "#ccc",
          }}
          value={loginCredentials.email}
          onChangeText={(text) => {
            handleChange({
              value: text,
              key: "email",
            });
          }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Password</Text>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: errors?.password ? "red" : "#ccc",
            borderRadius: 8,
            borderColor: 0,
          }}
        >
          <TextInput
            placeholder="Enter Your Password"
            editable={!isLoading}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              borderColor: errors?.password ? "red" : "#ccc",
              width: 330,
            }}
            secureTextEntry={!showPassword}
            value={loginCredentials.password}
            onChangeText={(text) => {
              handleChange({
                value: text,
                key: "password",
              });
            }}
          />
          <Ionicons
            style={{ marginTop: 10, marginLeft: 10 }}
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
            onPress={() => setShowPassword((prev) => !prev)}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={isLoading}
        style={{
          borderRadius: "5",
          marginTop: "20",
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
              Login
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={{ marginTop: "20", flexDirection: "row" }}>
        <Text style={{ marginRight: "5", fontSize: 15 }}>New User ? </Text>
        <Text
          onPress={() => router.push("/register")}
          style={{
            color: "blue",
            textDecorationLine: "underline",
            fontSize: 15,
          }}
        >
          Register
        </Text>
      </View>

      <CustomSnackBar
        visible={snackBar.visible}
        onDismiss={() =>
          setSnackBar((prev) => ({
            ...prev,
            visible: false,
          }))
        }
        duration={3000}
        message={snackBar.message}
        type={snackBar.type}
      />
    </SafeAreaView>
  );
};

export default Login;
