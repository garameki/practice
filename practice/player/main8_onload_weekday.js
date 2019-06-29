
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

