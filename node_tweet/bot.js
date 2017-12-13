console.log('the bot is starting');

var Twit = require('twit');

var config = require('./config');

// console.log(config);

var T = new Twit(config);

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
T.get('search/tweets', {
	q: 'stress',
	q: 'angry',
	q: 'depressed',
	count: 20,
	lang: 'en'
},

function(err, data, response) {
  
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].text);
		//console.log(parseTwit(tweets)[i].text);
	}
	
})

function parseTwit(str)
{
    //parse URL
    str = str.toString().replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,function(s){        
        return s.link(s);
    });
    //parse user_name
    str = str.toString().replace(/[@]+[A-Za-z0-9_]+/g,function(s){
        var user_name = s.replace('@','');
        return s.link("http://twitter.com/"+user_name);
    });
    //parse hashtag
    str = str.toString().replace(/[#]+[A-Za-z0-9_]+/g,function(s){
        var hashtag = s.replace('#','');
        return s.link("http://search.twitter.com/search?q="+hashtag);
    });
    return str;  
 }