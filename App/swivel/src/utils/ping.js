/* 
email ping function
Recieves: Email string
Returns: Boolean 
*/

async function pingEmail(email) {
    let ping = require("ping");
  
    ping.sys.probe(email, function (isAlive) { // email existence validation, pings the email and returns if non-existent
        isAlive ? function () {
            return true;
        }
        : function () {
            return false;
        }
    });
}

export default pingEmail