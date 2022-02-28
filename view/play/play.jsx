import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import OutOfTime from "./out-of-time";
import Timer from "./timer";
import WordGuess from "./word-guess";

const STARTING_TIME = 60;

export default function Play(props) {
    const clickBack = () => {
        props.navigation.navigate({ name: "menu" });
    }

    const onReject = () => {
        setRejectedCount(r => r + 1);
        addWordToUsedWords(word);
    }
    const onApprove = () => {
        setApprovedCount(a => a + 1);
        addWordToUsedWords(word);
    }

    const getRandomWord = (wordList) => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    const onNext = () => {
        addWordToUsedWords(word);
        setTime(STARTING_TIME);
    }

    const addWordToUsedWords = (addedWord) => {
        setUsedWords(uw => [...uw, addedWord.value]);
    }

    const getStorageUsedWords = async () => {
        const storageString = await AsyncStorage.getItem(storageKeys.usedWordList);

        if (storageString) {
            return JSON.parse(storageString);
        }
        else {
            return [];
        }
    }

    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [time, setTime] = useState(STARTING_TIME);

    // It is started as null to be able to differentiate from an empty array
    const [usedWords, setUsedWords] = useState(null);
    const [word, setWord] = useState(null);

    // OnMount effect
    useEffect(async () => {
        const storageUsedWords = await getStorageUsedWords();

        if (storageUsedWords.length) {
            console.log(storageUsedWords);
        }
        else {
            console.log("No se encontraron palabras usadas en el storage");
        }

        setUsedWords(storageUsedWords);
    }, []);

    // After a word is added to usedWords, pick a new one and save the old in storage
    useEffect(() => {
        if (usedWords) {
            AsyncStorage.setItem(storageKeys.usedWordList, JSON.stringify(usedWords));

            const unusedWords = wordList.filter(w => !usedWords.find(uw => uw == w.value));
            const newWord = getRandomWord(unusedWords);

            if (newWord && (!word || newWord.value != word.value)) {
                setWord(newWord);
            }
            else {
                // Reset used words
                setUsedWords([]);
            }
        }
    }, [usedWords])

    let currentScreen;

    if (time > 0) {
        if (word) {
            currentScreen = (
                <View>
                    <Timer time={time} setTime={setTime} />
                    <WordGuess word={word} onReject={onReject} onApprove={onApprove} />
                </View>
            );
        }
        else {
            currentScreen = <Text style={styles.loadingWordText}>Buscando palabra...</Text>
        }
    }
    else {
        currentScreen = <OutOfTime onNext={onNext} />
    }

    return (
        <View style={styles.container}>
            <Button onPress={clickBack} title="Volver"></Button>
            {currentScreen}
            <View>
                <Text>Rechazadas: {rejectedCount}</Text>
                <Text>Aprobadas: {approvedCount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10
    },
    loadingWordText: {
        fontSize: 32,
        textAlign: "center"
    }
})

const storageKeys = {
    usedWordList: "USED_WORD_LIST"
}

const wordList = [
    {
        value: "Aceituna",
        prohibited: [
            "Pizza",
            "Oliva",
            "Aceite",
            "Carozo"
        ]
    },
    {
        value: "Anciano",
        prohibited: [
            "Viejo",
            "Señor",
            "PAMI",
            "Abuelo"
        ]
    },
    {
        value: "Arquitecto",
        prohibited: [
            "Construir",
            "Diseño",
            "Casa",
            "Edificio"
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
    },
    {
        value: "Batidora",
        prohibited: [
            "Batir",
            "Tortas",
            "Mezclar",
            "Electrodomestico"
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
        value: "Cantar",
        prohibited: [
            "Música",
            "Voz",
            "Famoso",
            "Intrumento"
        ]
    },
    {
        value: "Carnaval",
        prohibited: [
            "Brillos",
            "Batucada",
            "Música",
            "Baile"
        ]
    },
    {
        value: "Casamiento",
        prohibited: [
            "Anillos",
            "Boda",
            "Matrimonio",
            "Pareja"
        ]
    },
    {
        value: "Correo",
        prohibited: [
            "Paquete",
            "Mercadolibre",
            "Gmail",
            "Cartero"
        ]
    },
    {
        value: "Dedal",
        prohibited: [
            "Dedo",
            "Coser",
            "Tejer",
            "Pinchar"
        ]
    },
    {
        value: "Garrafa",
        prohibited: [
            "Gas",
            "Cocina",
            "Gasista",
            "Pesada"
        ]
    },
    {
        value: "Guitarra",
        prohibited: [
            "Cuerdas",
            "Tocar",
            "Fogata",
            "Música"
        ]
    },
    {
        value: "Kiosco",
        prohibited: [
            "Negocio",
            "Comprar",
            "Vender",
            "Tienda"
        ]
    },
    {
        value: "Lluvia",
        prohibited: [
            "Mojado",
            "Gotas",
            "Agua",
            "Paraguas"
        ]
    },
    {
        value: "Mesa",
        prohibited: [
            "Apoyar",
            "Comer",
            "Soporte",
            "Silla"
        ]
    },
    {
        value: "Mueble",
        prohibited: [
            "Movil",
            "Mudanza",
            "Casa",
            "Guardar"
        ]
    },
    {
        value: "Naranja",
        prohibited: [
            "Fruta",
            "Color",
            "Tarjeta",
            "Cítrico"
        ]
    },
    {
        value: "Negocio",
        prohibited: [
            "Vender",
            "Comprar",
            "Tienda",
            "Mercado"
        ]
    },
    {
        value: "Parque de diversiones",
        prohibited: [
            "Montaña rusa",
            "Diversión",
            "Juegos",
            "Niños"
        ]
    },
    {
        value: "Pavimento",
        prohibited: [
            "Cemento",
            "Suelo",
            "Calle",
            "Ruta"
        ]
    },
    {
        value: "Pelota",
        prohibited: [
            "Patear",
            "Esfera",
            "Redonda",
            "Inflar"
        ]
    },
    {
        value: "Picaporte",
        prohibited: [
            "Abrir",
            "Puerta",
            "Cerrojo",
            "Cerradura"
        ]
    },
    {
        value: "Planeta",
        prohibited: [
            "Sistema solar",
            "Espacio",
            "Atronauta",
            "Explorar"
        ]
    },
    {
        value: "Poker",
        prohibited: [
            "Cartas",
            "Silencio",
            "Face",
            "Juego"
        ]
    },
    {
        value: "Portarretratos",
        prohibited: [
            "Foto",
            "Cuadro",
            "Recuerdo",
            "Madera"
        ]
    },
    {
        value: "Puerta",
        prohibited: [
            "Abrir",
            "Portal",
            "Picaporte",
            "Cerradura"
        ]
    },
    {
        value: "Radio",
        prohibited: [
            "Escuchar",
            "Emisora",
            "Frecuencia",
            "Onda"
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
        value: "Ricota",
        prohibited: [
            "Ravioles",
            "Blanca",
            "Comer",
            "Redonditos"
        ]
    },
    {
        value: "Roquefort",
        prohibited: [
            "Queso",
            "Verde",
            "Muzzarella",
            "Pizza"
        ]
    },
    {
        value: "Rueda",
        prohibited: [
            "Auto",
            "Gira",
            "Redonda",
            "Transporte"
        ]
    },
    {
        value: "Sahumerio",
        prohibited: [
            "Olor",
            "Ambiente",
            "Fuego",
            "Humo"
        ]
    },
    {
        value: "Sangre",
        prohibited: [
            "Rojo",
            "Sale",
            "Lastimadura",
            "Vampiro"
        ]
    },
    {
        value: "Serpiente",
        prohibited: [
            "Picadura",
            "Arrastra",
            "Lengua",
            "Víbora"
        ]
    },
    {
        value: "Silbar",
        prohibited: [
            "Chiflar",
            "Boca",
            "Sonido",
            "Ruido"
        ]
    },
    {
        value: "Sol",
        prohibited: [
            "Luz",
            "Luna",
            "Estrella",
            "Iluminar"
        ]
    },
    {
        value: "Surubí",
        prohibited: [
            "Pez",
            "Pescado",
            "Mar",
            "Agua"
        ]
    },
    {
        value: "Tarta",
        prohibited: [
            "Comer",
            "Redonda",
            "Porción",
            "Rebanada"
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
        value: "Títere",
        prohibited: [
            "Manejar",
            "Actuar",
            "Teatro",
            "Muñeco"
        ]
    },
    {
        value: "Torpedo",
        prohibited: [
            "Misil",
            "Submarino",
            "Barco",
            "Disparar"
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