import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const AddTransaction = () => {
    const [service1, setService1] = useState(false);
    const [service2, setService2] = useState(false);
    const [service3, setService3] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.bold}>Customer*</Text>
            <View style={styles.checkboxSection}>
                
                <Text style={styles.text}>Lột mụn</Text>
            </View>

        </View>
    )
}

export default AddTransaction;
const styles = new StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    bold: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    checkboxSection:{
        flexDirection: "row",
    },
    text:{
        color: '#333',
        marginTop: 5,
    }
})