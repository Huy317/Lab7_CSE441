import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View,Text } from "react-native";
import { storage } from "./Storage";
import axios from "axios";

const AddCustomer = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    
    const handleAddService = () => {
        if (!name || !phone){
            Alert.alert("Error, Please fill in all fields");
            return;
        }
        
        const newCustomer = {
            name: name,
            phone: phone,
        };

        //let customers = storage.getString("customers");
        //customers = customers ? JSON.parse(customers) : [];
        //customers.push(newCustomer);
        // storage.set("customers", JSON.stringify(customers));
        Alert.alert("Success", "Customer added successfully");

        navigation.navigate("Customer");


        // No idea what the param for token supposed to be so I can't POST it 

        // const data = storage.getString("user");
        // let token = JSON.parse(data).token;
        // console.log("Token:", token);
        // axios.post('https://kami-backend-5rs0.onrender.com/customers',{
        //     name: name,
        //     phone: phone,
        //     login_token: token,
        // }).then((response) => {
        //     console.log("Customer added successfully:", response.data);
        //     Alert.alert("Success", "Customer added successfully");
        //     navigation.navigate("CustomerScreen");
        // }).catch((error)=>{
        //     console.error("Error adding customer:", error);
        //     Alert.alert("Error", "Failed to add customer");
        // })

    }
    

    return (
        <View style={styles.container}>
            <Text>Customer name*</Text>
            <TextInput
                style={styles.input}
                placeholder="Input your customer's name"
                onChangeText={(text) => setName(text)}
            />
            <Text>Phone*</Text>
            <TextInput
                style={styles.input}
                placeholder="Input phone number"
                onChangeText={(text) => setPhone(text)}
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

export default AddCustomer;

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