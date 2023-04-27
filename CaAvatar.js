import { Avatar } from 'react-native-paper';
import React from 'react';
import seedrandom from "seedrandom"
import { View } from 'react-native';


const CaAvatar = ({ size, uid, name }) => {

	/* 
	   questa funzione genera un colore pseudo-randomico per ogni avatar.
	   per ogni uuid dato viene generato sempre lo stesso colore.
	   non funziona perchè l'implementazione di random su react 
	   native non prevede "seed stringhe"
	*/
	
	function generateRandomNumber(str, max) {
		// Use the string as a seed for the random function
		var seed = 0;
		for (var i = 0; i < str.length; i++) {
			seed += str.charCodeAt(i);
		}
		seedrandom(seed);
	
		// Generate a random number between 0 and max-1
		var randomNumber = Math.floor(Math.random() * max);
	
		return randomNumber;
	}

	// lista colori da cui scegliere
	const colorList = [
		"#403F4C",
		"#E84855",
		"#F9DC5C",
		"#3185FC",
		"#EFBCD5"
	];

	// genera un numero randomico usando lo uid del contatto come seed 
	// per ottenere sempre lo stesso colore con lo stesso uid
	
	//const pickedColor = colorList[generateRandomNumber(uid, colorList.length)]

	const pickedColor = "#C7C7CC"; // usa sempre lo stesso colore (per ora)

	const getInitials = (str) => {
		// se la stringa non è splittabile ritorna --
		if (str == undefined || str == "" || !str) {
			return ("--")
		}

		let words = str.split(" ");
		let initials = "";

		// prendi solo le prime due iniziali delle prime due parole del nome
		for (let i = 0; i < 2; i++) {
			if (words[i] !== undefined) {
				// e falle maiuscole
				initials += words[i].charAt(0).toUpperCase();
			}
		}

		return initials;
	}

	return (
		<View>
			<Avatar.Text size={size} style={{
				backgroundColor: pickedColor
			}} label={getInitials(name)} />
		</View>
	);
}

export default CaAvatar;
