

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




let hoge = setInterval(function(){clearInterval(hoge);},1);
let eVideo = void 0;
let eWordsAns = void 0;/*答えを描きこむエレメント onclickに埋め込むためにグローバル変数を用いる*/



/*言語の切り替え用クロージャ*/
function manageLang() {
	const ENG = 0;
	const JAP = 1;
	let mode = ENG;
	return {
		initialize:function(modeInit) {
			/*言語指定を初期化*/
			mode = modeInit;
			if (mode != JAP && mode != ENG) console.error('modeInit = ',modeInit,' in ChangeLanguage()');
		},
		change:function() {
			/*言語の切替*/
			if (mode == ENG) mode = JAP;
			else if(mode == JAP) mode = ENG;
			return mode;
		},
		ENGLISH:ENG,
		JAPANESE:JAP
	};
};









const ClsButtons = function (sVariable,elementVideo,elementButton,contents) {
	this.oLang = new manageLang();/*closure オブジェクト返します*/
	this.oLang.initialize(this.oLang.ENGLISH);
	this.switchLang();/*this.lang , this.size の初期化*/
	this.elementB = elementButton;
	this.elementV = elementVideo;
	this.contents = contents;
	this.sVariable = sVariable;
	this.numFocus = 0;/*ボタンの内でフォーカスを受けているものの番号 onfocus時に番号をここに格納する*/
};
ClsButtons.prototype.numForcus = 0;/*フォーカスされているボタン*/
ClsButtons.prototype.switchLang = function() {
	/**
		prototype.switchLang()の使用について

		初期化しておくもの
			this.ENG...配列this.contentsにおける英文の場所
			this.JAP...配列this.contentsにおける日本語の場所

		切り替わるもの
			this.size...文字の大きさ
			this.lang...使われている言語
	**/
	if(this.oLang.change() == this.oLang.ENGLISH) {
		this.size = 22;
		this.lang = this.ENG;
	} else {
		this.size = 22;
		this.lang = this.JAP;
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
	this.TIME = 0;
	this.PERSON = 1;
	this.ENG = 2;
	this.JAP = 3;

	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);
};
inherits(ClsConversations2,ClsButtons);
ClsConversations2.prototype.draw = function() {
	let sHtml = '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	sHtml += "<table>";
	let nBeforePerson = 0;
	for(let ii=0;ii<this.contents.length-1;ii++) {
		let pp = this.contents[ii][this.PERSON];
		if(nBeforePerson != pp) {
			if(nBeforePerson != 0) {
				sHtml += "</td></tr>"
			}
			sHtml += '<tr><td valign="top" style="padding-top:9px;"><span style="font-weight:900;">' + htmlNames[pp-1] + '</span>:</td><td>';
			nBeforePerson = pp;
		}
		sHtml += '<button class~"phrase" id="'+this.sVariable+ii.toString()+'" style="border:solid 0px white;background-color:white;font-size:' + this.size + 'px;" onfocus="'+this.sVariable+'.numFocus='+ii+';" onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii+1][this.TIME]-this.contents[ii][this.TIME])*1000).toString()+');">'+this.contents[ii][this.lang]+'</button><br>';
	}
	sHtml += '</table>';

	sHtml += '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	this.elementB.innerHTML = sHtml;
	if(this.contents.length !=0) document.getElementById(this.sVariable+this.numFocus.toString()).focus();
};



/*ClsButtonsクラスから継承*/
const ClsVocabularies = function (sVariable,elementVideo,elementButton,contents) {
	/*配列における場所*/
	this.TIME_S = 0;
	this.TIME_E = 1;
	this.ENG = 2;
	this.JAP = 3;

	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);
};
inherits(ClsVocabularies,ClsButtons);
ClsVocabularies.prototype.draw = function() {

	let sHtml = '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	for(let ii=0;ii<this.contents.length;ii++) {
		sHtml += '<button class="phrase" id="'+this.sVariable+ii.toString()+'" style="font-size:' + this.size + 'px;" onfocus="'+this.sVariable+'.numFocus='+ii+';"  onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME_S].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME_S].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii][this.TIME_E]-this.contents[ii][this.TIME_S])*1000).toString()+');">'+this.contents[ii][this.lang]+'</button><br>';
	}
	sHtml += '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	this.elementB.innerHTML = sHtml;
//	const hogeVoc = setInterval(()=>{clearInterval(hogeVoc);document.getElementById(this.sVariable+this.numFocus.toString()).focus()},1000);
	console.log(this.sVariable+this.numFocus.toString(),5252);
	if(this.contents.length!=0) document.getElementById(this.sVariable+this.numFocus.toString()).focus();


};




/* for Express */
const TIME3Q_S = 0; /* start time */
const TIME3Q_E = 1; /* end time */
const TIME3A_S = 2; /* start time */
const TIME3A_E = 3; /* end time */
/*ClsButtonsクラスから継承*/
const ClsExpresses = function (sVariable,elementVideo,elementButton,contents) {
	/*配列における場所*/
	this.TIMEQ_S = 0;
	this.TIMEQ_E = 1;
	this.TIMEA_S = 2;
	this.TIMEA_E = 3;
	this.ENG = 4;

	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);
};
inherits(ClsExpresses,ClsButtons);
ClsExpresses.prototype.draw = function() {

	let sHtml = "";
	for(let ii=0;ii<this.contents.length;ii++) {
		sHtml += '<button onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIMEQ_S].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {clearInterval(hoge);'+this.sVariable+'.elementV.pause();},'+((this.contents[ii][this.TIMEQ_E]-this.contents[ii][this.TIMEQ_S])*1000).toString()+');">Question No.' + (ii+1).toString() + '</button> ';
		sHtml += '<button onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIMEA_S].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIMEA_S].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii][this.TIMEA_E]-this.contents[ii][this.TIMEA_S])*1000).toString()+');">Answer</button><br>';
	}
	this.elementB.innerHTML = sHtml;
};


















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

	ele = document.getElementById('practices');
	zonePractices = new ClsVocabularies('zonePractices',eVideo,ele,htmlPractices);
	zonePractices.draw();

	ele = document.getElementById('vocabularies');
	zoneVocabularies = new ClsVocabularies('zoneVocabularies',eVideo,ele,htmlVocabularies);
	zoneVocabularies.draw();

	ele = document.getElementById('express');
	zoneExpresses = new ClsExpresses('zoneExpresses',eVideo,ele,htmlExpresses);
	zoneExpresses.draw();

	eWordsAns = document.getElementById('wordsans');
	ele = document.getElementById('words');
	setWords(ele);

};
