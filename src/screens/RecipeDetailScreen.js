import { View, Text, ScrollView, StatusBar, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CachedImage } from '../helpers/image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon, ClockIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import YouTubeIframe from 'react-native-youtube-iframe';



export default function RecipeDetailScreen(props) {
    let item = props.route.params;

    //console.log(props.route.params);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMealData(item.idMeal);
    }, [])

    const getMealData = async (id) => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            //console.log("got meal data:", response.data);
            if (response && response.data) {
                setMeals(response.data.meals[0]);
                setLoading(false);
            }
        } catch (error) {
            console.log("error", error.message);
        }
    };

    const ingredientsIndexes = (meals) => {
        if (!meals) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meals['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    const handleOpenLink = url=>{
        Linking.openURL(url);
    }

    return (
        <ScrollView
            className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style={"light"} />
            {/* recipe image */}
            <View className="flex-row justify-center">
                <CachedImage
                    uri={item.strMealThumb}
                    sharedTransitionTag={item.strMeal}
                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: 5, // set for your device
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        //marginTop: 4,
                    }}
                />
            </View>
            {/* back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full mr-5 bg-white">
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>
            {/* meal description */}
            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8 ">
                        {/* name and area*/}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                                {meals?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                                {meals?.strArea}
                            </Text>
                        </Animated.View>
                        {/* misc */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{
                                        width: hp(6.5),
                                        height: hp(6.5)
                                    }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.4) }} className="font-bold text-neutral-700">
                                        Mins
                                    </Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{
                                        width: hp(6.5),
                                        height: hp(6.5)
                                    }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                        3
                                    </Text>
                                    <Text style={{ fontSize: hp(1.4) }} className="font-bold text-neutral-700">
                                        Servings
                                    </Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{
                                        width: hp(6.5),
                                        height: hp(6.5)
                                    }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.4) }} className="font-bold text-neutral-700">
                                        Cal
                                    </Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{
                                        width: hp(6.5),
                                        height: hp(6.5)
                                    }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                    </Text>
                                    <Text style={{ fontSize: hp(1.4) }} className="font-bold text-neutral-700">
                                        Easy
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>
                        {/* ingredients */}
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                Ingredients
                            </Text>
                            <View className="space-y-2 ml-3">
                                {
                                    ingredientsIndexes(meals).map(i => {
                                        return (
                                            <View key={i} className="flex-row items-center space-x-4">
                                                <View style={{ height: hp(1.5), width: hp(1.5) }}
                                                    className="bg-amber-300 rounded-full" />
                                                <View className="flex-row space-x-2">
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-700">{meals['strMeasure' + i]}</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">{meals['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                        {/* instructions */}
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                                {
                                    meals?.strInstructions
                                }
                            </Text>
                        </Animated.View>

                        {/* recipe video */}
                        {
                        meals.strYoutube && (
                            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                                <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                    Recipe Video
                                </Text>
                                <View>
                                    {/* YoutubeIfram uses webview and it does not work properly on android (until its fixed we'll just show the video on ios) */}
                                    {
                                        Platform.OS === 'ios'? (
                                            <YouTubeIframe
                                                webViewProps={{
                                                    overScrollMode: "never" // a fix for webview on android - which didn't work :(
                                                }}
                                                videoId={getYoutubeVideoId(meals.strYoutube)}
                                                height={hp(30)}
                                            />
                                        ):(
                                            <TouchableOpacity className="mb-5" onPress={()=> handleOpenLink(meals.strYoutube)}>
                                                <Text className="text-blue-600" style={{fontSize: hp(2)}}>{meals.strYoutube}</Text>
                                            </TouchableOpacity>
                                            
                                        )
                                    }
                                    
                                </View>
                            </Animated.View>
                        )
                    }

                    </View>
                )
            }
        </ScrollView>
    )
}