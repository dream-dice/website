Hooks.on('ready', function () {
    var gameIdMap = {
        cm: 'cm',
        cos2: 'cos'
    }

    function reqListener() {
        var data = JSON.parse(this.responseText);
        var found = data[gameIdMap[game.world.id]].filter(function (notes) {
            return notes.name === 'summary'
        })[0]

        Dialog.prompt({
            title: "Previously in the campaign",
            content: "<div style='font-family: fantasy; letter-spacing: 1px;'>" +
                "<div style='text-align: center; padding: 10px 0; font-size: 1.32em;'><a href='https://dream-dice.blankstring.com' target='_blank' rel='noreferrer'>All the notes</a></div>" +
                "<h1>Summary</h1>" +
                "<p style='font-size: 1.1em;'>" +
                found.description +
                "</p>" +
                "<ul style='height: 400px; overflow: auto; font-size: 1em;'>" +
                found.notes.map(function (note) {
                    return "<li>" + note + "</li>"
                }).join('\n') +
                "</ul>" +
                "</div>",
            label: "Thanks DM",
            callback: () => { ui.notifications.info("Don't forget to check out https://dream-dice.blankstring.com to read more info.") }
        });
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://dream-dice.blankstring.com/notes.json");
    oReq.send();
})