
const xlsx = require("xlsx");
const path = require("path");
const workbook = xlsx.readFile(path.resolve(__dirname, "..", "..", "upload", "bangcong.xlsx"));
const sheetName = "Chấm công";
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);
const data1 = xlsx.utils.sheet_to_json(worksheet, { header: "A" })

const findValueByKey = (keys, array) => {
    for (let i = 0; i < array.length; i++) {
        const obj = array[i];
        const objKey = Object.keys(obj)[0];

        if (keys === objKey) {
            return obj[objKey];
        }
    }
    return null;
}

const addMissingKey = (object) => {
    for (let i = 1; i <= 140; i++) {
        const key = `__EMPTY_${i}`;
        if (!(key in object)) {
            object[key] = object[`__EMPTY_${i - 1}`];
        }
    }
};
addMissingKey(data[1]);

const checkStringMapping = (inputString, stringObject) => {
    for (let key in stringObject) {
        if (stringObject.hasOwnProperty(key)) {
            if (inputString === stringObject[key]) {
                return true;
            }
        }
    }

    return false;
};


// console.log('check data[3]',data[3])

//Lọc dữ liệu liệu từng nhân viên



module.exports = { findValueByKey, checkStringMapping, addMissingKey, data }