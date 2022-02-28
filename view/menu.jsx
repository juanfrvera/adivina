import { Button, StyleSheet, Text, View } from 'react-native';

export default function Menu(props) {
    const clickPlay = () => {
        props.navigation.navigate({ name: "play" });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Adivina la palabra</Text>
            <Button onPress={clickPlay} title="Jugar" />
            <Button title="Salir" style={styles.actionButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        padding: 10
    },
    titleText: {
        textAlign: "center",
        fontSize: 48
    },
    actionButton: {
        fontSize: 48
    }
})