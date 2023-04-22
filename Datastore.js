import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const getContactData = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

const getContactsList = async () => {
    const keyList = await AsyncStorage.getAllKeys()
    let finalArray = [];
    // per tutte le chiavi in lista
    for (const key of keyList){
        try {
            if (key.startsWith("@cac_uuid:")) {
                const value = await AsyncStorage.getItem(key);
                const actualValue = JSON.parse(value);
                //console.log("sto elaborando ", actualValue.name)
                let found = false;
                finalArray.forEach((element) => {
                    // controlla se esiste gia lettera dell'alfabeto
                    if (element.title == actualValue.name.toUpperCase()[0] && !found) {
                        // se si registra la
                        element.data.push({key: key, value: actualValue.name})
                        found = true;
                    }
                });
                // non ho trovato lettera dell'alfabeto presente, creo e registro
                if (!found){
                    finalArray.push(
                        {
                            title: actualValue.name[0].toUpperCase(),
                            data: [{key: key, value: actualValue.name}]
                        }
                    )
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    //ottieni array finale
    return finalArray;
}

const addContactToList = async (name, birthday, address, phone) => {
    const data = {
        name: name,
        birthday: birthday,
        address: address,
        phone: phone
    }
    try {
        await AsyncStorage.setItem(
            "@cac_uuid:" + uuid.v4(), // un uuid random evita ogni collisione
            JSON.stringify(data)
        )
        return true;
    } catch (error) {
        console.log(error)
    }
}

const clearAllData = async () => {
    const keyList = await AsyncStorage.getAllKeys()
    // per tutte le chiavi in lista
    keyList.forEach((key) => {
        // prendi solo le chiavi della nostra app
        if (key.startsWith("@cac_uuid:")) {
            AsyncStorage.getItem(key).then((value) => AsyncStorage.removeItem(key));
        }
    })
}

export { getContactData, clearAllData, getContactsList, addContactToList }