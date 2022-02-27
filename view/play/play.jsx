import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import Timer from "./timer";

export default function Play(props) {
    const clickBack = () => {
        props.navigation.navigate({ name: "menu" });
    }

    const clickReject = () => {
        setRejectedCount(a => a + 1);

        pickFreshWordOrRestart();
    }
    const clickApprove = () => {
        setApprovedCount(a => a + 1);

        pickFreshWordOrRestart();
    }
    const getRandomNotUsedWord = () => {
        const unusedWords = wordList.filter(w => !usedWords.find(uw => uw.value == w.value));

        return getRandomWord(unusedWords);
    }
    const getRandomWord = (wordList) => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }
    const pickFreshWordOrRestart = () => {
        const freshWord = getRandomNotUsedWord();

        if (freshWord) {
            setWord(freshWord);
        }
        else {
            setUsedWords([]);
            setWord(getRandomWord(wordList));
        }
    }

    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [usedWords, setUsedWords] = useState([]);
    const [word, setWord] = useState(getRandomNotUsedWord);

    useEffect(() => {
        setUsedWords(uw => [...uw, word]);
    }, [word]);

    const prohibitedListModel = word.prohibited.map((p, index) => {
        return <Text key={index}>{p}</Text>
    });

    return (
        <View>
            <Button onPress={clickBack} title="Volver"></Button>
            <Timer startingValue="20"></Timer>
            <View>
                <Text>{word.value}</Text>
                <ScrollView>{prohibitedListModel}</ScrollView>
            </View>
            <Button onPress={clickReject} title="Mal"></Button>
            <Button onPress={clickApprove} title="Bien"></Button>
            <Text>Rechazadas: {rejectedCount}</Text>
            <Text>Aprobadas: {approvedCount}</Text>
        </View>
    )
}

const wordList = [
    {
        value: "Auto",
        prohibited: [
            "Ruedas",
            "Vehículo",
            "Manejar",
            "Transporte"
        ]
    },
    {
        value: "Botella",
        prohibited: [
            "Tomar",
            "Beber",
            "Recipiente",
            "Bebida"
        ]
    },
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
        value: "Televisor",
        prohibited: [
            "Mirar",
            "Pantalla",
            "Monitor",
            "Canales"
        ]
    },
    {
        value: "Zapatillas",
        prohibited: [
            "Caminar",
            "Pies",
            "Cordones",
            "Zapatos"
        ]
    },
]