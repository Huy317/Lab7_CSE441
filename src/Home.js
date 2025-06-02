import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { storage } from "./Storage";

const Home = ({navigation}) => {

    const [services, setServices] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://kami-backend-5rs0.onrender.com/services");
            const data = await response.json();
            console.log("Data fetched from API:", data);
            storage.set("services", JSON.stringify(data));
            setServices(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    useEffect(() => {
        const storedServices = storage.getString("services");
        if (storedServices) {
            console.log("Data fetched from storage:", JSON.parse(storedServices));
            setServices(JSON.parse(storedServices));
        } else {
            fetchData();
        }
    }, []);

    const Item = ({ service }) => {
        return (
            <TouchableOpacity
                style={styles.itemRow}
                onPress={() => {
                    navigation.navigate("Detail",{
                        // name: service.name,
                        // price: service.price,
                        // creator: service.createdBy,
                        // time: service.createdAt,
                        // update: service.updatedAt,
                        service: service,
                    })
                }}
            >
                <Text style={styles.text}>{service.name}</Text>
                <Text style={styles.textPrice}>{service.price}đ</Text>
            </TouchableOpacity>
        );
    }

    return (

        <View style={styles.container}>

            <Text style={styles.titleText}>KAMI SPA</Text>

            <View style={styles.row}>
                <Text style={styles.text}>Danh sách dịch vụ</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Add Service");
                    }}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>


            </View>
            <FlatList
                data={services}
                renderItem={({ item }) => <Item service={item} />}
                
            />

        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10,
    },
    titleText: {
        fontSize: 35,
        fontWeight: "bold",
        color: '#EF506B',
        textAlign: "center",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#EF506B",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 50,

    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 20,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,

    },
    textPrice: {
        fontSize: 20,
        color: 'gray',
    },
})

export default Home;