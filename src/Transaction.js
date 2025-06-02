import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Transaction = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const fetchData = () => {
        axios.get("https://kami-backend-5rs0.onrender.com/transactions")
            .then((response) => {
                console.log("Transaction data fetched successfully:", response.data);
                // storage.set("transactions", JSON.stringify(response.data));
                setTransactions(response.data);
            }).catch((error) => {
                console.error("Error fetching transaction data:", error);
            });
    }

    useEffect(() => {
        console.log("Fetching transaction data...");
        fetchData();
    }, [])

    const Item = ({ transaction }) => {
        // console.log("Rendering transaction item:", transaction);
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("Transaction Detail", { transaction })}
            >
                <View style={styles.textSide}>
                    <Text style={styles.itemText}>{transaction.id} - {transaction.createdAt}</Text>
                    {transaction.services.map((service, index) => (
                        <Text key={index}>- {service.name}</Text>
                    ))}
                    <Text style={styles.customerText}>Customer: {transaction.customer.name}</Text>
                </View>
                <View style={styles.priceSide}>
                    <Text style={styles.itemPrice}>{transaction.price}đ</Text>
                </View>

            </TouchableOpacity>
        )

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={({ item }) => <Item transaction={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default Transaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        borderRadius: 10,
        padding: 10,
        borderColor: "#ccc",
        borderWidth: 2,
        flexDirection: "row",
    },
    textSide: {
        flex: 3,
        flexDirection: "column",
    },
    priceSide: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#EF506B",
    },
    customerText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "bold",
    },
})