/* for mode */
const MODE_ENG = 1;
const MODE_JAP = 2;
/* for Canvasation */
const TIME1 = 0;
const PERSON1 = 1;
const ENG1 = 2;
const JAP1 = 3;
/* for Vocabularies */
const TIME2_S = 0; /* start time */
const TIME2_E = 1; /* end time */
const ENG2 = 2;
const JAP2 = 3;
/* for Express */
const TIME3Q_S = 0; /* start time */
const TIME3Q_E = 1; /* end time */
const TIME3A_S = 2; /* start time */
const TIME3A_E = 3; /* end time */
let hoge = setInterval(function(){clearInterval(hoge);},1);
let eVideo,eVocabularies,eConversation;

function setButtons(mode) {
	let LANG;
	if(mode == MODE_ENG) LANG = ENG1;
	else if(mode == MODE_JAP) LANG = JAP1;
	else {
		console.error("Error in setButtons() mode = ",mode);
		LANG = ENG1;
	}

	const size = ["23","17"];
	let sHtml = "<table>";
	let nBeforePerson = 0;
	for(let ii=0;ii<sentences.length-1;ii++) {
		let pp = sentences[ii][PERSON1];
		if(nBeforePerson != pp) {
			if(nBeforePerson != 0) {
				sHtml += "</td></tr>"
			}
			sHtml += '<tr><td valign="top">' + names[pp-1] + ':</td><td>';
			nBeforePerson = pp;
		}
	//	sHtml += '<button style="font-size:' + size[mode-1] + 'px;" onclick="clearInterval(hoge);eVideo.currentTime='+sentences[ii][TIME1].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((sentences[ii+1][TIME1]-sentences[ii][TIME1])*1000).toString()+');">'+sentences[ii][LANG]+'</button>';
		sHtml += '<button style="font-size:' + size[mode-1] + 'px;" onclick="clearInterval(hoge);eVideo.currentTime='+sentences[ii][TIME1].toString()+';eVideo.play();hoge = setInterval(function() {eVideo.currentTime='+sentences[ii][TIME1].toString()+';eVideo.play();},'+((sentences[ii+1][TIME1]-sentences[ii][TIME1])*1000).toString()+');">'+sentences[ii][LANG]+'</button>';
	}
	eConversation.innerHTML = sHtml;
};

function setVocabularies(mode) {
	const size = ["23","17"];
	let sHtml = "";
	let LANG;
	if(mode == MODE_ENG) LANG = ENG2;
	else if(mode == MODE_JAP) LANG = JAP2;
	else {
		console.error("Error in setVocabularies() mode = ",mode);
		LANG = ENG2;
	}

	for(let ii=0;ii<vocabularies.length;ii++) {
		//sHtml += '<button style="font-size:' + size[mode-1] + 'px;" onclick="clearInterval(hoge);eVideo.currentTime='+vocabularies[ii][TIME2_S].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((vocabularies[ii][TIME2_E]-vocabularies[ii][TIME2_S])*1000).toString()+');">'+vocabularies[ii][LANG]+'</button><br>';
		sHtml += '<button style="font-size:' + size[mode-1] + 'px;" onclick="clearInterval(hoge);eVideo.currentTime='+vocabularies[ii][TIME2_S].toString()+';eVideo.play();hoge = setInterval(function() {eVideo.currentTime='+vocabularies[ii][TIME2_S].toString()+';eVideo.play();},'+((vocabularies[ii][TIME2_E]-vocabularies[ii][TIME2_S])*1000).toString()+');">'+vocabularies[ii][LANG]+'</button><br>';
	}
	eVocabularies.innerHTML = sHtml;
};


function setExpress(element) {
	let sHtml = "";

	for(let ii=0;ii<expresses.length;ii++) {
		sHtml += '<button onclick="clearInterval(hoge);eVideo.currentTime='+expresses[ii][TIME3Q_S].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((expresses[ii][TIME3Q_E]-expresses[ii][TIME3Q_S])*1000).toString()+');">Question No.' + (ii+1).toString() + '</button> ';
		sHtml += '<button onclick="clearInterval(hoge);eVideo.currentTime='+expresses[ii][TIME3A_S].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((expresses[ii][TIME3A_E]-expresses[ii][TIME3A_S])*1000).toString()+');">Answer</button><br>';
	}
	element.innerHTML = sHtml;
};


onload = function() {

	eVocabularies = document.getElementById('vocabularies');
	eConversation = document.getElementById('conversation');
	eExpress = document.getElementById('express');
	eVideo = document.getElementById('video');
	setButtons(MODE_JAP);
	setVocabularies(MODE_JAP);
	setExpress(eExpress);
};
