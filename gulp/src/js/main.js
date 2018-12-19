console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');
console.log('main.js');

function aaaa(argument) {
	// body...
	console.log(argument )
}
// alert('main.js');
aaaa();



//setTimeout 模拟setInterval，抽象版的
function mySetInterval(fn,time){
	timer && clearTimeout(timer);
	fn && fn();

	var temp = function(){
		setTimeout(temp,time);
		fn.call(null);
	}

	var timer = setTimeout(arguments.callee,time);

}


mySetInterval(function(){
	console.log(new Date() - 0)
},1000);



//简单版的，没有任何复用的
var say = function() {
    setTimeout(say, 1000)
    console.log('hello world' + new Date())
}

setTimeout(say, 1000)