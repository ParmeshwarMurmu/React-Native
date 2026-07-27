import Boots from "@/components/Boots";
import CasualShoes from "@/components/CasualShoes";
import FlatShoes from "@/components/FlatShoes";
import FormalShirts from "@/components/FormalShirts";
import FormalShoes from "@/components/FormalShoes";
import KurtasKurtis from "@/components/KurtasKurtis";
import LehengaCholis from "@/components/LehengaCholis";
import MenAll from "@/components/MenAll";
import Saree from "@/components/Saree";
import TrackPants from "@/components/TrackPants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationIndependentTree } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTab = createMaterialTopTabNavigator();

const AllProducts = () => (
  <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
    <TrackPants />
    <Saree />
    <FormalShirts />
    <KurtasKurtis />
    <LehengaCholis />
    <Boots />
    <FlatShoes />
    <FormalShoes />
    <CasualShoes />
  </ScrollView>
);

const Men = () => (
  <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
    <MenAll />
  </ScrollView>
);

const Women = () => (
  <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
    <Saree />
    <KurtasKurtis />
    <LehengaCholis />
  </ScrollView>
);

const Shoes = () => (
  <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
    <Boots />
    <FlatShoes />
    <FormalShoes />
    <CasualShoes />
  </ScrollView>
);

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationIndependentTree>
        <TopTab.Navigator
          screenOptions={{
            lazy: true,
          }}
        >
          <TopTab.Screen name="All" component={AllProducts} />
          <TopTab.Screen name="Men" component={Men} />
          <TopTab.Screen name="Women" component={Women} />
          <TopTab.Screen name="Shoes" component={Shoes} />
        </TopTab.Navigator>
      </NavigationIndependentTree>
    </SafeAreaView>
  );
};

export default Home;
