import { StyleSheet, Image, FlatList, Alert } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Coffee {
  name: string;
  products: Product[];
}

export interface ProductJson {
  id: number;
  name: string;
  price: number;
  image: string;
}

class Product {
  id: number;
  name: string;
  price: number;
  image: string;

  constructor(id: number, name: string, price: number, image: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  get imageUrl() {
    return `https://manuelduarte077.github.io/CoffeeApp/coffeeapi/api/images/${this.image}`;
  }

  static fromJson(json: ProductJson): Product {
    return new Product(json.id, json.name, json.price, json.image);
  }
}

export default function MenuScreen() {
  const URL =
    "https://manuelduarte077.github.io/CoffeeApp/coffeeapi/api/menu.json";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erorr, setError] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const coffees = data.map((coffee: any) => {
          return {
            name: coffee.name,
            products: coffee.products.map((product: ProductJson) =>
              Product.fromJson(product)
            ),
          };
        });
        setProducts(coffees);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && (
        <FlatList
          data={products}
          keyExtractor={(item: Coffee) => item.name}
          stickyHeaderHiddenOnScroll={true}
          renderItem={({ item }) => (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#B89A9A",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                {item.name}
              </Text>
              <FlatList
                data={item.products}
                keyExtractor={(item: Product) => item.id.toString()}
                renderItem={({ item }) => (
                  <CardCoffe
                    id={item.id}
                    title={item.name}
                    price={item.price}
                    imageUri={item.imageUrl}
                  />
                )}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface CardCoffeProps {
  id?: number;
  imageUri: string;
  title: string;
  price: number;
}

export function CardCoffe(props: CardCoffeProps) {
  const addToCart = (product: Product) => {
    AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart) {
          const cartArray = JSON.parse(cart);
          cartArray.push(product);

          
          AsyncStorage.setItem("cart", JSON.stringify(cartArray));
        } else {
          AsyncStorage.setItem("cart", JSON.stringify([product]));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(product);

    Alert.alert("Product added to cart", product.name);
  };

  

  return (
    <View
      style={{
        marginHorizontal: 10,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#B89A9A",
        margin: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <Image
        source={{ uri: props.imageUri }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
          backgroundColor: "#B89A9A",
        }}
      >
        <View
          style={{
            backgroundColor: "#B89A9A",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
            }}
          >
            ${props.price}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="cart-plus"
          size={40}
          color="white"
          onPress={() =>
            addToCart(
              new Product(props.id!, props.title, props.price, props.imageUri)
            )
          }
        />
      </View>
    </View>
  );
}
