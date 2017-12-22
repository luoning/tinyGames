function m(t = 3, m = 1) {
	var k = Math.ceil(Math.random() * t) + m
	return k
}

function compare(property) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}

function clCards(array, number, party = 1) {
	var t = []
	var tempCards = []
	for (var j = 0; j <= party - 1; j++) {
		t[j] = []
	}
	for (var i = 0; i <= number - 1; i++) {
		k = Math.ceil(Math.random() * (array.length - 1))
		var tempValue = array[k].value
		var tempType = array[k].type
		tempCards = tempCards.concat(array[k])
		t[i % party] = t[i % party].concat(array.splice(k, 1))
		// array.splice(k, 1)
	}
	console.log(t)
	return t
}

function prepare(cards, number) {
	var cardsTotal=[]
	for (var i = 1; i <= number; i++) {
		cardsTotal = cardsTotal.concat(cards)
	}
	return cardsTotal
}

function cardsSet(cards_number, backCards_number, party_number) {
	var proCards = prepare(cards, cards_number)
	// console.log("待分配卡牌：",proCards.length-backCards_number)
	var backCards = clCards(proCards, backCards_number)
	var handCards = clCards(proCards, proCards.length, party_number)
	var cardsSet = [backCards, handCards]
	return cardsSet
}


function setHtml(x) {
	var t = ""
	for (var i = x.length - 1; i >= 0; i--) {
		t += '<div class="item"><img onclick="sumValue(' + x[i].type + ',' + x[i].value + ')" src="./asset/card_' + x[i].type + '_' + x[i].value + '.jpg"/></div>'
	}
	t = t + '<br/><br/>'
	return t
}
var preCards = []
function sumValue(x, y) {
	var sumV = 0
	if (x == 5) {
		value = 50
	} else {
		value = y
	}

	//last,5
	preCards = preCards.concat({
		"value": y,
		"type": x
	}, )
	for (var i = preCards.length - 1; i >= 0; i--) {
		sumV = sumV + preCards[i].value
	}
	console.log("thisValue:", value)
	console.log("preCards:", preCards)
	console.log("preCardsValue:", sumV)
}

function init(x, y, z, s="id") {	
	var innerHtml = ""
	//2副牌;留8张;4个人
	var init = cardsSet(x, y, z)
	var xHtml = '<div class="row"><b>底牌</b><br/><br/>'+ setHtml(init[0][0].sort(compare(s)))+'<br/><br/></div>'
	for (var i = 0; i <= z - 1; i++) {
		innerHtml +='<br/><br/><div class="row"><b>角色'+(i+1)+'</b><br/><br/>'+ setHtml(init[1][i].sort(compare(s)))+'</div>'
	}
	innerHtmls = xHtml + innerHtml
	console.log(54*x)
	return innerHtmls
}