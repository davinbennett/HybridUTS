import { Stack } from "expo-router";


export default function RouterLayout ()
{
   return (
      <Stack
         initialRouteName="index"
         screenOptions={{
            animation: "none",
            gestureEnabled: false,
         }}
      >
         <Stack.Screen
            name="index"
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="register"
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
         />
      </Stack>
   );
}
