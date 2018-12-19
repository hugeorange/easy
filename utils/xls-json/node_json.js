/**
 * Created by Administrator on 2017/2/27.
 */
var xls_json = require('./node_modules/xls-to-json');

xls_json(
    {
        input: "staff.xlsx",
        output : "dealer.json"
    },
    function(err, result) {
        if(err) {
            console.error(err);
        }
        else {
            console.log(result);
        }
    }
);