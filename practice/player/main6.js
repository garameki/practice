

//prototype chainを使うための関数
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};



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




let hoge = setInterval(function(){clearInterval(hoge);},1);
let eVideo = void 0;
let eWordsAns = void 0;/*答えを描きこむエレメント onclickに埋め込むためにグローバル変数を用いる*/



/*言語の切り替え用クロージャ*/
/* ENG1とJAP1を使っています。*/
function ChangeLanguage(modeInit) {
	let mode;
	if (modeInit == JAP1) mode = ENG1;
	else if (modeInit == ENG1) mode = JAP1;
	else {
		console.error('modeInit = ',modeInit,' in ChangeLanguage()');
	}
	mode = modeInit;
	return function() {
		if (mode == ENG1) mode = JAP1;
		else if(mode == JAP1) mode = ENG1;
		else {
			console.error('mode = ',mode,' in ChangeLanguage');
			mode = ENG1;
		}
		return mode;
	};
};









const ClsButtons = function (sVariable,elementVideo,elementButton,contents) {
	this.changeLang = new ChangeLanguage(ENG1);
	this.switchLang();/*初期化 言語は入れ替わる*/
	this.elementB = elementButton;
	this.elementV = elementVideo;
	this.contents = contents;
	this.sVariable = sVariable;
	this.numFocus = 0;
};
ClsButtons.prototype.numForcus = 0;/*フォーカスされているボタン*/
ClsButtons.prototype.switchLang = function() {
	if(this.changeLang() == ENG1) {
		this.size = 22;
		this.lang = ENG1;
	} else {
		this.size = 22;
		this.lang = JAP1;
	}
};
ClsButtons.prototype.swDraw = function() {
	this.switchLang();
	this.draw();
};
ClsButtons.prototype.draw = function() {
	/*オーバーライドしてください*/
};





/*ClsButtonsを継承*/
const ClsConversations2 = function (sVariable,elementVideo,elementButton,contents) {
	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);
};
inherits(ClsConversations2,ClsButtons);
ClsConversations2.prototype.draw = function() {
	let sHtml = '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	sHtml += "<table>";
	let nBeforePerson = 0;
	for(let ii=0;ii<this.contents.length-1;ii++) {
		let pp = this.contents[ii][PERSON1];
		if(nBeforePerson != pp) {
			if(nBeforePerson != 0) {
				sHtml += "</td></tr>"
			}
			sHtml += '<tr><td valign="top"><span style="font-weight:900;">' + htmlNames[pp-1] + '</span>:</td><td>';
			nBeforePerson = pp;
		}
		sHtml += '<button id="'+this.sVariable+ii.toString()+'"style="border:solid 0px white;background-color:white;font-size:' + this.size + 'px;" onfocus="'+this.sVariable+'.numFocus='+ii+';" onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][TIME1].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][TIME1].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii+1][TIME1]-this.contents[ii][TIME1])*1000).toString()+');">'+this.contents[ii][this.lang]+'</button><br>';
	}
	sHtml += '</table>';

	sHtml += '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	this.elementB.innerHTML = sHtml;
	console.log(this.sVariable+this.numFocus.toString(),888);
	document.getElementById(this.sVariable+this.numFocus.toString()).focus();
};



const ClsConversations = function (sVariable,elementVideo,elementButton,contents) {
	this.changeLang = new ChangeLanguage(ENG1);
	this.switchLang();/*初期化 言語は入れ替わる*/
	this.elementB = elementButton;
	this.elementV = elementVideo;
	this.contents = contents;
	this.sVariable = sVariable;
	this.numFocus = 0;
};
ClsConversations.prototype.numForcus = 0;/*フォーカスされているボタン*/
ClsConversations.prototype.switchLang = function() {
	if(this.changeLang() == ENG1) {
		this.size = 22;
		this.lang = ENG1;
	} else {
		this.size = 22;
		this.lang = JAP1;
	}
};
ClsConversations.prototype.swDraw = function() {
	this.switchLang();
	this.draw();
};
ClsConversations.prototype.draw = function() {
	let sHtml = '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	sHtml += "<table>";
	let nBeforePerson = 0;
	for(let ii=0;ii<this.contents.length-1;ii++) {
		let pp = this.contents[ii][PERSON1];
		if(nBeforePerson != pp) {
			if(nBeforePerson != 0) {
				sHtml += "</td></tr>"
			}
			sHtml += '<tr><td valign="top"><span style="font-weight:900;">' + htmlNames[pp-1] + '</span>:</td><td>';
			nBeforePerson = pp;
		}
		sHtml += '<button id="'+this.sVariable+ii.toString()+'"style="border:solid 0px white;background-color:white;font-size:' + this.size + 'px;" onfocus="'+this.sVariable+'.numFocus='+ii+';" onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][TIME1].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][TIME1].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii+1][TIME1]-this.contents[ii][TIME1])*1000).toString()+');">'+this.contents[ii][this.lang]+'</button><br>';
	}
	sHtml += '</table>';

	sHtml += '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	this.elementB.innerHTML = sHtml;
	console.log(this.sVariable+this.numFocus.toString(),888);
	document.getElementById(this.sVariable+this.numFocus.toString()).focus();
};














const modeVocabularies = new ChangeLanguage(ENG1);
function setVocabularies(element) {
	let mode = modeVocabularies();
	let LANG;
	if(mode == ENG1) LANG = ENG2;
	else LANG = JAP2;
	const size = ["23","17"];

	let sHtml = "";
	for(let ii=0;ii<htmlVocabularies.length;ii++) {
		sHtml += '<button style="font-size:' + size[mode-1] + 'px;" onclick="clearInterval(hoge);eVideo.currentTime='+htmlVocabularies[ii][TIME2_S].toString()+';eVideo.play();hoge = setInterval(function() {eVideo.currentTime='+htmlVocabularies[ii][TIME2_S].toString()+';eVideo.play();},'+((htmlVocabularies[ii][TIME2_E]-htmlVocabularies[ii][TIME2_S])*1000).toString()+');">'+htmlVocabularies[ii][LANG]+'</button><br>';
	}
	element.innerHTML = sHtml;
};


/* for Express */
const TIME3Q_S = 0; /* start time */
const TIME3Q_E = 1; /* end time */
const TIME3A_S = 2; /* start time */
const TIME3A_E = 3; /* end time */
function setExpress(element) {
	let sHtml = "";

	for(let ii=0;ii<htmlExpresses.length;ii++) {
		sHtml += '<button onclick="clearInterval(hoge);eVideo.currentTime='+htmlExpresses[ii][TIME3Q_S].toString()+';eVideo.play();hoge = setInterval(function() {clearInterval(hoge);eVideo.pause();},'+((htmlExpresses[ii][TIME3Q_E]-htmlExpresses[ii][TIME3Q_S])*1000).toString()+');">Question No.' + (ii+1).toString() + '</button> ';
		sHtml += '<button onclick="clearInterval(hoge);eVideo.currentTime='+htmlExpresses[ii][TIME3A_S].toString()+';eVideo.play();hoge = setInterval(function() {eVideo.currentTime='+htmlExpresses[ii][TIME3A_S].toString()+';eVideo.play();},'+((htmlExpresses[ii][TIME3A_E]-htmlExpresses[ii][TIME3A_S])*1000).toString()+');">Answer</button><br>';
	}
	element.innerHTML = sHtml;
};


const ENG4 = 2;
const JAP4 = 3;
const TIME4_S = 0;
const TIME4_E = 1;
function setWords(element) {
	/**
	  * 答えを描きこむエレメントをグローバル変数'eWordsAns'に用意してください
	**/
	if(!eWordsAns.isConnected) {
		console.error('eWordsAnsが定義されていません');
	}

	let sHtml = "";
	for(let ii=0;ii<htmlWords.length;ii++) {
		//console.log(htmlWords[ii]);
		sHtml += '<button style="font-size:25px;" onmouseup="eWordsAns.innerHTML=\'　\';clearInterval(hoge);eVideo.pause();" onmousedown="eWordsAns.innerHTML=\''+htmlWords[ii][ENG4]+'\';clearInterval(hoge);eVideo.currentTime='+htmlWords[ii][TIME4_S].toString()+';eVideo.play();hoge=setInterval(()=>{clearInterval(hoge);eVideo.pause();},'+((htmlWords[ii][TIME4_E]-htmlWords[ii][TIME4_S])*1000).toString()+');">'+htmlWords[ii][JAP4]+'</button><br>';
	}
	element.innerHTML = sHtml;
}

/* 日付処理 */
const factoryDate = function(iDate) {
	const days = ["日","月","火","水","木","金","土","日"];
	const year = iDate.getFullYear().toString();
	const month = (iDate.getMonth() + 1).toString();
	const month_f = ('0' + (iDate.getMonth() + 1).toString()).slice(-2);
	const day1 = iDate.getDate().toString();
	const day1_f = ('0' + iDate.getDate().toString()).slice(-2);
	const day2 = days[iDate.getDay()];
	const dateInJapanese = year + '年' + month + '月' + day1 + '日（' + day2 + '）';
	const dateForFilename = year + '_' + month_f + '_' + day1_f;
	return {
		inJapanese:dateInJapanese,
		forFilename:dateForFilename
	};
};

const setTitle = function(element) {
	element.innerHTML = htmlTitle;
};

onload = function() {
	

	let oDate;
	let ele;

	/* 当日 */
	oDate = factoryDate(htmlDateToday);
		/* タイトルの日付 */
		ele = document.getElementById('date');
		ele.innerText = oDate.inJapanese;
		/* video のファイル名の日付 */
		ele = document.getElementsByTagName('body')[0];
		let sHtml = ele.innerHTML;
		sHtml = '<video controls id="video" width="420" height="300"><source src="oto/' + oDate.forFilename + '.mp4"></video>' + sHtml;
		ele.innerHTML = sHtml;
	/* 前日 */
	oDate = factoryDate(htmlDateBefore);
		/* リンク */
		ele = document.getElementById('before');
		ele.href = oDate.forFilename + '.html';
	/* 翌日 */
	oDate = factoryDate(htmlDateAfter);
		/* リンク */
		ele = document.getElementById('after');
		ele.href = oDate.forFilename + '.html';



	/* コンテンツ */
	ele = document.getElementById('htitle');
	setTitle(ele);

	eVideo = document.getElementById('video');

	ele = document.getElementById('conversation');
	zoneConversations2 = new ClsConversations2('zoneConversations2',eVideo,ele,htmlConversations);
	zoneConversations2.draw();

	ele = document.getElementById('vocabularies');
	setVocabularies(ele);

	ele = document.getElementById('express');
	setExpress(ele);

	eWordsAns = document.getElementById('wordsans');
	ele = document.getElementById('words');
	setWords(ele);

};
