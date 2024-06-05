const nodemailer = require("nodemailer");
const { ProductModel } = require("../models/ProductModel");

const httpResponseJSON = (
  res,
  data,
  statusCode = 200,
  contentType = "application/jspn"
) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  return res.write(JSON.stringify(data));
};

const httpResponse403 = (res) => {
  return httpResponseJSON(res, { detail: "Method not allowed" }, 405);
};

const httpResponse404 = (res) => {
  return httpResponseJSON(res, { detail: "Resource not found" }, 404);
};

const httpResponse500 = (res, messageError = null) => {
  return httpResponseJSON(res, { detail: messageError || "Server error" }, 500);
};

const email = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "41549a10f748c2",
    pass: "4dbc59f5fbc561",
  },
});

const productControllerList = async (req, res) => {
  const model = new ProductModel();
  if (req.method === "GET") {
    return httpResponseJSON(res, model.findAll());
  }

  if (req.method === "POST") {
    const data = req.body;
    const result = model.create(data);
    return httpResponseJSON(res, result, 201);
  }

  return httpResponse403(res);
};

const productControllerMail = async (req, res) => {
  if (req.method === "POST") {
    email.sendMail(
      {
        from: "test@mail.com",
        to: "yanzen@mail.com",
        subject: "PROMO PRODUCT",
        text: "Ada promo produk buat kamu loh",
      },
      (error, info) => {
        if (error) {
          console.log(error);
        }
        console.log("Horee");
      }
    );
    return httpResponseJSON(res, { test: "ok" });
  }

  return httpResponse403(res);
};

const productControllerDetail = async (req, res) => {
  const model = new ProductModel();
  let data = model.findOne(req.params[0]);
  if (!data) {
    return httpResponse404(res);
  }

  if (req.method === "GET") {
    return httpResponseJSON(res, data);
  }

  if (req.method === "PUT") {
    data = model.update(req.body, req.body);
    return httpResponseJSON(res, data);
  }

  if (req.method === "DELETE") {
    model.delete(req.params[0]);
    return httpResponseJSON(res, null, 204);
  }

  return httpResponse403(res);
};

module.exports = {
  productControllerList,
  productControllerDetail,
  productControllerMail,
};
