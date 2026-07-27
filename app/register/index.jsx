import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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

const Register = () => {
  const [registerCredentials, setRegisterCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChnage = ({ value, key }) => {
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
    setRegisterCredentials((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleValidations = () => {
    let errors = {};
    if (!registerCredentials.firstName) {
      errors.firstName = 1;
    }
    if (!registerCredentials.lastName) {
      errors.lastName = 1;
    }
    if (!registerCredentials.email) {
      errors.email = 1;
    }
    if (!registerCredentials.password) {
      errors.password = 1;
    }
    setErrors(errors);
    return errors;
  };

  const register = async () => {
    if (Object.keys(handleValidations()).length) {
      showSnackBar("Mandatory Fields are required", "error", setSnackBar);
    } else {
      try {
        setIsLoading(true);
        const result = await fetch(
          "https://e-cart-5jh7.onrender.com/user/register",
          {
            method: "POST",
            body: JSON.stringify(registerCredentials),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const res = await result.json();
        if (res.msg === "Registered Successfully") {
          showSnackBar(res.msg, "success", setSnackBar);
          router.push({
            pathname: "/login",
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
      <Text style={{ fontSize: 30 }}>Register</Text>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", marginRight: 15 }}>
          <Text style={{ fontSize: 18 }}>First Name</Text>
          <Text style={{ color: "red", fontSize: 16 }}>*</Text>
        </View>
        <TextInput
          placeholder="Enter Your Firts Name"
          onChangeText={(text) => {
            handleChnage({ value: text, key: "firstName" });
          }}
          editable={!isLoading}
          style={{
            borderWidth: 1,
            borderColor: errors?.firstName ? "red" : "#ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            flex: 1,
          }}
        />
      </View>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", marginRight: 15 }}>
          <Text style={{ fontSize: 18 }}>Last Name</Text>
          <Text style={{ color: "red", fontSize: 16 }}>*</Text>
        </View>
        <TextInput
          editable={!isLoading}
          placeholder="Enter Your Last Name"
          style={{
            borderWidth: 1,
            borderColor: errors?.lastName ? "red" : "#ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            flex: 1,
          }}
          onChangeText={(text) => {
            handleChnage({ value: text, key: "lastName" });
          }}
        />
      </View>
      <View>
        <View style={{ flexDirection: "row", marginLeft: 6, marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>Email</Text>
          <Text style={{ color: "red", fontSize: 16 }}>*</Text>
        </View>
        <TextInput
          editable={!isLoading}
          placeholder="Enter Your Email"
          style={{
            borderWidth: 1,
            borderColor: errors?.email ? "red" : "#ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
          }}
          onChangeText={(text) => {
            handleChnage({ value: text, key: "email" });
          }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 6,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Password</Text>
          <Text style={{ color: "red", fontSize: 16 }}>*</Text>
        </View>
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
            editable={!isLoading}
            placeholder="Enter Your Password"
            secureTextEntry={!showPassword}
            style={{
              borderWidth: 1,
              borderColor: errors?.password ? "red" : "#ccc",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              width: 330,
            }}
            onChangeText={(text) => {
              handleChnage({ value: text, key: "password" });
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
        onPress={register}
        disabled={isLoading}
        style={{
          borderRadius: 5,
          marginTop: 20,
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
              Register
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={{ marginRight: 5, fontSize: 15 }}>Already Register ?</Text>
        <Text
          onPress={() => router.push("/login")}
          style={{
            color: "blue",
            textDecorationLine: "underline",
            fontSize: 15,
          }}
        >
          Login
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

export default Register;
