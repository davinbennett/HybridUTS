import { Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { PaperProvider, TextInput, Divider, DefaultTheme } from 'react-native-paper';

const LoginPage = () =>
{
   return (
      <PaperProvider theme={DefaultTheme}>
         <View className='flex-1 items-center justify-center px-5'>
            <Image
               className='h-72'
               source={require( '../../../../assets/images/login.png' )}
               resizeMode='contain'
            />
            <Text className='text-4xl font-bold my-8'>
               Let's sign you in
            </Text>
            <TextInput
               mode="outlined"
               label="Email"
               style={{
                  width: '100%',
                  fontSize: 13.5
               }}
               cursorColor="grey"
               activeOutlineColor="black"
               outlineColor="grey"
            />
            <View className='h-2'/>
            <TextInput
               mode="outlined"
               label="Password"
               secureTextEntry
               style={{
                  width: '100%',
                  fontSize: 13.5,
               }}
               cursorColor="grey"
               activeOutlineColor="black"
               outlineColor="grey"
            />
            <View className="mt-2 w-full">
               <TouchableOpacity onPress={() => console.warn( 'Forgot Password' )}>
                  <Text className="text-[#086cec] font-bold text-right text-s">
                     Forgot password?
                  </Text>
               </TouchableOpacity>
            </View>
            <View className="flex-row items-center w-full my-8">
               <Divider className="border border-gray-300 flex-[0.7]" />
               <View className="flex-1">
                  <Text className="text-center text-gray-500 text-base font-medium">Or Sign in with</Text>
               </View>
               <Divider className="border border-gray-300 flex-[0.7]" />
            </View>
            <View className="flex-row justify-between w-full">
               <TouchableOpacity className="flex-1 bg-gray-300 py-4 rounded" onPress={() => console.warn( 'Google' )}>
                  <Image
                     source={require( '../../../../assets/icons/google.png' )}
                     className="w-5 h-5 mx-auto"
                  />
               </TouchableOpacity>
            </View>
            <View className="w-full my-3">
               <TouchableOpacity onPress={() => router.replace( '(tabs)' )}>
                  <Text className="text-center bg-[#086cec] py-4 rounded-lg text-white text-m font-bold">
                     Login
                  </Text>
               </TouchableOpacity>
            </View>
            <View className="flex-row">
               <Text className="text-black font-semibold">Create an Account? </Text>
               <Pressable onPress={() => router.navigate( 'register' )}>
                  <Text className="text-[#086cec] font-semibold">Register</Text>
               </Pressable>
            </View>
         </View>
      </PaperProvider>
   );
};

export default LoginPage;
