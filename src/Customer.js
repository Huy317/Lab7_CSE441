import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { storage } from "./Storage";
import { FlatList, Text } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";

const Customer = ({navigation}) => {
    const [customers, setCustomers] = useState([]);
    const fetchData = () => {
        axios.get("https://kami-backend-5rs0.onrender.com/customers")
            .then((response) => {
                console.log("Customer data fetched successfully:", response.data);
                // storage.set("customers", JSON.stringify(response.data));
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customer data:", error);
            });
    }

    useEffect(() => {
        console.log("Fetching customer data...");
        fetchData();
    }, [])

    const CustomerItem = ({ customer }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Customer Detail", customer._id)
                }}
                style={styles.customerItem}
            >
                <View style={styles.textSide}>
                    <Text style={styles.label}>
                        Customer: <Text style={styles.text}>{customer.name}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Phone: <Text style={styles.text}>{customer.phone}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Total money: <Text style={styles.redText}>{customer.totalSpent}đ</Text>
                    </Text>
                </View>
                <View style={styles.iconSide}>
                    <Icon name="crown" size={40} color="#EF506B" />
                    <Text style={styles.redText}>{customer.loyalty}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={customers}
                renderItem={({item}) => <CustomerItem customer={item} />}
            />
            <TouchableOpacity
                style={styles.floating}
                onPress={() => {
                    navigation.navigate("Add Customer");
                }}
            >
                <Icon name="plus" size={40} style={{color:'white'}}/>
            </TouchableOpacity>
        </View>

    );
}

export default Customer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    customerItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        margin: 10,
    },
    textSide: {
        flex: 2,
        flexDirection: "column",
    },
    iconSide: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
    },
    redText: {
        color: "#EF506B",
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    floating: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#EF506B",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
    }
})