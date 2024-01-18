import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from "../constants/index";

export default function Recipes() {
    return (
        <View className="mx-4 space-y-3">
            <Text
                style={{ fontSize: hp(3) }}
                className="font-semibold text-neutral-600"
            >
                Recipes
            </Text>
            <View>
                <MasonryList
                    data={mealData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
                    //refreshing={isLoadingNext}
                    //onRefresh={() => refetch({ first: ITEM_CNT })}
                    onEndReachedThreshold={0.1}
                //onEndReached={() => loadNext(ITEM_CNT)}
                />
            </View>
        </View>
    );
}

const RecipeCard = ({ item, index }) => {
    return (
        <View>
            <Pressable
                style={{ width: "100%" }}
                className="flex justify-center mb-4 space-y-1"
            >
                <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: hp(35) }}
                    className="bg-black/5"
                />
            </Pressable>
        </View>
    )
}
