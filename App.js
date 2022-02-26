import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Menu from './view/menu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Play from './view/play/play';

const NavigationStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator>
        <NavigationStack.Screen name="menu" component={Menu} />
        <NavigationStack.Screen name="play" component={Play} />
      </NavigationStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
