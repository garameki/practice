const TIME = 0;
const ENG = 1;
const JAP = 2;
const TIME1 = 0;
const TIME2 = 1;
const ENG2 = 2;
const JAP2 = 3;
let hoge = setInterval(function(){clearInterval(hoge);},1);
let eVideo,eVocabularies,eConversation;

function setButtons(mode) {
	let sHtml = "";
	let LANG;
	if(mode == ENG) LANG = ENG;
	else if(mode == JAP) LANG = JAP;
	else {
		console.error("Error in setButtons() mode = ",mode);
		LANG = ENG;
	}

	for(let ii=0;ii<sentences.length-1;ii++) {
		sHtml += '<button onclick="clearInterval(hoge);eVideo.currentTime='+sentences[ii][TIME].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((sentences[ii+1][TIME]-sentences[ii][TIME])*1000).toString()+');">'+sentences[ii][LANG]+'</button><br>';
	}
	eConversation.innerHTML = sHtml;
};

function setVocabularies(mode) {
	let sHtml = "";
	let LANG;
	if(mode == ENG) LANG = ENG2;
	else if(mode == JAP) LANG = JAP2;
	else {
		console.error("Error in setVocabularies() mode = ",mode);
		LANG = ENG2;
	}

	for(let ii=0;ii<vocabularies.length;ii++) {
		sHtml += '<button onclick="clearInterval(hoge);eVideo.currentTime='+vocabularies[ii][TIME1].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((vocabularies[ii][TIME2]-vocabularies[ii][TIME1])*1000).toString()+');">'+vocabularies[ii][LANG]+'</button><br>';
	}
	eVocabularies.innerHTML = sHtml;
};


onload = function() {

	eVocabularies = document.getElementById('vocabularies');
	eConversation = document.getElementById('conversation');
	eVideo = document.getElementById('video');
	setButtons(JAP);
	setVocabularies(JAP);
};
