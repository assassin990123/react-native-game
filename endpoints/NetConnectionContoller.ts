import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
// import AsyncStorage from "@react-native-async-storage/async-storage";

async function isNetConnected(): Promise<boolean> {
    // @ts-ignore
    let isConnected = false;

    await NetInfo.fetch().then((state: NetInfoState) => {
        if (state.isConnected != null) {
            isConnected = state.isConnected;
        } else {
            isConnected = false;
        }
    });

    return isConnected;
    // return false;
}

export default isNetConnected;
