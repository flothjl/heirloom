import React from "react";
import { ActivityIndicator, View } from "react-native";

function HeirloomLoader({ size, color }) {
  const _size = size ? size : "large";
  const _color = color ? color : "#2196F3";
  return (
    <View>
      <ActivityIndicator color={_color} size={_size}></ActivityIndicator>
    </View>
  );
}

export default HeirloomLoader;
