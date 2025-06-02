import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { storage } from "./Storage";
import uuid from "react-native-uuid";
const AddService = ({route, navigation}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    
    const handleAddService = () => {
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
            _id: uuid.v4(),
            name: name,
            price: price,
            createdBy: "admin",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        services.push(newService);
        storage.set("services", JSON.stringify(services));
        
        Alert.alert("Success", "Service added successfully");
        navigation.navigate("Home");
    }
    return (
        <View style={styles.container}>
            <Text>Service name*</Text>
            <TextInput
                style={styles.input}
                placeholder="Input a service name"
                onChangeText={(text) => setName(text)}
            />
            <Text>Price*</Text>
            <TextInput
                style={styles.input}
                placeholder="Price"
                onChangeText={(text) => setPrice(text)}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleAddService}
            >
                <Text style={styles.buttonText}>Add</Text>
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
export default AddService;