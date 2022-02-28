import { Button, StyleSheet, Text, View } from "react-native";

export default function OutOfTime(props) {
    const clickNext = () => {
        props.onNext();
    }

    return (
        <View>
            <Text style={styles.infoText}>Se acabó el tiempo</Text>
            <Button title="Siguiente turno" onPress={clickNext} />
        </View>
    )
}

const styles = StyleSheet.create({
    infoText: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 15
    }
})