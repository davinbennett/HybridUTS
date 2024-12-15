import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox, Icon, ProgressBar, Modal, Portal, Button, Provider } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const { width } = Dimensions.get( 'window' );
const { height } = Dimensions.get( 'window' );

const DetailRecipe = ( { route, navigation } ) =>
{
   const { id, name, image, category, duration, status, servings, author, ingredients, steps, photoPerSteps } = route.params;

   const recipe = {
      id,
      name: name || "Contoh Resep",
      image: image || "",
      category: category || "",
      duration: duration || "",
      status: status || "",
      servings: servings || "",
      author: author || "",
      ingredients: ingredients || [],
      steps: steps || [],
      photoPerSteps: photoPerSteps || [],
   };

   const hasRecipeData = recipe.name && recipe.image && recipe.category && recipe.ingredients.length > 0 && recipe.steps.length > 0;

   const scrollX = useSharedValue( 0 );
   const [ checkedIngredients, setCheckedIngredients ] = useState( Array( recipe.ingredients.length ).fill( false ) );

   const tabBarHeight = useBottomTabBarHeight();

   const handleCheckBoxToggle = ( index ) =>
   {
      const updatedCheckedIngredients = [ ...checkedIngredients ];
      updatedCheckedIngredients[ index ] = !updatedCheckedIngredients[ index ];
      setCheckedIngredients( updatedCheckedIngredients );
   };

   const renderHeader = () =>
   {
      if ( !hasRecipeData )
      {
         return <Text className="text-center text-gray-500 mt-5">Recipe data is not available</Text>;
      }

      const [ isSaved, setIsSaved ] = useState( false );
      const toggleSave = () =>
      {
         setIsSaved( !isSaved );
      };

      const [ currentStep, setCurrentStep ] = useState( 0 );

      const onScroll = ( event ) =>
      {
         scrollX.value = event.nativeEvent.contentOffset.x;
      };

      const onViewableItemsChanged = ( { viewableItems } ) =>
      {
         if ( viewableItems.length > 0 )
         {
            setCurrentStep( viewableItems[ 0 ].index );
         }
      };

      const [ visibleReviewModal, setVisibleReviewModal ] = useState( false );
      const [ visibleShareModal, setVisibleShareModal ] = useState( false );
      const [ rating, setRating ] = useState( 0 );

      const showReviewModal = () => setVisibleReviewModal( true );
      const hideReviewModal = () => setVisibleReviewModal( false );

      const showShareModal = () => setVisibleShareModal( true );
      const hideShareModal = () => setVisibleShareModal( false );

      const handleStarPress = ( star ) =>
      {
         setRating( star );
      };

      return (
         <View className="flex-1">
            <ImageBackground
               source={{ uri: recipe.image }}
               className="h-[40vh] w-full"
               resizeMode="cover"
            >
               <View className="absolute inset-x-1 flex-row justify-between">
                  <TouchableOpacity className="pt-[env(safe-area-inset-top)] p-2" onPress={() => navigation.goBack()}>
                     <FontAwesome name="arrow-left" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleSave} className="pt-[env(safe-area-inset-top)] p-2">
                     <FontAwesome
                        name={isSaved ? "bookmark" : "bookmark-o"}
                        size={24}
                        color={"white"}
                     />
                  </TouchableOpacity>
               </View>
            </ImageBackground>

            <View className="pt-4 px-5">
               <View className='flex-row items-center mb-3 w-full'>
                  <Text className="flex-2 text-3xl font-bold text-gray-800">
                     {recipe.name}
                  </Text>
                  <View className='flex-1 flex-row justify-end gap-x-2'>
                     <TouchableOpacity onPress={showReviewModal}>
                        <Icon source='star-plus' size={30} color='#ffbe00' />
                     </TouchableOpacity>

                     <TouchableOpacity onPress={showShareModal}>
                        <Icon source='share-circle' size={30} color='grey' />
                     </TouchableOpacity>
                  </View>

                  <Portal>
                     <Modal
                        visible={visibleReviewModal}
                        onDismiss={hideReviewModal}
                        contentContainerStyle={{ padding: 25, backgroundColor: 'white', margin: 20, borderRadius: 8 }}
                     >
                        <Text className="text-2xl font-bold mb-8 text-center">Reviews for this recipe</Text>
                        <View className="flex-row justify-center mb-8 gap-x-2">
                           {[ 1, 2, 3, 4, 5 ].map( ( star ) => (
                              <TouchableOpacity key={star} onPress={() => handleStarPress( star )}>
                                 <Icon
                                    source="star"
                                    size={36}
                                    color={star <= rating ? '#ffbe00' : 'grey'}
                                 />
                              </TouchableOpacity>
                           ) )}
                        </View>
                        <Button buttonColor='#086cec' mode="contained" onPress={hideReviewModal}>
                           Add Star
                        </Button>
                     </Modal>
                  </Portal>

                  <Portal>
                     <Modal
                        visible={visibleShareModal}
                        onDismiss={hideShareModal}
                        contentContainerStyle={{ padding: 25, backgroundColor: 'white', margin: 20, borderRadius: 8 }}
                     >
                        <Text className="text-2xl font-bold mb-8 text-center">Share Recipe</Text>
                        <View className="flex-row justify-around mb-4">
                           <TouchableOpacity onPress={() => { }} className='items-center flex-1'>
                              <Icon source="whatsapp" size={40} color="#25D366" />
                              <Text className='text-sm'>
                                 Whatsapp
                              </Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { }} className='items-center flex-1'>
                              <Icon source="instagram" size={40} color="#C13584" />
                              <Text className='text-sm'>
                                 Instagram
                              </Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { }} className='items-center flex-1'>
                              <Icon source="facebook" size={40} color="blue" />
                              <Text className='text-sm'>
                                 Facebook
                              </Text>
                           </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-around my-6">
                           <TouchableOpacity onPress={() => { }} className='items-center flex-1'>
                              <Icon source="download" size={36} color="grey" />
                              <Text className='text-sm'>
                                 Save Picture
                              </Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { }} className='items-center flex-1'>
                              <Icon source="link" size={36} color="grey" />
                              <Text className='text-sm'>
                                 Save Link
                              </Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => { }} className='items-center flex-1'>
                              <Icon source="dots-horizontal" size={36} color="grey" />
                              <Text className='text-sm'>
                                 More
                              </Text>
                           </TouchableOpacity>
                        </View>
                        <Button buttonColor='#086cec' mode="contained" onPress={hideShareModal}>
                           Close
                        </Button>
                     </Modal>
                  </Portal>
               </View>


               <View className="flex-row justify-between mb-2">
                  <View className="flex-1">
                     <View className="flex-row items-center mb-2">
                        <FontAwesome name="tag" size={16} color="gray" />
                        <Text className="text-gray-500 ml-1">
                           Category: {recipe.category}
                        </Text>
                     </View>
                     <View className="flex-row items-center mb-2">
                        <FontAwesome name="clock-o" size={16} color="gray" />
                        <Text className="text-gray-500 ml-1">
                           Duration: {recipe.duration}
                        </Text>
                     </View>
                     <View className="flex-row items-center mb-2">
                        <FontAwesome name="check-circle" size={16} color="gray" />
                        <Text className="text-gray-500 ml-1">
                           Status: {recipe.status}
                        </Text>
                     </View>
                  </View>
                  <View className="flex-1">
                     <View className="flex-row items-center mb-2">
                        <FontAwesome name="user" size={16} color="gray" />
                        <Text className="text-gray-500 ml-1">
                           Servings: {recipe.servings}
                        </Text>
                     </View>
                     <View className="flex-row items-center mb-4">
                        <FontAwesome name="book" size={16} color="gray" />
                        <Text className="text-gray-500 ml-1">
                           Made by: {recipe.author}
                        </Text>
                     </View>
                  </View>
               </View>

               <View className="border-b border-gray-300 mb-4" />
            </View>

            <View className="px-5">
               <Text className="text-xl font-bold text-gray-800 pb-1">
                  Ingredients
               </Text>
               <FlatList
                  data={recipe.ingredients}
                  renderItem={( { item, index } ) => (
                     <View className="flex-row items-center py-[0.5]">
                        <Checkbox
                           status={checkedIngredients[ index ] ? 'checked' : 'unchecked'}
                           onPress={() => handleCheckBoxToggle( index )}
                           color='#086cec'
                        />
                        <Text className={`ml-3 text-gray-800 ${ checkedIngredients[ index ] ? 'line-through' : '' }`}>
                           {item}
                        </Text>
                     </View>
                  )}
                  keyExtractor={( item, index ) => index.toString()}
               />
            </View>
            <View className="px-5 mt-4 pb-{tabBarHeight}" style={{ paddingBottom: tabBarHeight * 0.4 }}>
               <Text className="text-xl font-bold text-gray-800 pb-5">
                  Steps
               </Text>
               <Animated.FlatList
                  data={steps}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  onScroll={onScroll}
                  onViewableItemsChanged={onViewableItemsChanged}
                  renderItem={( { item, index } ) => <StepsItem item={item} index={index} />}
                  keyExtractor={( item, index ) => index.toString()}
               />
               <View className='mt-3'>
                  <ProgressBar progress={( currentStep + 1 ) / steps.length} color="#086cec" />
                  <Text className="text-center text-gray-500 mt-2">{`Progress ${ currentStep + 1 } of ${ steps.length }`}</Text>
               </View>
            </View>
         </View>
      );
   };

   const StepsItem = ( { item, index } ) =>
   {
      const animatedStyle = useAnimatedStyle( () =>
      {
         return {
            transform: [
               {
                  translateX: interpolate(
                     scrollX.value,
                     [ ( index - 1 ) * width, index * width, ( index + 1 ) * width ],
                     [ -width * 0.01, 0, width * 0.01 ],
                     Extrapolation.CLAMP
                  )
               }
            ]
         };
      } );

      const hasImage = photoPerSteps[ index ] && photoPerSteps[ index ] !== "";

      return (
         <Animated.View style={[ animatedStyle, { width: width - 35 } ]} className="items-center">
            {hasImage && (
               <Image
                  source={{ uri: photoPerSteps[ index ] }}
                  className="w-[70vw] h-[25vh] rounded-lg"
                  resizeMode="cover"
               />
            )}
            <Text className="text-lg font-bold mt-3">{`Step ${ index + 1 }:`}</Text>
            <Text className="text-gray-800 mt-3">{item}</Text>
         </Animated.View>
      );
   };

   return (
      <Provider>
         <FlatList
            ListHeaderComponent={renderHeader}
            data={hasRecipeData ? [] : null}
            keyExtractor={() => Math.random().toString()}
            showsVerticalScrollIndicator={false}
         />
      </Provider>

   );
};

export default DetailRecipe;
