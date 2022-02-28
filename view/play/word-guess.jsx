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
        return <Text key={index} style={styles.prohibitedWord}>{p}</Text>
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.mainWord}>{word.value}</Text>
                <ScrollView>{prohibitedListModel}</ScrollView>
            </View>
            <View style={styles.actions}>
                <Button onPress={clickReject} title="Mal" style={styles.action} color="#a22" />
                <Button onPress={clickApprove} title="Bien" style={styles.action} color="#2a2" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        justifyContent: "space-between",
        marginTop: 50,
        marginBottom: 50
    },
    mainWord: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20
    },
    prohibitedWord: {
        fontSize: 20,
        color: "#faa",
        textAlign: "center",
        marginBottom: 10
    },
    actions: {
        justifyContent: "space-around",
        flex: 0.5,
    },
    action: {
        padding: 20
    }
})