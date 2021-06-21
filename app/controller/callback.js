function greet(name, myNewFunction){
    console.log("Hello world")
    myNewFunction(name);
}

function sayName(name){
    console.log("Hello" + name);
}

setTimeout(greet, 2000, "Rakesh");