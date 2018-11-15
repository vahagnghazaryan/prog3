var fs = require('fs');

function make_obj_file(obj) {
    // 
    var obj_str = JSON.stringify(obj)
    fs.writeFileSync("obj.json", obj_str);
 }
 var obj = 
{
    "first_name": "Vahagn",
    "last_name": "Ghazaryan",
    "age": 16,
    "tumo_student": true
}

 make_obj_file(obj);