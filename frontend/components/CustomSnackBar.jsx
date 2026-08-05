import { Text } from "react-native";
import { Snackbar } from "react-native-paper";

const CustomSnackBar = ({
  visible,
  onDismiss,
  duration,
  message,
  type = "success",
}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={{
        backgroundColor: type === "success" ? "#2E7D32" : "#D32F2F",
      }}
      wrapperStyle={{
        position: "absolute",
        top: 50,
        right: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
        }}
      >
        {message}
      </Text>
    </Snackbar>
  );
};

export default CustomSnackBar;
