import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import OutOfTime from "./out-of-time";
import Timer from "./timer";
import WordGuess from "./word-guess";

const STARTING_TIME = 30;

export default function Play(props) {
    const clickBack = () => {
        props.navigation.navigate({ name: "menu" });
    }

    const onReject = () => {
        setRejectedCount(r => r + 1);
        pickFreshWordOrRestart();
    }
    const onApprove = () => {
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

    const onNext = () => {
        setTime(STARTING_TIME);
    }

    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [time, setTime] = useState(STARTING_TIME);
    const [usedWords, setUsedWords] = useState([]);
    const [word, setWord] = useState(getRandomNotUsedWord);

    useEffect(() => {
        setUsedWords(uw => [...uw, word]);
    }, [word]);

    let currentSceen;

    if (time > 0) {
        currentSceen = <WordGuess word={word} onReject={onReject} onApprove={onApprove} />
    }
    else {
        currentSceen = <OutOfTime onNext={onNext} />
    }

    return (
        <View>
            <Button onPress={clickBack} title="Volver"></Button>
            <Timer time={time} setTime={setTime} />
            {currentSceen}
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