var boardId = "KUeRhRKS";
var appKey = "bc066588187a27aa37725a579f3dde2b";

url2 = "https://api.trello.com/1/boards/561f839d452f1a73e383f5c5?lists=open&list_fields=name&fields=name,desc&key=bc066588187a27aa37725a579f3dde2b";

urllists = "https://api.trello.com/1/boards/" + boardId + "/lists?cards=open&card_fields=name&fields=name&key=" + appKey;

urlcard = "https://api.trello.com/1/boards/" + boardId + "/cards/561f84bbc34df0a736ec14f5?key=" + appKey;

function getCardUrl(boardId, cardId, appKey) {
    return "https://api.trello.com/1/boards/" + boardId + "/cards/" + cardId + "?key=" + appKey;
}

function getCheckListUrl(checkListId, appKey) {
    return "https://api.trello.com/1/checklists/" + checkListId + "/checkItems?key=" + appKey;
}

window.onload = function () {

    httpGetAsync(urllists, function (daco) {
        var json = JSON.parse(daco);
        console.log(JSON.parse(daco));
        $("#mojdiv")[0].innerHTML += '<div class="col-md-1"></div>';

        json.forEach(function (entry) {
            console.log(entry.name, entry.id, entry);
            $("#mojdiv")[0].innerHTML += '<div class="col-md-2"><div class="well" style="overflow:hidden;"><h4 class="text-danger"><span class="label label-danger pull-right">' + entry.cards.length + '</span>' + entry.name + '</h4>\
                        <div id="cards_' + entry.name.replace(/ /g, '') + '"></div>\
                        </div></div>';
            entry.cards.forEach(function (entryCard) {
                console.log("   ", entryCard.name, entryCard.id);
                $("#cards_" + entry.name.replace(/ /g, ''))[0].innerHTML += '<div class="row">\
                                    <div class="well" style="background-color:#000;" id="' + entryCard.id + '" onclick="modal(this.id);">\
                                        <h4 class="text-success" style="color:#fff"><span class="label label-success pull-right">x/x</span> ' + entryCard.name + ' </h4>\
                                    </div>\
                                </div>';

                /*httpGetAsync(getCardUrl(boardId, entryCard.id, appKey), function(daco){
                    var json = JSON.parse(daco);
                    console.log(json);
                });*/
            });
        });
        $("#trello").css("height", $("#mojdiv").height() + 250);
        //console.log($("#mojdiv").height());
        //clear: both;
    });

}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function modal(id) {
    $('#myModal').modal('show');
    httpGetAsync(getCardUrl(boardId, id, appKey), function (daco) {
        var json = JSON.parse(daco);
        console.log(json);
        $("#modalTitle")[0].innerHTML = json.name;
        $("#modalDescription")[0].innerHTML = json.desc;
        $("#modalCheckItems")[0].innerHTML = "";

        json.idChecklists.forEach(function (entrycheckItem) {
            httpGetAsync(getCheckListUrl(entrycheckItem, appKey), function (checkItem) {
                var jsonCheckItem = JSON.parse(checkItem);
                console.log(jsonCheckItem);
                jsonCheckItem.forEach(function (checkItem) {
                    var state = "";
                    if (checkItem.state == "complete") {
                        state = '<span class="label label-success pull-right"><i class="fa fa-check fa-fw"></i></span>';
                    } else {
                        state = '<span class="label label-danger pull-right"><i class="fa fa-times fa-fw"></i></span>';
                    }

                    $("#modalCheckItems")[0].innerHTML += '<div> ' + checkItem.name + " " + state + '</div>'
                        /*'<div class="row">\
                                                            <div class="well" style="background-color:#000;" id="' + checkItem.name + '" onclick="modal(this.id);">\
                                                                <h4 class="text-success" style="color:#fff">' + state + checkItem.name + '</h4>\
                                                            </div>\
                                                        </div>'*/
                    ;
                });

            });
        });

    });
}