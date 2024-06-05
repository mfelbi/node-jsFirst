const express = require("express");
const {
  productControllerList,
  productControllerCreate,
  productControllerUpdate,
  productControllerDetail,
  productControllerDelete,
} = require("./controllers");

const app = express();

app.get("/", productControllerList);
app.get("/detail", productControllerDetail);

app.post("/", productControllerCreate);

app.put("/", productControllerUpdate);

app.delete("/", productControllerDelete);

app.listen(4000, () => {
  console.log("Server berjalan di port 4000");
});
