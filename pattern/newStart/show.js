function show(content){
    window.document.getElementById('app').innerText = "Hello," + content;
}

//commonJS
module.exports = show;