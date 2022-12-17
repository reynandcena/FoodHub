import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-5 justify-center items-center">
      <Image
        source={{
          uri: imgUrl,
        }}
        resizeMode="contain"
        className="h-20 w-20 rounded"
      />
      <Text className="text-center font-medium text-black mt-2">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
