import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-gesture-handler";

const TransactionDetails = ({ route }) => {
    const { transaction } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.redLabel}>General Information</Text>
                <View style={styles.infoSection}>
                    <View style={styles.leftSide}>
                        <Text style={styles.label}>Transaction code</Text>
                        <Text style={styles.label}>Customer</Text>
                        <Text style={styles.label}>Creation time</Text>
                    </View>
                    <View style={styles.rightSide}>
                        <Text style={styles.text}>{transaction.id}</Text>
                        <Text style={styles.text}>{transaction.customer.name}</Text>
                        <Text style={styles.text}>{transaction.createdAt}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.redLabel}>Service list</Text>
                <View style={styles.infoSection}>
                    <View style={styles.leftSide}>
                        {transaction.services.map((service, index) => (
                            <Text key={index} style={styles.label}>- {service.name} x{service.quantity}</Text>
                        ))}
                        <Text style={styles.label}>Total</Text>
                    </View>
                    <View style={styles.rightSide}>
                        {transaction.services.map((service, index) => (
                            <Text key={index} style={styles.text}>{service.price}đ</Text>
                        ))}
                        <Text style={styles.priceText}>{transaction.price}đ</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.redLabel}>Cost</Text>
                <View style={styles.infoSection}>
                    <View style={styles.leftSide}>
                        <Text style={styles.label}>Amount of money</Text>
                        <Text style={styles.label}>Discount</Text>
                        <Text style={[styles.text, {marginTop: 10}]}>Total payment</Text>
                    </View>
                    <View style={styles.rightSide}>
                        <Text style={styles.text}>{transaction.priceBeforePromotion}đ</Text>
                        <Text style={styles.text}>{transaction.price-transaction.priceBeforePromotion}đ</Text>
                        <Text style={[styles.priceText, , {marginTop: 10}]}>{transaction.price}đ</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default TransactionDetails;

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
    infoSection: {
        flexDirection: "row",
        
    },
    leftSide: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    rightSide: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
    },
    redLabel: {
        color: "#EF506B",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: "bold",
        marginBottom: 5,
    },
    priceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#EF506B",
        
    },
})