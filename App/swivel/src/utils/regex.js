/* 
regex check function
Recieves: Regular expression, string
Returns: Boolean 
*/

function formatCheck(regex, text) {
    return regex.test(text);
}

export default formatCheck