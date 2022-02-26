import { Button, Text, View } from 'react-native';

function clickPlay() {
    alert("click play")
}

export default function Menu() {
    return (
        <View>
            <Text>Taboo</Text>
            <Button onPress={clickPlay} title="Jugar"></Button>
            <Button title="Salir"></Button>
        </View>
    )
}