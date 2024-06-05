import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: 'tomato',
        width: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
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
    searchInput: {
        backgroundColor: 'white',
        color: 'black',
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        marginTop: 16,
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
    },
    oAuthButton: {
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
        marginBottom: 20,
    },
    errorLabel: {
        color: 'red',
        marginBottom: 2,
        marginStart: 8,
        fontSize: 12
    },
});