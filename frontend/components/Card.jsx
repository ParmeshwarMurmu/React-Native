import { Image, TouchableOpacity, View } from "react-native";

const CardList = ({ item, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 20 }}>
        <Image
          alt="Images"
          source={{
            uri: item["images"][0],
          }}
          style={style}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardList;
