import React, { createContext, useContext, useEffect } from "react";
import './gesture-handler';
import { Text, TouchableOpacity, View } from "react-native";
import Login from "./src/Login";
import Home from "./src/Home";
import AddService from "./src/AddService";
import { NavigationContainer } from "@react-navigation/native";
import { storage } from "./src/Storage";
import { useMMKVBoolean } from "react-native-mmkv";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "./src/Detail";
import EditService from "./src/EditService";
import Customer from "./src/Customer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@react-native-vector-icons/material-design-icons";
import AddCustomer from "./src/AddCustomer";
import Transaction from "./src/Transaction";
import TransactionDetails from "./src/TransactionDetails";
import CustomerDetail from "./src/CustomerDetail";
import EditCustomer from "./src/EditCustomer";
import AddTransaction from "./src/AddTransaction";

// 0373007856
// 123
const AuthContext = createContext();

const Stack = createStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Home" component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Add Service" component={AddService} options={({ route }) => ({ title: "Add Service" })} />
      <Stack.Screen name="Detail" component={Detail} options={({ route }) => ({ title: "Detail Page" })} />
      <Stack.Screen name="Edit Service" component={EditService} options={({ route }) => ({ title: "Edit Service" })} />
    </Stack.Navigator>
  )
}

const CustomerScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="Add Customer" component={AddCustomer} options={({ route }) => ({ title: "Add Customer" })} />
      <Stack.Screen name="Customer Detail" component={CustomerDetail}
        options={({ route }) => (
          {
            title: "Customer Details",
          })}
      />
      <Stack.Screen name="Edit Customer" component={EditCustomer} options={({ route }) => ({title: "Edit Customer" })} />
    </Stack.Navigator>
  )
}

const SettingScreen = ({ }) => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 10,
          marginTop: 70,
        }}
        onPress={() => {
          storage.delete("user");
          logout();
        }}
      >
        <Text style={{
          color: "white", fontSize: 20, textAlign: "center", marginTop: 20,
          backgroundColor: "#EF506B",
          padding: 10,
          borderRadius: 10,
        }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const TransactionScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="Transaction Detail" component={TransactionDetails} options={({ route }) => ({ title: "Transaction Details" })} />
      <Stack.Screen name="Add Transaction" component={AddTransaction} options={({route})=> ({title: "Add Transaction"})} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CustomerScreen") {
            iconName = focused ? "account-group" : "account-group-outline";
          } else if (route.name === "TransactionScreen") {
            iconName = focused ? "account-cash" : "account-cash-outline";
          } else if (route.name === "SettingScreen") {
            iconName = focused ? "cog" : "cog-outline";
          }

          return <Icon name={iconName} size={size} color={color} />

        }
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={({ route }) => ({ title: "Home" })} />
      <Tab.Screen name="CustomerScreen" component={CustomerScreen} options={({ route }) => ({ title: "Customers" })} />
      <Tab.Screen name="TransactionScreen" component={TransactionScreen} options={({ route }) => ({ title: "Transactions" })} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} options={({ route }) => ({ title: "Settings" })} />

    </Tab.Navigator>
  )
}

const App = () => {
  const [isSignedIn, setIsSignedIn] = useMMKVBoolean("isSignedIn");

  // for debug
  const resetSignIn = false;

  useEffect(() => {
    if (resetSignIn) {
      setIsSignedIn(false);
    }
  }, [])
  const handleLogout = () => {
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ logout: handleLogout }}>
      <NavigationContainer>
        {isSignedIn ? (
          <TabNavigator />
        ) : (
          <Login onSignin={() => setIsSignedIn(true)} />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;