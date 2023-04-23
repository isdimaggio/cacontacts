import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const getContactData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error("GET: ",error);
    }
}

const getContactsList = async () => {
    const keyList = await AsyncStorage.getAllKeys()
    let finalArray = [];
    // per tutte le chiavi in lista
    for (const key of keyList){
        try {
            if (key.startsWith("@cac_uuid:")) {
                const value = await AsyncStorage.getItem(key);
                if (value){
                    const actualValue = JSON.parse(value);
                    //console.log("sto elaborando ", actualValue.name)
                    let found = false;
                    finalArray.forEach((element) => {
                        // controlla se esiste gia lettera dell'alfabeto
                        if (element.title == actualValue.name.toUpperCase()[0] && !found) {
                            // se si registra in quel posto
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
            }
        } catch (error) {
            console.error("GETALL: ",error);
        }
    }
    //ottieni array finale ordinando alfabeticamente per 'title'
    return finalArray.sort((a, b) => a.title.localeCompare(b.title));;
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
        console.log("ADD: ",error)
        return false;
    }
}

const editContact = async (key, name, birthday, address, phone) => {
    const data = {
        name: name,
        birthday: birthday,
        address: address,
        phone: phone
    }
    try {
        const existing = await AsyncStorage.getItem(key);
        if(existing != null){
            await AsyncStorage.setItem(
                key,
                JSON.stringify(data)
            )
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log("EDIT: ", error)
        return false;
    }
}

const deleteContact = async (key) => {
    try {
        const existing = await AsyncStorage.getItem(key);
        if(existing != null){
            await AsyncStorage.removeItem(key)
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log("DELETE:", error)
        return false;
    }
}

const clearAllData = async () => {
    const keyList = await AsyncStorage.getAllKeys()
    // per tutte le chiavi in lista
    keyList.forEach((key) => {
        // prendi solo le chiavi della nostra app
        if (key.startsWith("@cac_uuid:")) {
            AsyncStorage.getItem(key).then(() => AsyncStorage.removeItem(key));
        }
    })
}

export { getContactData, clearAllData, getContactsList, addContactToList, editContact, deleteContact }