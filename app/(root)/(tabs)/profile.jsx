import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
// import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={{ padding: 20, marginTop: "100px" }}>
      <TouchableOpacity
        // style={{
        //   height: 50,
        //   borderWidth: 2,
        //   borderColor: "grey",
        //   borderRadius: 5,
        //   padding: 10,
        //   alignItems: "center",
        //   justifyContent: "center",
        //   backgroundColor: "red",
        //   marginTop: 20,
        // }}
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
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25, // Increase the font size
            }}
          >
            Login
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
