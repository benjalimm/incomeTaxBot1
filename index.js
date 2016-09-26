var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

// Hello Randomizer
const hello = ["Hey there.", "Hello there.", "Eyy bra!"]
const howCanIHelpYou = ["How may I be of assistance?", "How can I help you?", "Can I help you with anything"]
const helloRandomizer = (hello[getRandom(0,2)] + " " + howCanIHelpYou[getRandom(0,2)])

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
          sendTextMessage(sender, helloRandomizer)
            text = event.message.text.toLowerCase()
            if (text.contains("options") {
                sendGenericMessage(sender)
                continue
            } else if (text.contains("hey")) {
              sendTextMessage(sender, "Hey there baby gurrlll")
              break
            }
            // sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
            sendTextMessage(sender, "I'm not entirely sure what you're saying... Try me again")
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "EAAJCLxLPxrQBAOxGQPRh6xmWEnFdlZAcWbg5bUWm2k2eOzUPLC5WEAZCzr1Ti2cIDU3qEUlI0fbEsYiKQxF2v4LYmL0EQCjtmEmGnaIy4MZCZC2mG2Gmo99XOcQ5lKelojZB3vqpoFCJZCUpMG69R3Xf3qm0L1DxQ5zte3Cl3M3AZDZD"

// function replyToMessage(sender, text) {
//   var message = event.message.text;
//   var splitMessage = message.split()
//   if "poop" in splitMessage {
//     te
//   }
//
// }

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

//extensions
String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; // checks to see if string contains ..

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1)); // randomizes number
}
