function flood(pin, name, num) {
  location.href ="/" + btoa(btoa(pin)) + "/" + btoa(btoa(name)) + "/" + btoa(btoa(num)) + "/" + Math.floor(Math.random() * 999999999999999999999999) + "/flooder.html";
}
function kill(pin) {
  location.href = "/die/" + btoa(btoa(pin)) + "/flooder.html";
}
function rickroll(pin) {
  location.href = "/lol/" + btoa(btoa(pin)) + "/rickroll.html";
}
