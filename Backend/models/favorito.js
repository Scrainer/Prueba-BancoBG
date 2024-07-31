const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritoSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "Producto" },
    fechaAgregado: { type: Date, default: Date.now,
    },
  },
  {
    _id: false, // Evita que Mongoose genere un nuevo _id para el esquema de Favorito
  }
);

module.exports = mongoose.model("Favorito", favoritoSchema);
