import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Home from "./Home";
import { storage } from "./Storage";
import { useMMKVBoolean } from "react-native-mmkv";

const Login = ({onSignin}) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        if (!phone || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        fetch("https://kami-backend-5rs0.onrender.com/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "phone": phone,
                "password": password
            }),
        }).then((response)=> response.json())
        .then((data)=>{
            console.log(data)
            if (data.errors){
                Alert.alert("Login Unsuccessful", data.errors[0].msg);
                return;
            }
            console.log(data);
            // storage.set("IsSignedIn", true);
            
            storage.set("user",JSON.stringify(data));
            
            onSignin();
            
            Alert.alert("Login success", `Welcome ${data.name}`);
            
        })
        .catch((error)=>{
            console.log(error)
        });

        //Alert.alert("Login", `Phone: ${phone}, Password: ${password}`);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Login</Text>
            <TextInput style={styles.input} placeholder="Phone" onChangeText={(text) => setPhone(text)}/>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text)=>setPassword(text)}/>
            <TouchableOpacity style={styles.button}
                onPress={handleLogin}
                
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        padding: 50,
    },
    titleText: {
        fontSize: 48,
        marginBottom: 20,
        fontWeight: "bold",
        color: '#EF506B',
    },
    input: {
        width: '100%',
        borderColor: "#ccc",
        marginTop: 12,
        borderWidth: 1,
        borderRadius: 10,

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

export default Login;