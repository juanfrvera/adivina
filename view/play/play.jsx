import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import OutOfTime from "./out-of-time";
import Timer from "./timer";
import WordGuess from "./word-guess";

const STARTING_TIME = 5;

export default function Play(props) {
    const clickBack = () => {
        props.navigation.navigate({ name: "menu" });
    }

    const onReject = () => {
        setRejectedCount(r => r + 1);
        pickFreshWordOrCleanUsedList();
    }
    const onApprove = () => {
        setApprovedCount(a => a + 1);
        pickFreshWordOrCleanUsedList();
    }

    const getRandomNotUsedWord = () => {
        const unusedWords = wordList.filter(w => !usedWords.find(uw => uw.value == w.value));

        return getRandomWord(unusedWords);
    }
    const getRandomWord = (wordList) => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }
    const pickFreshWordOrCleanUsedList = () => {
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
        pickFreshWordOrCleanUsedList();
        setTime(STARTING_TIME);
    }

    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [time, setTime] = useState(STARTING_TIME);
    const [usedWords, setUsedWords] = useState([]);
    const [word, setWord] = useState(getRandomNotUsedWord);

    useEffect(() => setUsedWords(uw => [...uw, word]), [word]);

    let currentSceen;

    if (time > 0) {
        currentSceen = <WordGuess word={word} onReject={onReject} onApprove={onApprove} />
    }
    else {
        currentSceen = <OutOfTime onNext={onNext} />
    }

    return (
        <View style={styles.container}>
            <Button onPress={clickBack} title="Volver"></Button>
            <Timer time={time} setTime={setTime} />
            {currentSceen}
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
    }
})

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