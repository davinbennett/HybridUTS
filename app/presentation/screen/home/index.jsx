import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const categories = [
   { id: 1, name: 'Popular', image: 'https://img.freepik.com/free-photo/delicious-veggie-dish-still-life_23-2151190781.jpg' },
   { id: 2, name: 'Western', image: 'https://img.freepik.com/premium-photo/plate-steaks-potatoes-glass-beer_1256099-7752.jpg?uid=R122627086&ga=GA1.1.345096565.1729145030&semt=ais_hybrid' },
   { id: 3, name: 'Indonesian', image: 'https://img.freepik.com/premium-photo/indonesian-food-plate-with-rice-meat-vegetables-served-banana-leaf-generative-ai_437323-11259.jpg?uid=R122627086&ga=GA1.1.345096565.1729145030&semt=ais_hybrid' },
   { id: 4, name: 'Beverages', image: 'https://www.austriajuice.com/hs-fs/hubfs/Beverage_compounds_drinks.jpg?width=1095&name=Beverage_compounds_drinks.jpg' },
   { id: 5, name: 'Noodles', image: 'https://img.freepik.com/free-photo/bowl-noodles-with-bell-peppers-chopstick-wooden-desk_23-2148093189.jpg?uid=R122627086&ga=GA1.1.345096565.1729145030&semt=ais_hybrid' },
];

const recipes = [
   {
      id: '1',
      name: 'Spaghetti Carbonara',
      image: 'https://cdn1-production-images-kly.akamaized.net/rucbm_He4EsfOjQHhYupASez0sQ=/0x194:5616x3359/673x379/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3048436/original/030475400_1581499756-shutterstock_413580649.jpg',
      category: 'Italian',
      duration: '90 mins',
      status: 'Not Yet Started',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '200g spaghetti',
         '100g pancetta or bacon',
         '2 large eggs',
         '50g grated parmesan cheese',
         '2 cloves garlic, minced',
         'Salt and pepper to taste'
      ],
      steps: [
         'Cut the carrots into small cubes, and slice the celery stalks. Chop the onion.',
         'Cut the bottom of the tomato into an x ​​shape. Then boil the tomato for a while. Remove and peel the tomato skin.',
         'Then chop the tomatoes until smooth. You can also blend them. Once done, set them aside first',
         'Saute carrots, celery stalks, and onions. Then add the meat, saute until brown. After that add the tomatoes.',
         'Add wine, tomato paste, and tomato sauce. Mix well.',
         'Add milk, bay leaves, water, and spices (broth powder, salt, Italian herbs, and sugar). For the taste, adjust it again to your taste. If you like a slightly sweet bolognese sauce, you can add more sugar. Cook for approximately 30-60 minutes',
         'While waiting for the sauce, we boil the spaghetti first with a little oil and 1/2 tbsp of salt. Adding salt is so that the spaghetti is not bland. Boil the spaghetti until al dente. Then add the spaghetti to the sauce. Stir well',
         'Spaghetti ready to serve'
      ],
      photoPerSteps: [
         'https://img-global.cpcdn.com/steps/7f3c87c372134690/320x256cq70/spaghetti-bolognese-langkah-memasak-1-foto.webp',
         'https://img-global.cpcdn.com/steps/19cfc7872d04b07b/320x256cq70/spaghetti-bolognese-langkah-memasak-2-foto.webp',
         'https://img-global.cpcdn.com/steps/2b878dca4d840296/320x256cq70/spaghetti-bolognese-langkah-memasak-3-foto.webp',
         'https://img-global.cpcdn.com/steps/ac930b555ae04faf/320x256cq70/spaghetti-bolognese-langkah-memasak-4-foto.webp',
         'https://img-global.cpcdn.com/steps/17a5eec8f7eede93/320x256cq70/spaghetti-bolognese-langkah-memasak-5-foto.webp',
         'https://img-global.cpcdn.com/steps/ddaeed03df44d64b/320x256cq70/spaghetti-bolognese-langkah-memasak-6-foto.webp',
         'https://img-global.cpcdn.com/steps/ba152cc22a5b768d/320x256cq70/spaghetti-bolognese-langkah-memasak-7-foto.webp',
         'https://img-global.cpcdn.com/steps/c43ccc16e5226653/320x256cq70/spaghetti-bolognese-langkah-memasak-8-foto.webp'
      ]
   },
   {
      id: '2',
      name: 'Fried Rice with Egg and Meat',
      image: 'https://www.blibli.com/friends-backend/wp-content/uploads/2023/04/B300026-Cover-resep-nasi-goreng-scaled.jpg',
      category: 'Indonesian',
      duration: '20 mins',
      status: 'Ongoing',
      servings: '3 Person',
      author: 'Budi',
      ingredients: [
         '3 cups cooked rice',
         '1 egg',
         '1 cut of chest/fried chicken thighs',
         '1/3 canned corned beef',
         '4 cloves of shallots',
         '1 clove of garlic',
         '10 pieces of cayenne pepper',
         '2 stalks of basil leaves',
         '4 tablespoons of sweet soy sauce',
         '1/2 tablespoon of pepper',
         'Coconut oil',
         'Salt, sugar, and MSG'
      ],
      steps: [
         'Prepare 3 servings of rice to cook.',
         'Prepare 1 piece of fried chicken with a lot of meat such as the breast or thigh then shred it roughly.',
         'Add garlic and sauté until fragrant.',
         'Add cooked rice, soy sauce, salt, and pepper. Stir-fry for a few minutes.',
         'Add the scrambled egg and mix well.',
         'Garnish with green onions and serve hot.'
      ],
      photoPerSteps:[]
   },
   {
      id: '3',
      name: 'Ice Tea',
      image: 'https://fajar.co.id/wp-content/uploads/2023/09/IMG_0741.jpg',
      category: 'Beverages',
      duration: '5 mins',
      status: 'Not Yet Started',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '2 cups water',
         '1-2 tea bags or 1 tbsp loose tea leaves',
         'Ice cubes',
         'Sugar or honey to taste',
         'Lemon slices (optional)'
      ],
      steps: [
         'Boil water and steep the tea bags or leaves for 3-5 minutes.',
         'Remove the tea bags or strain the tea leaves.',
         'Add sugar or honey if desired and stir until dissolved.',
         'Pour over ice and garnish with lemon slices if desired.'
      ],
      photoPerSteps:[]
   },
   {
      id: '4',
      name: 'Chicken Soto',
      image: 'https://cdn0-production-images-kly.akamaized.net/9OhNK313sh_FOfF_y0Nymo0qp_0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3134970/original/081486000_1590134591-resep-soto-ayam.jpg',
      category: 'Indonesian',
      duration: '45 mins',
      status: 'Not Yet Started',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '500g chicken, cut into pieces',
         '2 lemongrass stalks',
         '4 kaffir lime leaves',
         '1-inch ginger, crushed',
         'Salt to taste',
         'Fried shallots and lime wedges for garnish'
      ],
      steps: [
         'Boil the chicken with lemongrass, lime leaves, and ginger until cooked through.',
         'Remove the chicken and shred it into pieces.',
         'Return the chicken to the pot and season with salt.',
         'Serve hot, garnished with fried shallots and lime wedges.'
      ],
      photoPerSteps:[]
   },
   {
      id: '5',
      name: 'Fried Noodles',
      image: 'https://asset.kompas.com/crops/f5x6WUsbiRwJVC70ZO8m5Qu2Igo=/23x0:1000x652/750x500/data/photo/2021/01/22/600a67c8be421.jpg',
      category: 'Noodles',
      duration: '20 mins',
      status: 'Ongoing',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '200g egg noodles',
         '50g sliced chicken or shrimp',
         '1 cup mixed vegetables (carrot, cabbage, bean sprouts)',
         '2 tbsp soy sauce',
         'Salt and pepper to taste'
      ],
      steps: [
         'Boil the noodles according to package instructions, then drain and set aside.',
         'In a pan, cook the chicken or shrimp until fully cooked.',
         'Add the vegetables and stir-fry for a few minutes.',
         'Add the noodles, soy sauce, salt, and pepper. Stir-fry until well mixed.',
         'Serve hot.'
      ],
      photoPerSteps:[]
   },
   {
      id: '6',
      name: 'Kopi Tubruk',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wX6-fvZvtipSGl7qJkN4sncZ4Yr3hEccLRA5qbroVtrGgQFZlHU28gecdtbw-In0fLQ&usqp=CAU',
      category: 'Beverages',
      duration: '10 mins',
      status: 'Not Yet Started',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '2 tbsp ground coffee',
         '200ml hot water',
         'Sugar to taste'
      ],
      steps: [
         'Place ground coffee in a cup.',
         'Pour hot water over the coffee and stir.',
         'Add sugar to taste and let it steep for a few minutes before drinking.'
      ],
      photoPerSteps:[]
   },
   {
      id: '7',
      name: 'Chicken Steak',
      image: 'https://i.ytimg.com/vi/xR6rTrhiZVU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCt81MoZcQ4edseFXPwI3Ugia2xTQ',
      category: 'Western',
      duration: '20 mins',
      status: 'Not Yet Started',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '1 chicken breast',
         'Salt and pepper to taste',
         '1 tbsp olive oil',
         'Steak sauce for serving'
      ],
      steps: [
         'Season the chicken breast with salt and pepper.',
         'Heat olive oil in a pan and cook the chicken until golden brown on both sides.',
         'Serve with steak sauce.'
      ],
      photoPerSteps:[]
   },
   {
      id: '8',
      name: 'Beef Steak',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCBLMiNLCaunzTYj0M8ZIM39cSR8nSquSig&s',
      category: 'Western',
      duration: '20 mins',
      status: 'Not Yet Started',
      servings: '2-3 Person',
      author: 'Davin',
      ingredients: [
         '1 beef steak (sirloin or ribeye)',
         'Salt and pepper to taste',
         '1 tbsp butter',
         'Steak sauce for serving'
      ],
      steps: [
         'Season the steak with salt and pepper.',
         'Heat butter in a pan and cook the steak to desired doneness.',
         'Serve with steak sauce.'
      ],
      photoPerSteps:[]
   }
];

const RecipeCard = ( { recipe } ) =>
{
   const [ isSaved, setIsSaved ] = useState( false );
   const navigation = useNavigation();

   const toggleSave = () =>
   {
      setIsSaved( !isSaved );
   };

   const handlePress = () =>
   {
      navigation.navigate( 'detailRecipe', {
         id: recipe.id,
         name: recipe.name,
         image: recipe.image,
         category: recipe.category,
         duration: recipe.duration,
         status: recipe.status,
         servings: recipe.servings,
         author: recipe.author,
         ingredients: recipe.ingredients,
         steps: recipe.steps,
         photoPerSteps: recipe.photoPerSteps
      } );
   };

   return (
      <TouchableOpacity
         onPress={handlePress}
         className="flex-row bg-white rounded-xl shadow-sm mb-4 overflow-hidden mx-5"
      >
         <View className="absolute top-2 right-3 z-10">
            <TouchableOpacity onPress={toggleSave}>
               <FontAwesome
                  name={isSaved ? "bookmark" : "bookmark-o"}
                  size={20}
                  color={isSaved ? "#086cec" : "#888"}
               />
            </TouchableOpacity>
         </View>
         <Image
            source={{ uri: recipe.image }}
            className="flex-1"
            resizeMode="cover"
         />
         <View className="p-4 flex-[1.1]">
            <Text
               className="text-xl max-w-[90%] font-semibold mb-1"
               numberOfLines={1}
               ellipsizeMode="tail"
            >
               {recipe.name}
            </Text>
            <Text
               className="text-gray-500 mb-1"
               numberOfLines={1}
               ellipsizeMode="tail"
            >
               Category: {recipe.category}
            </Text>
            <Text
               className="text-gray-500 mb-1"
               numberOfLines={1}
               ellipsizeMode="tail"
            >
               Duration: {recipe.duration}
            </Text>
            <Text
               className={`text-sm font-bold ${ recipe.status === 'Sedang Dimasak' ? 'text-green-500' : 'text-gray-500' }`}
               numberOfLines={1}
               ellipsizeMode="tail"
            >
               Status: {recipe.status}
            </Text>
         </View>
      </TouchableOpacity>
   );
};

const HomePage = () =>
{
   const tabBarHeight = useBottomTabBarHeight();
   const [ selectedCategoryId, setSelectedCategoryId ] = useState( 1 );
   const [ visibleRecipesCount, setVisibleRecipesCount ] = useState( 5 );

   const loadMore = () =>
   {
      setVisibleRecipesCount( prevCount => prevCount + 5 );
   };

   const filteredRecipes = selectedCategoryId === 1
      ? recipes
      : recipes.filter( recipe => recipe.category === categories.find( cat => cat.id === selectedCategoryId )?.name );

   const renderHeader = () => (
      <View className='flex-1 bg-[#f2f2f2] pt-[env(safe-area-inset-top)]'>
         <View className='flex-row items-center mb-5 px-5 justify-between w-full'>
            <TouchableOpacity onPress={() => console.warn( 'Go to Profile' )}>
               <Image
                  source={{ uri: 'https://i.pinimg.com/75x75_RS/7e/92/5b/7e925b9cbe0ddd1435cdef7d7ea59d43.jpg' }}
                  className="w-10 h-10 rounded-full"
               />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.warn( 'Open Notifications' )}>
               <FontAwesome name="bell-o" size={20} color="black" />
            </TouchableOpacity>
         </View>

         <Text className='text-lg font-bold text-[grey] w-full mb-1 px-5'>Hello !</Text>
         <Text className='mb-5 px-5 text-3xl font-bold w-full' adjustsFontSizeToFit numberOfLines={2}>
            Make your most delicious food
         </Text>

         <View className="w-full px-5 flex-1 mb-8">
            <View className="flex-row items-center bg-[#e0e0e0] rounded-full px-6">
               <FontAwesome name="search" size={20} color="#888" />
               <TextInput
                  mode="flat"
                  placeholder="Search..."
                  style={{
                     backgroundColor: 'transparent',
                     flex: 1,
                  }}
                  activeUnderlineColor='#e0e0e0'
                  underlineColor="none"
                  selectionColor="#086cec"
                  cursorColor='#888'
                  placeholderTextColor={'#888'}
                  activeOutlineColor='black'
               />
            </View>
         </View>

         <View className="w-full mb-5">
            <Text className="text-2xl font-bold px-5 mb-3">Recipe Categories</Text>
            <FlatList
               data={categories}
               horizontal
               showsHorizontalScrollIndicator={false}
               keyExtractor={( item ) => item.id.toString()}
               renderItem={( { item } ) => (
                  <TouchableOpacity
                     onPress={() => setSelectedCategoryId( item.id )}
                     className="items-center ml-5"
                     key={item.id}
                  >
                     <Image
                        source={{ uri: item.image }}
                        className={`w-20 h-20 rounded-full border-2 ${ selectedCategoryId === item.id ? 'opacity-100' : 'opacity-50' } ${ item.id === selectedCategoryId ? 'border-[#086cec]' : 'border-[#e0e0e0]' }`}
                     />
                     <Text className={`mt-2 text-center font-medium ${ selectedCategoryId === item.id ? 'opacity-100' : 'opacity-50' }`}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               )}
               contentContainerStyle={{ paddingBottom: 16 }}
            />
         </View>
      </View>
   );

   const renderFooter = () =>
   {
      return (
         visibleRecipesCount < filteredRecipes.length && filteredRecipes.length > 5 && (
            <TouchableOpacity
               onPress={loadMore}
               style={{ paddingBottom: tabBarHeight * 0.4 }}
               className="items-center"
            >
               <Text className="text-blue-600 font-semibold">Load More</Text>
            </TouchableOpacity>
         )
      );
   };

   return (
      <FlatList
         data={filteredRecipes.slice( 0, visibleRecipesCount )}
         keyExtractor={( item ) => item.id}
         ListHeaderComponent={renderHeader}
         renderItem={( { item } ) => <RecipeCard recipe={item} />}
         ListFooterComponent={renderFooter}
         contentContainerStyle={{ paddingTop: 8 }}
         showsVerticalScrollIndicator={false}
      />
   );
};


export default HomePage;