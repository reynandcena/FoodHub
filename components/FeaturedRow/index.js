import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import sanityClient from "../../sanity";
import RestaurantCard from "../RestaurantCard";

const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <Ionicons name="arrow-forward-outline" color="#E33342" size={24} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            id={restaurant._id}
            name={restaurant.name}
            short_description={restaurant.short_description}
            image={restaurant.image}
            lat={restaurant.lat}
            long={restaurant.long}
            address={restaurant.address}
            category={restaurant.type?.name}
            rating={restaurant.rating}
            dishes={restaurant.dishes}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
