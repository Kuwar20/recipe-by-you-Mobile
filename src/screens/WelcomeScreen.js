import { View, Text, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default function WelcomeScreen() {
    return (
        <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
            <StatusBar style="light" />
            {/* logo image with rings */}
            <View className="bg-white/20 rounded-full" style={{ padding: hp(5.5) }}>
                <View className="bg-white/20 rounded-full p-7" style={{ padding: hp(5) }}>
                    <Image
                        source={require("../../assets/images/welcome.png")}
                        style={{ width: hp(20), height: hp(20) }}
                    />
                </View>
            </View>
            {/* title and punchline */}
            <View className="flex items-center space-y-2">
                <Text style={{ fontSize: hp(7) }} className="font-bold text-white tracking-widest">
                    Recipe
                </Text>
                <Text style={{ fontSize: hp(2) }} className="font-medium text-white tracking-widest">
                    Food is always right
                </Text>
            </View>
        </View>
    );
}
