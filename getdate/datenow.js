
const getdate = function(){
    let date_ob = new Date();
    let _date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const date = year + '-' + month + '-' + _date

    return date
}
module.exports = getdate