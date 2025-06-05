import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
const AddTransaction = () => {
    const [service1, setService1] = useState(false);
    const [service2, setService2] = useState(false);
    const [service3, setService3] = useState(false);
    const [value, setValue] = useState("");
    const data = [
        { label: 'Executor', value: '1' }
    ]
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.bold}>Customer*</Text>
                <View style={styles.selectSection}>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        placeholder="Select Service"
                        onChange={(item) => console.log(item)}
                        valueField={"value"}
                        labelField={"label"}
                        value={value}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.checkboxSection}>
                    <BouncyCheckbox
                        onPress={() => setService1(!service1)}
                    />
                    <Text style={styles.text}>Lột mụn</Text>
                </View>
                <View style={styles.selectSection}>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        placeholder="Select Service"
                        onChange={(item) => console.log(item)}
                        valueField={"value"}
                        labelField={"label"}
                        value={value}
                    />
                </View>
                <Text style={styles.redText}>Price: 40.000d</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.checkboxSection}>
                    <BouncyCheckbox
                        onPress={() => setService1(!service1)}
                    />
                    <Text style={styles.text}>Lột mụn</Text>
                </View>
                <View style={styles.selectSection}>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        placeholder="Select Service"
                        onChange={(item) => console.log(item)}
                        valueField={"value"}
                        labelField={"label"}
                        value={value}
                    />
                </View>
                <Text style={styles.redText}>Price: 40.000d</Text>
            </View>
            <View style={styles.checkboxSection}>
                <BouncyCheckbox
                    onPress={() => setService1(!service1)}
                />
                <Text style={styles.text}>Lột mụn</Text>
            </View>
            <View style={styles.checkboxSection}>
                <BouncyCheckbox
                    onPress={() => setService1(!service1)}
                />
                <Text style={styles.text}>Lột mụn</Text>
            </View>
            <View style={styles.checkboxSection}>
                <BouncyCheckbox
                    onPress={() => setService1(!service1)}
                />
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
    checkboxSection: {
        flexDirection: "row",
    },
    text: {
        color: '#333',
        marginTop: 5,
    },
    selectSection: {
        flexDirection: "row",
        marginTop: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        flex: 1,
    },
    redText: {
        color: '#EF506B',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
        flexDirection: "column",
    }

})