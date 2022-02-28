import { Button, Text, View } from "react-native";

export default function OutOfTime(props) {
    const clickNext = () => {
        props.onNext();
    }

    return (
        <View>
            <View>
                <Text>Se acabó el tiempo</Text>
            </View>
            <Button title="Siguiente turno" onPress={clickNext} />
        </View>
    )
}