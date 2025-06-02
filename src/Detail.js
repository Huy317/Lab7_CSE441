import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { storage } from "./Storage";

const Detail = ({ route, navigation }) => {
    const service = route.params.service;
    const _id = service._id;
    const name = service.name;
    const price = service.price;
    const creator = service.createdBy;
    const time = service.createdAt;
    const update = service.updatedAt;

    const handleEdit = () => {
        navigation.navigate("Edit Service", {
            _id: _id,
            name: name,
            price: price,
        });
    }

    const deleteCurrent = () => {
        const services = JSON.parse(storage.getString("services"));

        const index = services.findIndex((service) => service._id === _id);

        if (index > -1){
            services.splice(index, 1);
            storage.set("services", JSON.stringify(services));
            Alert.alert("Service deleted successfully");
            navigation.navigate("Home");
        }else {
            Alert.alert("Service not found");
        }

        
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Service",
            "Are you sure you want to delete this service?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        deleteCurrent();
                    }
                }
            ]
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Service name:</Text> {name}
            </Text>
            <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Price:</Text> {price}
            </Text>
            <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Creator:</Text> {creator}
            </Text>
            <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Time:</Text> {time}
            </Text>
            <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Final update:</Text> {update}
            </Text>

            <TouchableOpacity
                onPress={handleEdit}
                style={styles.edit}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleDelete}
                style={styles.delete}
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontSize: 20,
    },
    edit: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    delete: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 16,
    }
})

export default Detail;