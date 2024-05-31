import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: 'tomato',
        width: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
        marginTop: -10,
        
    },
    inputText: {
        borderRadius: 15,
        borderColor: 'darkgray',
        borderWidth: 1,
        width: "100%",
        height: 49,
        color: "black",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        marginBottom: 10
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
        marginBottom: 10,
        marginTop: -5
    }
});