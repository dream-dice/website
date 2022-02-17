Hooks.on('ready', function () {
    function reqListener() {
        var data = JSON.parse(this.responseText);
        var found = data.cm.filter(function (notes) {
            return notes.name === 'summary'
        })[0]

        Dialog.prompt({
            title: "Previously in the Candlekeep Campaign",
            content: "<div><b>Summary</b><p style='font-size: 16px; letter-spacing: 1px;'>" +
                found.description +
                "</p><ul style='height: 500px; overflow: auto;'>" +
                found.notes.map(function (note) {
                    return "<li>" + note + "</li>"
                }).join('\n') +
                "</ul></div>",
            label: "Thanks DM",
            callback: () => { ui.notifications.info("Oh sweet! I totally read all of that and won't forget. Thanks for the passive agressive prompt, really appreciated.") }
        });
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://dream-dice.blankstring.com/notes.json");
    oReq.send();
})