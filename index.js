const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const { spawn } = require('child_process')
const app = express()


const componentTypes = [
  'Button',
  'Image',
  'h1',
  'h2',
  'h3',
  'SearchBar',
  'Paragraph',
  'InlineStepper'
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '1000mb'}))
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));


/* cross origin */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

/* GLOBAL VARS */
let imageBuffer = new Array(1000).fill(false);

// convert b64 string to './image.png';
async function convertB64(b64String, ext) {
  return new Promise((resolve, reject) => {
    let imageNumber = -1;
    for (let i = 0; i < imageBuffer.length; i += 1) {
      if (!imageBuffer[i]) {
        imageBuffer[i] = true;
        imageNumber = i;
        break;
      }
    }

    let base64Image = b64String.split(';base64,').pop();
    fs.writeFile(`image_${imageNumber}.${ext}`, base64Image, {encoding: 'base64'}, function(err) {
      if (err) {
        reject({err: 'Unable to save image'});
      }
      resolve({message: 'File created', path: `image_${imageNumber}.${ext}`});
    });
  })
}

function deleteImage(path) {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
      return {err: err};
    } else {
      const startPos = path.indexOf('_') + 1;
      const endPos = path.indexOf('.',startPos);
      const imageNumber = path.substring(startPos,endPos);

      imageBuffer[imageNumber] = false;
      return {message: `${path} deleted`}
    }
  });
}

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

  console.log(response);

  if (response.err) {
    res.status(500).send(response);
  }

  const path = response.path;

	const child = spawn('python3', ['server_scripts/putting_it_together.py', path]);
	child.on('exit', (code, signal) => {
		const status = code ? 200 : 400;
		const components = componentTypes.sort(()=>{ return .5 > Math.random() });
		const payload = {
			status: status,
			components: components.slice( Math.floor(componentTypes.length * Math.random()))
    };

    /* delete image */
    deleteImage(path);

    res.status(status).send(payload);
  });
});

app.listen(3001);
