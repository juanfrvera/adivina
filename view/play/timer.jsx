import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Timer(props) {
    const [time, setTime] = useState(() => 10);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(t => t - 1)
        }, 1000);

        // eliminate the potential of stacking intervals and causing an error
        return () => clearInterval(timer);
    }, []);

    return (<Text>{time}</Text>)
}