import https from "./config";

const brand = {
  create: (data) => https.post("/brand/create", data), // Endpoint URL ning to'g'riligini tasdiqlang
  get: () => https.get("/brand/search"),
  update: (id, data) => https.patch(`/brand/update/${id}`, data),
  delete: (id) => https.delete(`/brand/delete/${id}`)
};


export default brand;