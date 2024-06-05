const productControllerList = (req, res) => {
    res.send("Ini produk list");
  };
  
  productControllerCreate = (req, res) => {
    res.send("Ini create product");
  };
  
  const productControllerDetail = (req, res) => {
    res.send("Ini product detail");
  };
  
  const productControllerUpdate = (req, res) => {
    res.send("Ini product update");
  };
  
  const productControllerDelete = (req, res) => {
    res.send("Ini product delete");
  };
  
  module.exports = {
    productControllerList,
    productControllerCreate,
    productControllerUpdate,
    productControllerDelete,
    productControllerDetail,
  };
  