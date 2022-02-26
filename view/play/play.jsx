import { Button, ScrollView, Text, View } from "react-native";
import Timer from "./timer";

export default function Play(props) {
    const clickBack = () => {
        props.navigation.navigate({ name: "menu" });
    }

    const clickReject = () => {

    }
    const clickApprove = () => {

    }

    const word = wordList[Math.floor(Math.random() * wordList.length)];

    const prohibitedListModel = word.prohibited.map((p, index) => {
        return <Text key={index}>{p}</Text>
    });

    return (
        <View>
            <Button onPress={clickBack} title="Volver"></Button>
            <Timer></Timer>
            <View>
                <Text>{word.value}</Text>
                <ScrollView>{prohibitedListModel}</ScrollView>
            </View>
            <Button onPress={clickReject} title="Mal"></Button>
            <Button onPress={clickApprove} title="Bien"></Button>
        </View>
    )
}

const wordList = [
    {
        value: "Reloj",
        prohibited: [
            "Tiempo",
            "Hora",
            "Contar",
            "Agujas"
        ]
    },
    {
        value: "Auto",
        prohibited: [
            "Ruedas",
            "Vehículo",
            "Manejar",
            "Transporte"
        ]
    }
]