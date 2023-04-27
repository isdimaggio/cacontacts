import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

// i try catch fermano gli errori per poi debuggare in console

const getContactData = async (key) => {
    try {
        // fai una query al datastore per la chiave dell'elemento ricercato
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error("GET: ",error);
    }
}
/*
    a partire dagli elementi JSON nel datastore genera un array del tipo
    [
        {
            title: "INIZIALE"
            data: [
                {key: UUID, value: NOMECOGNOME},
                ....
            ]
        },
        ....
    ]
*/
const getContactsList = async () => {
    // prendi tutte le chiavi del datastore di RN
    const keyList = await AsyncStorage.getAllKeys()
    let finalArray = []; // crea un array vuoto
    // per tutte le chiavi in lista
    for (const key of keyList){
        try {
            // controlla che la entry sia stata prodotta dalla nostra app
            if (key.startsWith("@cac_uuid:")) {
                // fetch di quella key
                const value = await AsyncStorage.getItem(key);
                if (value){
                    // trasforma il valore di quella key da stringa JSON a un oggetto
                    const actualValue = JSON.parse(value);
                    let found = false;
                    // prima di aggiungere all'arra
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
    //ottieni array finale ordinando alfabeticamente per 'title' (vedi struttura di sopra)
    return finalArray.sort((a, b) => a.title.localeCompare(b.title));;
}

// aggiunta del contatto
const addContactToList = async (name, birthday, address, phone) => {
    // prepara la struttura dati
    const data = {
        name: name,
        birthday: birthday,
        address: address,
        phone: phone
    }
    try {
        // genera uuid random e memorizza nel datastore
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

// funziona tale e quale all'add ma chiede la chiave di chi esiste già
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

// data una chiave cancella il contatto, controlla prima se esiste
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

// cancella tutti i contatti (utilizzata solo in fase di debug)
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