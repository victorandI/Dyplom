import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import PlantSelectionScreen from '../screens/PlantSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AboutScreen from '../screens/AboutScreen';
import { colors } from '../styles/global';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main stack
function MainStack() {
    return (
        <Stack.Navigator initialRouteName="PlantSelection">
            <Stack.Screen
                name="PlantSelection"
                component={PlantSelectionScreen}
                options={{ title: 'Select Plant', headerShown: false }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: 'Plant Doctor', headerShown: false }}
            />
            <Stack.Screen
                name="Results"
                component={ResultsScreen}
                options={{ title: 'Disease Analysis' }}
            />
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'leaf' : 'leaf-outline';
                    } else if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textLight,
            })}
        >
            <Tab.Screen
                name="Home"
                component={MainStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
    );
}

export default AppNavigator;