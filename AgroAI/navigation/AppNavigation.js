import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CostProfitScreen from "../screens/CostProfitScreen";
import CropDiseaseScreen from "../screens/CropDiseaseScreen";
import SoilHealthScreen from "../screens/SoilHealthScreen";
import IrrigationAdvisorScreen from "../screens/IrrigationAdvisorScreen";
import FertilizerGuideScreen from "../screens/FertilizerGuideScreen";
import SpeechToTextScreen from "../screens/SpeechToTextScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CostProfit"
          component={CostProfitScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CropDisease"
          component={CropDiseaseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SoilHealth"
          component={SoilHealthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IrrigationAdvisor"
          component={IrrigationAdvisorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FertilizerGuide"
          component={FertilizerGuideScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpeechToText"
          component={SpeechToTextScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
