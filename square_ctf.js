function bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(array[i], 2));
    }
    return result;
  }


function _encode(input) {
var a=[];
for (var i=0; i<input.length; i++) {
    var t = input.charCodeAt(i);
    for (var j=0; j<8; j++) {
    if ((t >> j) & 1) {
        a.push(1 + j + (input.length - 1 - i) * 8);
    }
    }
}
/* for : a
{
    t = 97
    {
        j = 0
    }
}
*/

console.log(a)

var b = [];
while (a.length) {
    // Daca face random, inseamna ca nu conteaza in ce ordine sunt elementele din array, ele tot timpul vor da acelasi lucru,!!!!
    // Deci la decode, putem sari peste acest pas.
    var t = (Math.random() * a.length)|0; // |0 =  ia partea intreaga
    b.push(a[t]);
    a = a.slice(0, t).concat(a.slice(t+1)); // remove the element that was added to b
    // console.log("a= " + a)
    // console.log("b= " + b)

}
console.log(b)

// a and b contain the same values but in different order

var r = '';
while (b.length) {
    var t = b.pop();
    r = r + "-".repeat(t) + ".";
}
console.log(r)
return r;
}

function _decode(input) {
// input = "-------.------.-." is a encoded
// we have the r array, let's obtain the b array
// Get the number of appearences of .
let number_of_appearences = (input.match(/\./g) || []).length;
let decoded_string_size = number_of_appearences/3;
console.log(number_of_appearences)

let array_of_splits = input.split(".");
//console.log(array_of_splits)
let b_array = []


array_of_splits.forEach(function(element) {
    if(element.length != 0)
    {
        b_array.unshift(element.length)
    }
    else
    {
        console.log("There was an empty element when getting the b array")
    }
    
    
  });

//console.log(b_array)

var result = "00000000"
// Let's get the result array
b_array.forEach(function(element) {
    if(result.length < element)
    {
        result += "00000000".repeat(Math.ceil((element -result.length)/8))
        //result += ("0".repeat(element - result.length))
        result = result.substr(0,element-1) + "1" + result.substr(element);
    }
    else
    {
        result = result.substr(0,element-1) + "1" + result.substr(element);
    }
    //console.log(result)
  });
  var new_result = result.split("").reverse().join("")
 //console.log("Here")
  //console.log(result)
  //console.log(new_result)

  let result_arrays = new_result.match(/.{1,8}/g)
  //console.log(result_arrays)
 // console.log(result_arrays.length)
  console.log(bin2String(result_arrays))

}


var fs = require('fs');
var path = require('path');

let encoded_text = ""
function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath));
}

encoded_text = String(bufferFile('instructions.txt'));

var encoded = _encode("{?a11'+!");

//_decode(encoded)
_decode(encoded_text)

//console.log(Math.ceil((57 -8)/8))
