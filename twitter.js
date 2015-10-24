(function() {

    var Twit = require('twit');
    var fs = require('fs');
    var T = new Twit({
        consumer_key: '',
        consumer_secret: '',
        access_token: '',
        access_token_secret: ''
    });

    T.get('search/tweets', {
        q: '#trek',
        count: 100
    }, function(err, data, response) {
        writeToFile(data);
    })

    function writeToFile(data) {
        var dataArray = [];
        var fileData = {
            "data": dataArray
        };

        for (var i = 0; i < data.statuses.length; i++) {
            var element = {
                "user": data.statuses[i].user.name,
                "text": data.statuses[i].text,
                "created_at": data.statuses[i].created_at
            };

            dataArray.push(element);
        }

        fileData = JSON.stringify(fileData, null, 1);

        fs.writeFile("data.json", fileData, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    }
})();