const datauriparser = require("datauri/parser.js")
const path = require ("path")

const getdatauri = (file)=>{
    const parser = new datauriparser();
    const extname = path.extname(file.originalname).toString()
    return parser.format(extname, file.buffer);
}

module.exports = getdatauri ;