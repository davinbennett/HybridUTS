import React from 'react';
import HomePage from '../../presentation/screen/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailRecipe from '../../presentation/screen/detailRecipe';


const Stack = createNativeStackNavigator();

const HomeStack = () =>
{
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="home"
            component={HomePage}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="detailRecipe"
            component={DetailRecipe}
            options={{ headerShown: false }} 
         />
      </Stack.Navigator>
   );
};

export default HomeStack;