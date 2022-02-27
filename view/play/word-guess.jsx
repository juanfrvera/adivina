import { Button, ScrollView, Text, View } from "react-native";

export default function WordGuess(props) {
    const clickReject = () => {
        props.onReject();
    }
    const clickApprove = () => {
        props.onApprove();
    }

    const word = props.word;

    const prohibitedListModel = word.prohibited.map((p, index) => {
        return <Text key={index}>{p}</Text>
    });

    return (
        <View>
            <View>
                <Text>{word.value}</Text>
                <ScrollView>{prohibitedListModel}</ScrollView>
            </View>
            <Button onPress={clickReject} title="Mal"></Button>
            <Button onPress={clickApprove} title="Bien"></Button>
        </View>
    )

}