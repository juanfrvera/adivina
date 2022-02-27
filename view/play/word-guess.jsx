import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

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
        <View style={styles.container}>
            <View style={styles.card}>
                <Text>{word.value}</Text>
                <ScrollView>{prohibitedListModel}</ScrollView>
            </View>
            <View style={styles.actions}>
                <Button onPress={clickReject} title="Mal"></Button>
                <Button onPress={clickApprove} title="Bien"></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    card: {
    },
    actions: {
    }
})