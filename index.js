const http = require("http");

const handleRead = async (req, res) => {
  return new Promise((resolve, reject) => {
    let body = [];
    req.on("data", function (chunk) {
      if (chunk) {
        body.push(chunk);
      }
    });

    req.on("end", function () {
      try {
        let data = Buffer.concat(body).toString();
        if (data) {
          resolve(JSON.parse(data));
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

http
  .createServer(async (req, res) => {
    try {
      const urlSplit = req.url.split("/");
      const controller = require(`./controllers/${urlSplit[1]}`);
      req.body = await handleRead(req, res);
      req.params = urlSplit.slice(3);
      await controller[urlSplit[2]](req, res);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ detail: error.message || "Something when wrong" })
      );
    } finally {
      res.end();
    }
  })
  .listen(3000);
