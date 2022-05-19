'use strict';
const urlDefaultFlag = '../public/assets/img/flags/european-union.webp';
const mainContent = document.getElementById('main-content');
const inputLider = document.getElementById('nameLider');
const imgFlagLider = document.getElementById('flagLider');
const spanError = document.createElement('span');

class LiderCoontry {
	constructor(name, country, flag){
		this.name = name;
		this.country = country;
		this.flag = flag;
	}
}

const liderUkraine = new LiderCoontry('Zelensky', 'Ukraine', '../public/assets/img/flags/flag-ukraine.webp');
const liderUsa = new LiderCoontry('Biden', 'USA', '../public/assets/img/flags/american-flag.webp');
const liderGermany = new LiderCoontry('Scholz', 'Germany', '../public/assets/img/flags/germany-flag.webp');
const liderItaly = new LiderCoontry('Draghi', 'Italy', '../public/assets/img/flags/Italy-flag.jpg');
const liderCanada = new LiderCoontry('Trudeau', 'Canada', '../public/assets/img/flags/Flag-Canada.svg.webp');
const liderFrance = new LiderCoontry('Macron', 'France', '../public/assets/img/flags/france-flag.webp');
const liderGreatBritain = new LiderCoontry('Johnson', 'Great britain', '../public/assets/img/flags/gb-flag.jpg');
const liderJapan = new LiderCoontry('Kisida', 'Japan', '../public/assets/img/flags/japan-flag.jpg');

const arrLiders = [liderUkraine, liderUsa, liderGermany, liderItaly, liderCanada, liderFrance, liderGreatBritain, liderJapan];

async function setFlag (path){
	const response = await fetch(path);
	if (response.ok) {
		const pathFlag = await response.blob();
		imgFlagLider.src = URL.createObjectURL(pathFlag);
		if (mainContent.contains(spanError)) mainContent.removeChild(spanError);
	} else {
		mainContent.appendChild(spanError);
		spanError.textContent = `Error flag ${response.statusText}`;
		imgFlagLider.classList.add('error');
		inputLider.classList.add('error');
	}
}
function clearInput(e){
	if (e.code === 'Enter' || e.code === 'NumpadEnter'){
		inputLider.value ='';
		setFlag(urlDefaultFlag);
		fallsEmpty();
	}
}
function trueEmpty(){
	imgFlagLider.classList.add('img-light');
	inputLider.classList.add('img-light');
}
function fallsEmpty(){
	imgFlagLider.classList.remove('img-light');
	inputLider.classList.remove('img-light');
	imgFlagLider.classList.remove('error');
	inputLider.classList.remove('error');
}
function setliderGlag (){
	const url = arrLiders.filter(element => element.name.toLowerCase() === inputLider.value.toLowerCase())[0];
	if (!url) {
		setFlag(urlDefaultFlag);
		fallsEmpty();
	} else {
		setFlag(url.flag);
		trueEmpty ();
	}
}

spanError.classList.add('error-message');
inputLider.addEventListener('keydown', clearInput);
inputLider.addEventListener('input', setliderGlag);
