import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabsLayout = () => 
{
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: '#086cec',
            tabBarStyle: {
               paddingBottom: 6,
               paddingTop: 3,
               backgroundColor: '#f2f2f2',
               borderTopWidth: 0,
               height: '6%'
            },
            tabBarLabelStyle: {
               fontSize: 12,
               fontWeight: '400',
               marginTop: -5
            },
         }}
         initialRouteName="index"
      >
         <Tabs.Screen
            name="index"
            options={{
               title: 'Home',
               tabBarIcon: ( { color } ) => <FontAwesome size={28} name="home" color={color} />,
               headerShown: false
            }}
         />
         {/* <Tabs.Screen
            name="settings"
            options={{
               title: 'Settings',
               tabBarIcon: ( { color } ) => <FontAwesome size={28} name="cog" color={color} />,
            }}
         /> */}
      </Tabs>
   );
};

export default TabsLayout;