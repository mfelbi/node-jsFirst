let dataList = [];

class ProductModel {
  findAll() {
    return dataList;
  }

  create(data) {
    dataList = [...dataList, data];
    return data;
  }

  findOne(id) {
    const result = dataList.find((value) => value.id == id);
    return result;
  }

  update(id, data) {
    let result = this.findOne(id);
    const index = dataList.findIndex((value) => value.id === id);
    result = { ...result, ...data };
    dataList.splice(index, 1, result);
    return result;
  }

  delete(id) {
    const index = dataList.findIndex((value) => value.id === id);
    dataList.splice(index, 1);
  }
}

module.exports = { ProductModel };
