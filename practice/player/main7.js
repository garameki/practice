/************************************
 **
 ** htmlではじまる変数は *.html のscript内でグロ-バルに定義されています。
 **
 *************************************/

let hoge = setInterval(function(){clearInterval(hoge);},1);
let eVideo = void 0;


/*******************************************************************
 ** prototype chainを使うための関数
 **
 ** 	inherit(childClass,parentClass)でスーパークラスのprototypeを継承して
 ** 	parentClass.call(this[,...[,...]])でスーパークラスのコンストラクタを実行します
 *******************************************************************/
const inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};



/*******************************************************************
**	Ruby風に使うための言語切替クロージャ
**
**	インスタンス化	oLang = ManageLang.new(ManageLang.ENGLISH)
**	クラス変数
**		英語	ManageLang.ENGLISH
**		日本語	ManageLang.JAPANESE
**	インスタンスメソッド
**		言語設定	oLang.set(ManageLang.JAPANESE)
**		言語切替	oLang.switch()

*********************************************************************/
const ManageLang = {
	ENGLISH:0,
	JAPANESE:1,
	new:function(nLang) {
		const ENG = ManageLang.ENGLISH;
		const JAP = ManageLang.JAPANESE;
		let mode = nLang;
		if (mode != JAP && mode != ENG) console.error('modeInit = ',modeInit,' in ChangeLanguage()');
		return {
			set:function(nLang) {
				/*言語指定*/
				mode = nLang;
				if (mode != JAP && mode != ENG) console.error('modeInit = ',modeInit,' in ChangeLanguage()');
				return mode;
			},
			switch:function() {
				/*言語の切替*/
				if (mode == ENG) mode = JAP;
				else if(mode == JAP) mode = ENG;
				return mode;
			}
		};
	}
};
//オブジェクトの中にnew関数を用意して、その中で変数を用意し(クロージャ)、returnでさらに、メソッドの入ったオブジェクトを返すというような構造

/*************************************************************
 **	日英切替ボタンを配置するクラスの親クラス
 **
 **	sVariable	(String)	インスタンスの変数名
 **	elementVideo	(Object)	ビデオのエレメント
 **	elementButton	(Object)	ボタンを配置するdivエレメント
 **	contents	(Array)		二重配列。ここに再生時刻や日英の言葉が入る
 **
 **	切り返した後もフォーカスが続くようにできるようにprototype.numForcusを用意した。
 **
**************************************************************/
const ClsButtons = function (sVariable,elementVideo,elementButton,contents) {
	this.oLang = ManageLang.new(ManageLang.ENGLISH);
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
	if(this.oLang.switch() == ManageLang.ENGLISH) {
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
	/*ボタンの配置を行う*/
	/*オーバーライドしてください*/
};




/* DIALOGUE */
const ClsConversations2 = function (sVariable,elementVideo,elementButton,contents) {
	this.TIME = 0;
	this.PERSON = 1;
	this.ENG = 2;
	this.JAP = 3;

	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);/*ClsButtonsを継承*/
};
inherits(ClsConversations2,ClsButtons);/*ClsButtonsを継承*/
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
		sHtml += '<button class="phrase" id="'+this.sVariable+ii.toString()+'" style="border:solid 0px white;background-color:white;font-size:' + this.size + 'px;" onfocus="'+this.sVariable+'.numFocus='+ii+';" onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii+1][this.TIME]-this.contents[ii][this.TIME])*1000).toString()+');">'+this.contents[ii][this.lang]+'</button><br>';
	}
	sHtml += '</table>';

	sHtml += '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	this.elementB.innerHTML = sHtml;
	if(this.contents.length !=0) document.getElementById(this.sVariable+this.numFocus.toString()).focus();
};


/* BUILD UP YOUR VOCABULARY */
const ClsVocabularies = function (sVariable,elementVideo,elementButton,contents) {
	/*配列における場所*/
	this.TIME_S = 0;
	this.TIME_E = 1;
	this.ENG = 2;
	this.JAP = 3;

	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);/*ClsButtonsクラスを継承*/
};
inherits(ClsVocabularies,ClsButtons);/*ClsButtonsクラスを継承*/
ClsVocabularies.prototype.draw = function() {

	/*スイッチ*/
	let sHtml = '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	/*ボタン*/
	for(let ii=0;ii<this.contents.length;ii++) {
		sHtml += '<button class="phrase" id="'+this.sVariable+ii.toString()+'" style="font-size:' + this.size + 'px;" onfocus="'+this.sVariable+'.numFocus='+ii+';"  onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME_S].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIME_S].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii][this.TIME_E]-this.contents[ii][this.TIME_S])*1000).toString()+');">'+this.contents[ii][this.lang]+'</button><br>';
	}
	/*スイッチ*/
	sHtml += '<br><button class="funcButton" onclick="'+this.sVariable+'.swDraw();">言語切替</button>  <button class="funcButton" onclick="clearInterval(hoge);eVideo.pause();">停止</button><br><br>';
	/*置き換えとフォーカスしなおし*/
	this.elementB.innerHTML = sHtml;
	if(this.contents.length!=0) document.getElementById(this.sVariable+this.numFocus.toString()).focus();


};



/* EXPRESS YOURSELF IN ENGLISH */
const ClsExpresses = function (sVariable,elementVideo,elementButton,contents) {
	/*配列 this.contents における場所*/
	this.TIMEQ_S = 0;
	this.TIMEQ_E = 1;
	this.TIMEA_S = 2;
	this.TIMEA_E = 3;
	this.ENG = 4;

	ClsButtons.call(this,sVariable,elementVideo,elementButton,contents);/*ClsButtonsクラスから継承*/
};
inherits(ClsExpresses,ClsButtons);/*ClsButtonsクラスから継承*/
ClsExpresses.prototype.draw = function() {

	let sHtml = "";
	for(let ii=0;ii<this.contents.length;ii++) {
		/*QUESTION button*/
		sHtml += '<button onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIMEQ_S].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {clearInterval(hoge);'+this.sVariable+'.elementV.pause();},'+((this.contents[ii][this.TIMEQ_E]-this.contents[ii][this.TIMEQ_S])*1000).toString()+');">Question No.' + (ii+1).toString() + '</button> ';
		/*ANSWER button*/
		sHtml += '<button onclick="clearInterval(hoge);'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIMEA_S].toString()+';'+this.sVariable+'.elementV.play();hoge = setInterval(function() {'+this.sVariable+'.elementV.currentTime='+this.contents[ii][this.TIMEA_S].toString()+';'+this.sVariable+'.elementV.play();},'+((this.contents[ii][this.TIMEA_E]-this.contents[ii][this.TIMEA_S])*1000).toString()+');">Answer</button><br>';
	}
	this.elementB.innerHTML = sHtml;
};










const Words = function(sVariable,elementVideo,elementAns,elementButton,elementList,contents,aCorrect,aIncorrect,aStart,aEnd,sDate) {
	if(!elementAns.isConnected) {
		console.error('words and phraseの答えを表示するエレメントがありません。');
	}
	if(!elementButton.isConnected) {
		console.error('words and phraseのボタンを表示するエレメントがありません。');
	}
	if(contents.length > 0) {
		/*音*/
		this.aC = aCorrect;
		this.aI = aIncorrect;
		this.aS = aStart;
		this.aE = aEnd;
		this.sD = sDate;

		this.sVariable = sVariable;
		this.eV = elementVideo;
		this.eA = elementAns;
		this.eB = elementButton;
		this.eL = elementList;
		this.contents = contents;
		
		/*this.contentsの場所*/
		this.TIME_S = 0;
		this.TIME_E = 1;
		this.ENG = 2;
		this.JAP = 3

		this.nNode = -1;/*マウスがクリックされているノードの絶対番号*/

		/*スコア読み込み*/
		if(!this._cookieCheck()) this._cookieReset();

		this.entries = this._getFromCookie();/*[ノード番号,スコア]*/
		
		this._buttonRandom();
		this._buttonList();
	}
};
Words.prototype._button = function(num) {
	let sHtml = "errorが発生しました";
	if(num < this.contents.length) {
			sHtml = this._returnHTML(num);
			sHtml += '<br><button class="wordsButton" onclick="'+this.sVariable+'.correct();">正解</button><button class="wordsButton" style="left:50px;" onclick="'+this.sVariable+'.incorrect();">不正解</button><button class="wordsButton" style="left:300px;" onclick="'+this.sVariable+'.aS.play();'+this.sVariable+'._cookieReset();'+this.sVariable+'._buttonList();'+this.sVariable+'._buttonRandom();">スコアクリア</button>';

	} else {
		console.error('num = ',num,'this.contents.length = ',this.contents.length,98498);
	}
	this.eB.innerHTML = sHtml;
};
Words.prototype.correct = function() {
	if(this.nNode != -1) {
		this._buttonRandom();
		this.aI.pause();
		this.aC.pause();
		this.aC.currentTime = 0;
		this.aC.play();
		let date = new Date();
		date.setFullYear(date.getFullYear()+1);
		let num = this._search(this.nNode);
		document.cookie = this.sVariable+this.sD+this.nNode.toString()+'='+(++this.entries[num][1]).toString()+';expire='+date.toUTCString();
		this.nNode = -1;
		this._buttonList();

		/*ファンファーレ*/
		let flag = true;
		for(let ii=0;ii<this.entries.length;ii++) {
			if(this.entries[ii][1] < 3) {
				flag = false;
				break;
			}
		}
		if(flag) this.aE.play();
	} else {
		this.eA.innerHTML = '<span style="display:block;text-valign:top;font-size:20px;">答え合わせをしてください</span>';
		const hoge = setInterval(()=>{
			clearInterval(hoge);
			this.eA.innerHTML = '';
		},500);
	}
};
Words.prototype.incorrect = function() {
	if(this.nNode != -1) {
		this._buttonRandom();
		this.aI.pause();
		this.aC.pause();
		this.aI.currentTime = 0;
		this.aI.play();
		let date = new Date();
		date.setFullYear(date.getFullYear()+1);
		let num = this._search(this.nNode);
		document.cookie = this.sVariable+this.sD+this.nNode.toString()+'='+(--this.entries[num][1]).toString()+';expire='+date.toUTCString();
		this.nNode = -1;
		this._buttonList();
	} else {
		this.eA.innerHTML = '<span style="display:block;text-valign:top;font-size:20px;">答え合わせをしてください</span>';
		const hoge = setInterval(()=>{
			clearInterval(hoge);
			this.eA.innerHTML = '';
		},500);
	}
};
Words.prototype._search = function(nNum) {

	let num = -1;
	for(let ii=0;ii<this.entries.length;ii++) {
		if(this.entries[ii][0] == nNum) {
			num = ii;
			break;
		}
	}
	if(num == -1) console.error('can\'t find node No'+nNum.toString()+'in the "this.entries"',85221475555);
	return num;
};
Words.prototype._buttonRandom = function() {

	let ans;
	const nn = this.entries.length;


	const max = nn*(nn+1)*(2*nn+1)/6;
	const pp = Math.round(Math.random() * max - 0.5);
	let sum = 0;
	for(let kk=1;kk<=nn;kk++) {
		sum += kk * kk;
		if(sum > pp) {
			ans = nn - kk;
			break;
		}
	}

	/************************************************************
	一様分布/
//	let ans = Math.round(Math.random() * nn - 0.5);
	**************************************************************/

	if(ans >= nn) console.error('ans=',ans,'Words.prototype._buttonRandom()');
	this._button(ans);
};
Words.prototype._getFromCookie = function() {
	/*スコア読み込み*/
	const cookie = document.cookie;
	const cookies = cookie.split(';');/*最後には;を付けないこと*/
	const regexp = new RegExp('^\\s*'+this.sVariable+this.sD+'(\\d+)');
	const ids = [ ];
	let id,num;
	for(let ii=0;ii<cookies.length;ii++) {
		id = cookies[ii].split('=');
		num = id[0].match(regexp);
		if(num) {
			ids.push([Number(num[1]),Number(id[1])]);
		}
	}
	return ids;
};
Words.prototype._cookieReset = function() {
	this._cookieClear();
	for(let ii=0;ii<this.contents.length;ii++) {
		document.cookie = this.sVariable+this.sD+ii.toString()+'=0;';
	}
	this.entries = [ ];
	for(let ii=0;ii<this.contents.length;ii++) {
		this.entries.push([ii,0]);
	}
};
Words.prototype._cookieClear = function() {
	const ids = this._getFromCookie();
	for(let ii=0;ii<ids.length;ii++) {
		document.cookie = ids[0]+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	}
	this.entries = [ ];

};
Words.prototype._cookieCheck = function() {
	/*scoreがNaNとかになってたらfalseを返す*/
	const ids = this._getFromCookie();
	const regexp = new RegExp('^\\d+$');
	let flag = true;
	if(ids.length != this.contents.length) {
		flag = false;
	} else {
		/*NaNのチェック*/
		for(let ii=0;ii<ids.length;ii++) {
			if(isNaN(ids[ii][1])) {
				flag = false;
				break;
			}
		}
	}
	return flag;
};
Words.prototype._returnHTML = function(ii) {
	return '<button id="'+this.sVariable+this.entries[ii][0].toString()+'" style="font-size:25px;" onmouseup="'+this.sVariable+'.eA.innerText=\'\';clearInterval(hoge);'+this.sVariable+'.eV.pause();" onmousedown="'+this.sVariable+'.nNode='+this.entries[ii][0].toString()+';'+this.sVariable+'.eA.innerHTML=\''+this.contents[this.entries[ii][0]][this.ENG]+'\';clearInterval(hoge);'+this.sVariable+'.eV.pause();'+this.sVariable+'.eV.currentTime='+this.contents[this.entries[ii][0]][this.TIME_S].toString()+';'+this.sVariable+'.eV.play();hoge=setInterval(()=>{clearInterval(hoge);'+this.sVariable+'.eV.pause();},'+((this.contents[this.entries[ii][0]][this.TIME_E]-this.contents[this.entries[ii][0]][this.TIME_S])*1000).toString()+');">'+this.contents[this.entries[ii][0]][this.JAP]+'<span style="color:red;">'+this.entries[ii][1].toString()+'点</span></button>';
};
Words.prototype._buttonList = function() {
	/*worse順に並べて表示する*/
	let temp;
	let num = this.entries.length;
	for(let ii=0;ii<num-1;ii++) {
		for(let kk=ii+1;kk<num;kk++) {
			if(this.entries[ii][1] > this.entries[kk][1]) {
				temp = this.entries[ii];
				this.entries[ii] = this.entries[kk];
				this.entries[kk] = temp;
			}
		}
	}
	/*表示*/
	let sHtml = "";
	for(let ii=0;ii<num;ii++) {
		sHtml += this._returnHTML(ii);
	}
	this.eL.innerHTML = sHtml;



};

function setWords(elementListAll) {
	const ENG4 = 2;
	const JAP4 = 3;
	const TIME4_S = 0;
	const TIME4_E = 1;
	/**
	  * 答えを描きこむエレメントをグローバル変数'eWordsAns'に用意してください
	**/
	if(!eWordsAns.isConnected) {
		console.error('eWordsAnsが定義されていません');
	}

	let sHtml = "";
	for(let ii=0;ii<htmlWords.length;ii++) {
		sHtml += '<button style="font-size:25px;" onmouseup="eWordsAns.innerHTML=\'　\';clearInterval(hoge);eVideo.pause();" onmousedown="eWordsAns.innerHTML=\''+htmlWords[ii][ENG4]+'\';clearInterval(hoge);eVideo.currentTime='+htmlWords[ii][TIME4_S].toString()+';eVideo.play();hoge=setInterval(()=>{clearInterval(hoge);eVideo.pause();},'+((htmlWords[ii][TIME4_E]-htmlWords[ii][TIME4_S])*1000).toString()+');">'+htmlWords[ii][JAP4]+'</button><br>';
	elementListAll.innerHTML = sHtml;

	}
}

















/************************************************************************
 ** Dateオブジェクトをいろんな形で返す
 **
**************************************************************************/
const factoryDate = function(oDate) {
	const days = ["日","月","火","水","木","金","土","日"];
	const year = oDate.getFullYear().toString();
	const month = (oDate.getMonth() + 1).toString();
	const month_f = ('0' + (oDate.getMonth() + 1).toString()).slice(-2);
	const day1 = oDate.getDate().toString();
	const day1_f = ('0' + oDate.getDate().toString()).slice(-2);
	const day2 = days[oDate.getDay()];
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


let words;/*words and phrasesのクイズ用*/
let eWordsAns;/*words and phrasesの答え表示用 古いスクリプトの為にグローバルに残してある。(onmousedownでグローバルに使うから)*/
onload = function() {
	
	const aCorrect = new Audio();
	aCorrect.src = 'oto/correct.mp3';
	const aIncorrect = new Audio();
	aIncorrect.src = 'oto/incorrect.mp3';
	const aStart = new Audio();
	aStart.src = 'oto/gong.mp3';
	const aEnd = new Audio();
	aEnd.src = 'oto/gong3.mp3';


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


	/* タイトル */
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
	const eWordsList = document.getElementById('wordslist');
	ele = document.getElementById('words');
	words = new Words('words',eVideo,eWordsAns,ele,eWordsList,htmlWords,aCorrect,aIncorrect,aStart,aEnd,factoryDate(htmlDateToday).forFilename);
//	setWords(eWordsList);

};
