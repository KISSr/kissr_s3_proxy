const downloader = require('s3-download-stream');
const mime = require('mime-types')
const aws = require('aws-sdk');
const path = require('path');
const http = require('http');
const fs = require('fs');
const notFound = fs.readFileSync("404.html");

    http.createServer(function (req, res) {
      let contentType;
      let {url} = req;

      if(url.endsWith("/")) {
        url += "index.html";
      }
      if(mime.lookup(path.extname(url))) {
        contentType = mime.lookup(path.extname(url));
      } else {
        contentType = 'text/plain';
      }

      res.writeHead(200, {'Content-Type': contentType});
      console.log(`${req.headers.host}${url}`)
      console.log(`test123.kissr.com${url}`)
      downloader({
        client: new aws.S3(),
        concurrency: 6,
        params: {
          Key: `test123.kissr.com${url}`,
          // Key: `${req.headers.host}${url}`,
          Bucket: "kissr"
        }
      })
        .on('error', (e) => {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(notFound);
        })
        .on('pipe', () => {
          res.writeHead(200, {'Content-Type': contentType});
        })
        .pipe(res)
    }).listen(8080, "127.0.0.1");
