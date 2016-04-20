var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {
    var mainWindow = new BrowserWindow({
      width: 900,
      height: 850,
      autoHideMenuBar: true
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
