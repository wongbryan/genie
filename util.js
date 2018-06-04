const fs = require('fs')
const archiver = require('archiver')

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

const getStarterFiles = (path, target, configStr, res) => { //creates a zip of starter files, download to res
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
    const output = fs.createWriteStream(__dirname + '/StarterFiles.zip');

    res.on('close', function() {
        console.log('Archive wrote %d bytes', archive.pointer());
        // res.download(__dirname + '/StarterFiles.zip');
        res.attachment();
        resolve({
          err: false,
          status: 200
        })
    });

    res.on('end', function() {
      console.log('Data has been drained');
    });

    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
      } else {
        reject({
          err: 'Error creating zip',
          status: 400,
        });
      }
    });

    res.on('error', function(err) {
      reject({
        err: 'Error creating zip', 
        status: 400
      });
    });

    const configPath = path + '/config.js';
    fs.writeFile(configPath, configStr, (err) => {
      if (err) reject({
        err: 'Error writing config file',
        status: 400,
      });
      console.log("Config file saved.");
    })

    archive.pipe(res);
    // archive.pipe(output);
    
    archive.directory(path + '/', path);
    archive.finalize();
  })
}

module.exports = {
  convertB64: convertB64,
  deleteImage: deleteImage,
  getStarterFiles: getStarterFiles,
}