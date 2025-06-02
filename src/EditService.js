import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { storage } from "./Storage";
const EditService = ({route, navigation}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const _id = route.params._id;
    
    const handleUpdateService = () => {
        if (!name || !price) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        var services = storage.getString("services");
        if (services) {
            services = JSON.parse(services);
        } else {
            services = [];
        }

        const newService = {
            _id: _id,
            name: name,
            price: price,
        };

        const index = services.findIndex((service) => service._id === _id);
        if (index !== -1) {
            services[index] = {
                ...services[index],
                ...newService,
                updatedAt: new Date().toISOString(),
            };
        } else {
            Alert.alert("Error", "Service not found");
            return;
        }

        storage.set("services", JSON.stringify(services));
        Alert.alert("Success", "Service editted successfully");
        navigation.navigate("Home");
    }
    return (
        <View style={styles.container}>
            <Text>Service name*</Text>
            <TextInput
                style={styles.input}
                defaultValue={route.params.name}
                onChangeText={(text) => setName(text)}
            />
            <Text>Price*</Text>
            <TextInput
                style={styles.input}
                defaultValue={route.params.price+""}
                onChangeText={(text) => setPrice(text)}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateService}
            >
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "black",
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#F2F2F7",
        borderRadius: 5,
        marginBottom: 10,
    },
        button: {
        backgroundColor: "#EF506B",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        borderRadius: 10,
        padding: 12,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 16,
    }
})
export default EditService;