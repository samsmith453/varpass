module.exports = function(name){
	var pattern = /[a-zA-Z]+/;
	var res = name.match(pattern);
	res = res[0].toLowerCase();

	var num = Math.random() * 1000 + Math.random() *10 + Math.random();
	num = Math.floor(num);

	var code = res + num;

	return code;
}
