'use strict';

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
var win = null;

function createWindow() {
  win = new BrowserWindow({width:800, height:600});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'editor.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
