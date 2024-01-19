import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categoies from "../components/categories";
import Recipes from "../components/recipes";
import axios from "axios";


export default function HomeScreen() {
    const defaultCategory = "Side";
    const [activeCategory, setActiveCategory] = useState("Side");
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = category =>{
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    const handleSearch = async () => {
        try {
            if (!searchText.trim()) {
                // If search text is empty, reset to default category
                getRecipes(defaultCategory);
                setActiveCategory(defaultCategory);
            } else {
                // If searching, set activeCategory to null
                setActiveCategory(null);
                // Fetch recipes based on search text
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
                );
                if (response && response.data) {
                    setMeals(response.data.meals);
                }
            }
        } catch (error) {
            console.log("error", error.message);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/categories.php"
            );

            if (response && response.data) {
                // Get the categories from the API response
                const categories = response.data.categories;

                // Sort the categories array to bring "Pasta" to the front,
                // and move "Goat," "Pork," "Beef," and "Lamb" to the end
                const sortedCategories = [...categories].sort((a, b) => {
                    const order = {
                        Side: -4,
                        Seafood: -3,
                        Pasta: -1,
                        Dessert:-1,
                        Chicken: 0,
                        Goat: 1,
                        Pork: 1,
                        Beef: 1,
                        Lamb: 1,
                        Miscellaneous: 1,
                    };

                    return (order[a.strCategory] || 0) - (order[b.strCategory] || 0);
                });

                // Set the state with the sorted categories
                setCategories(sortedCategories);
            }
        } catch (error) {
            console.log("error", error.message);
        }
    };

    const getRecipes = async (category = "Side") => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            //console.log("response", response.data);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (error) {
            console.log("error", error.message);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-14"
            >
                {/* avatar and bell icon */}
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image
                        source={require("../../assets/images/avatar.png")}
                        style={{ height: hp(5), width: hp(5.5) }}
                    />
                    <BellIcon size={hp(4)} color="gray" />
                </View>
                {/* welcome text */}
                <View className="mx-4 space-y-2 mb-2">
                    <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
                        Hello, Kuwar!
                    </Text>
                    <View>
                        <Text
                            style={{ fontSize: hp(3.8) }}
                            className="font-semibold"
                            text-neutral-600
                        >
                            Make your own food,
                        </Text>
                    </View>
                    <Text
                        style={{ fontSize: hp(3.8) }}
                        className="font-semibold"
                        text-neutral-600
                    >
                        stay at <Text className="text-amber-400">home</Text>
                    </Text>
                </View>
                {/* search box */}
                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput
                        placeholder="Search any recipe"
                        placeholderTextColor={"gray"}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch} className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.5)} strokewidth={3} color="gray" />
                    </TouchableOpacity>
                </View>
                {/* categories */}
                <View>
                    {categories.length > 0 && (
                        <Categoies
                            categories={categories}
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                        />
                    )}
                </View>
                {/* recipes */}
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView>
        </View>
    );
}
