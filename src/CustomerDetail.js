import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Touchable, TouchableOpacity, FlatList } from "react-native";

const CustomerDetail = ({ route, navigation }) => {

    const [customer, setCustomer] = useState([]);
    const customerId = route.params;
    let url = "https://kami-backend-5rs0.onrender.com/Customers/" + customerId;
    console.log("URL: ", url);
    console.log("Customer Detail:", customerId);
    const fetchData = () => {
        axios.get(url)
            .then((response) => {
                console.log("Fetched customer data: ", response.data);
                setCustomer(response.data);
            }).catch((error) => {
                console.log("Error fetching customer: ", error);
            })
    }
    useEffect(() => {
        console.log("Fetching customer id: ", customerId);
        fetchData();
    }, [])

    const Item = ({ transaction }) => {
        console.log("Rendering transaction item:", transaction);
        return (
            <TouchableOpacity
                style={styles.item}
            // onPress={() => navigation.navigate("Transaction Detail", { transaction })}
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
            <View style={styles.box}>
                <Text style={styles.label}>General information</Text>
                <Text style={styles.bold}>Name: <Text style={styles.normal}>{customer.name}</Text></Text>
                <Text style={styles.bold}>Phone: <Text style={styles.normal}>{customer.phone}</Text></Text>
                <Text style={styles.bold}>Total Spent: <Text style={styles.red}>{customer.totalSpent}đ</Text></Text>
                <Text style={styles.bold}>Time: <Text style={styles.normal}>{ }</Text></Text>
                <Text style={styles.bold}>Last update: <Text style={styles.normal}>{customer.updatedAt}</Text></Text>
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.box}>
                <Text style={styles.label}>Transaction History</Text>
                <FlatList
                    data={customer.transactions}
                    renderItem={({ item }) => <Item transaction={item} />}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </View>
    )
}

export default CustomerDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    box: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10,
        flexDirection: "column",
        marginBottom: 10,
    },
    label: {
        color: "#EF506B",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    bold: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 5
    },
    normal: {
        fontWeight: 'normal'
    },
    red: {
        color: "#EF506B",
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
    buttonSection: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    button: {
        
        height: 50,
        borderColor: "#EF506B",
        width: "40%",
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: "center",
        margin: 10
        
    },
    editButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
        textAlign:'center'
    }
})