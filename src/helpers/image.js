import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import Animated from "react-native-reanimated";
import { Image } from "expo-image";

export const CachedImage = (props) => {
    const { uri } = props;

    return <Image source={uri} {...props} />;
};
