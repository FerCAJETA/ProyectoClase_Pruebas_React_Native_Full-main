Navegacion.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { estadoLoginGlobal } from "./src/context/contexData";

// Pantallas
import ScreenHome from "./src/screen/home/ScreenHome";
import DetallesPokemon from "./src/screen/home/DetallesPokemon";
import ScreenSetting from "./src/screen/setting/ScreenSetting";
import ScreenLogin from "./src/screen/login/ScreenLogin";
import ScreenCrearCuenta from "./src/screen/login/ScreenCrearCuenta";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStackHome() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerTintColor: '#6366F1', 
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: '#1E293B',
        }
      }}
    >
      <Stack.Screen name="menu" component={ScreenHome} options={{ headerShown: true, title: 'Pokédex' }} />
      <Stack.Screen name="DetallesPokemon" component={DetallesPokemon} options={{ title: 'Detalles del Pokémon' }} />
    </Stack.Navigator>
  );
}

function MyStackLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={ScreenLogin} />
      <Stack.Screen name="crearcuenta" component={ScreenCrearCuenta} />
    </Stack.Navigator>
  );
}

function Mytabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: { 
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { 
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      <Tab.Screen
        name="home"
        component={MyStackHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="pokeball" size={24} color={focused ? "#6366F1" : "#94A3B8"} />,
          tabBarLabel: "Pokédex",
        }}
      />
      <Tab.Screen
        name="setting"
        component={ScreenSetting}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="cogs" size={24} color={focused ? "#6366F1" : "#94A3B8"} />,
          tabBarLabel: "Ajustes",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navegacion() {
  const { isLogin } = useContext(estadoLoginGlobal);
  return <>{isLogin ? <Mytabs /> : <MyStackLogin />}</>;
}