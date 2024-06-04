import { View, Text, ActivityIndicator } from 'react-native'
import Dialog from "react-native-dialog";


const LoadingModal: React.FC<{ visible: boolean, displayMsg: string, indicatorColor: string }> = (props) => {
    return (
        <Dialog.Container visible={props.visible}
            contentStyle={{ backgroundColor: '#F7F7F8', paddingVertical: 0 }}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>

                <ActivityIndicator size={50} color={props.indicatorColor ? props.indicatorColor : 'indigo'} style={{ marginEnd: 30 }} />

                <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, textAlignVertical: 'center' }}>{props.displayMsg}</Text>
            </View>

        </Dialog.Container>
    )
}

export default LoadingModal;
