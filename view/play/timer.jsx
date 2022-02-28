import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function Timer(props) {
    const time = props.time;
    const setTime = props.setTime;

    const createTimer = () => {
        return setInterval(() => {
            setTime(t => t - 1);
        }, 1000);
    }

    const [timer, setTimer] = useState(createTimer);
    const prevTime = usePrevious(time);

    useEffect(() => {
        if (prevTime != undefined) {
            if (prevTime > 0) {
                if (time == 0) {
                    // Time passed from 1 to 0, stop the timer
                    clearInterval(timer);
                }
            }
            else {
                if (time > 0) {
                    // Time passed from 0 to > 0, start the timer
                    setTimer(createTimer);
                }
            }
        }
    }, [time]);

    // Clear the timer interval when the component unmounts
    useEffect(() => () => clearInterval(timer), []);

    return (<Text style={styles.timer}>{time}</Text>)
}

const styles = StyleSheet.create({
    timer: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 32
    }
})