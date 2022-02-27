import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Timer(props) {
    const createTimer = () => {
        return setInterval(() => {
            setTime(t => t - 1);
        }, 1000);
    }

    const [time, setTime] = useState(() => props.startingValue);
    const [timer, setTimer] = useState(createTimer);

    useEffect(() => {
        if (time == 0) {
            props.onEnd();
            clearInterval(timer);
        }
    }, [time]);
    // Clear the timer interval when the component unmounts
    useEffect(() => () => clearInterval(timer), []);

    return (<Text>{time}</Text>)
}