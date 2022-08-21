console.clear();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');

require('dotenv').config()
app.use(bodyParser.json());
const port = 3490;

var cors = require('cors')
app.use(cors())

app.post('/api/installer', async function (req, res) {
  let command = "sudo apt update -y && "
  if (req.body.packages.includes("byobu")) {
    command += "sudo apt install byobu -y && byobu-enable && "
  }
  if (req.body.packages.includes("ncdu")) {
    command += "sudo apt install ncdu -y && "
  }
  if (req.body.packages.includes("git")) {
    command += "sudo apt install git -y && "
  }
  if (req.body.packages.includes("nginx")) {
    command += "sudo apt install nginx -y && "
  }
  if (req.body.packages.includes("node")) {
    command += "sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && sleep 2 && source ~/.nvm/nvm.sh && nvm install --lts &&"
  }
  if (req.body.packages.includes("saidar")) {
    command += "sudo apt install saidar -y && "
  }
  if (req.body.packages.includes("emby")) {
    await axios.get("https://api.github.com/repos/MediaBrowser/Emby.Releases/releases/latest").then(function (response) {
      let version = response.data.tag_name
      let url = `https://github.com/MediaBrowser/Emby.Releases/releases/download/${version}/emby-server-deb_${version}_amd64.deb`
      command += `sudo apt install wget && sudo wget ${url} && sudo dpkg -i emby-server-deb_${version}_amd64.deb && sudo rm emby-server-deb_${version}_amd64.deb && `
    })
  }
  if (req.body.packages.includes("neofetch")) {
    command += "sudo apt install neofetch -y && neofetch && "
  }

  // Remove && from the end
  command = command.slice(0, -3)
  res.send(command)
});


// Start server
app.listen(port, async function () {
  console.log(`Server listening on port ${port} | ${new Date()}`);
});