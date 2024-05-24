import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: 'tomato',
        width: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2
    },
    inputText: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        color: "black",

        backgroundColor: "#fff",
        paddingHorizontal: 15
    },
    googleButton: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        padding: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        marginBottom: 10
    }
});