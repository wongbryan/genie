const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const { spawn } = require('child_process')
const app = express()
const { convertB64, deleteImage, getStarterFiles } = require('./util.js')

app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/* cross origin */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post('/display', async (req, res) => {

  /* req should include base64 image */
  let imageB64 = req.body.file;
  if (!imageB64) {
    res.status(400).send("Image required as part of request body.");
  }

  /* get extension of file */
  const startPos = imageB64.indexOf('/') + 1;
  const endPos = imageB64.indexOf(';',startPos);
  const ext = imageB64.substring(startPos,endPos);

  /* save B64 string to image */
  const response = await convertB64(imageB64, ext);

  if (response.err) {
    res.status(500).send(response);
  }

  const path = response.path;

	// const child = spawn('python3', ['server_scripts/putting_it_together.py', path]);
  const child = spawn('python3', ['dummy.py']);

  let output = [];
  let payload = {components: []};
  child.stdout.on('data', async function(chunk){
      let textChunk = chunk.toString('utf8');// buffer to string

      const sP = textChunk.indexOf('[') + 1;
      const eP = textChunk.indexOf(']',sP);
      let arr_str = textChunk.substring(sP,eP);

      output = arr_str.replace(/'/g, '').split(', ');
      payload['components'] = output;

      /* delete image */
      deleteImage(path);

      /* send */
      res.status(200).send(payload);
  });
});

app.post('/download', async (req, res, next) => {
    const starterDir = 'your_genie_app';
    const target = __dirname + '/your_genie_app.zip';

    let textChunk = req.body.components; //string of array of components
    textChunk = JSON.stringify(textChunk);
    textChunk = 'const Components = ' + textChunk  + "\n\n"
    + 'export default Components;';

    console.log(textChunk);

    const data = await getStarterFiles(starterDir, target, textChunk);

    if(data.err){
      throw new Error(data.err);
    } else{
      res.download(__dirname + '/your_genie_app.zip'); //writes headers automatically
      fs.unlink(starterDir + '/src/config/components.js');
    }
})

app.listen(3001);
