import { Button, Text, View } from 'react-native';

export default function Menu(props) {
    const clickPlay = () => {
        props.navigation.navigate({ name: "play" });
    }

    return (
        <View>
            <Text>Taboo</Text>
            <Button onPress={clickPlay} title="Jugar"></Button>
            <Button title="Salir"></Button>
        </View>
    )
}