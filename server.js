//console.log("holamundo");
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let productos = [
  {
    id: 1,
    imagen:
      "data:image/jpeg;base64,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",
    nombre: "Iphone",
    precio: 900,
    descripcion: "pequeña descripcion"
  },
  {
    id: 2,
    imagen:
      "data:image/jpeg;base64,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",
    nombre: "Tv Samsung",
    precio: 1900,
    descripcion: "pequeña descripcion"
  },
  {
    id: 3,
    imagen:
      "data:image/jpeg;base64,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",
    nombre: "Laptop",
    precio: 2900,
    descripcion: "pequeña descripcion"
  }
];

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./node_modules")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/productos", (req, res) => {
  res.send({ productos });
});

app.get("/productos/:idProducto", (req, res) => {
  let producto = productos.find(
    productoABuscar => req.params.idProducto == productoABuscar.id
  );
  res.send({ producto });
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.send({ mensaje: "Producto Agregado!" });
});

app.put("/productos", (req, res) => {
  let index = productos.findIndex(
    productoABuscar => req.body.id == productoABuscar.id
  );
  productos[index] = req.body;
  res.send({ mensaje: "Producto Modificado!" });
});

app.delete("/productos/:idProducto", (req, res) => {
  let index = productos.findIndex(
    productoABuscar => req.params.idProducto == productoABuscar.id
  );

  productos.splice(index, 1);

  res.send({ mensaje: "Producto eliminado" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//app.get
//app.post
//app.put

const port = process.env.PORT || "9000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port: ${port}`));
