// console.log('Express Tutorial')
const { products } = require("./data"); //I have also added a data1.js just for more data variety to test out some scenarios
const express = require("express"); 
const app = express(); 

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
  });

app.get("/api/v1/products", (req, res) => {
    res.json(products);
 });

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID); // Convert the string ID to an integer
    const product = products.find((p) => p.id === idToFind);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    res.json(product);
});

app.get("/api/v1/query", (req, res) => {
    let { search, limit, regex, maxPrice } = req.query;
    let filteredProducts = [...products];
  
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (regex) {
        try {
          const regexPattern = new RegExp(regex, "i");
          filteredProducts = filteredProducts.filter((product) =>
            regexPattern.test(product.name)
          );
        } catch (err) {
          return res.status(400).json({ error: "Invalid regex pattern" });
        }
    }
    
    if (limit) {
        limit = parseInt(limit);
        filteredProducts = filteredProducts.slice(0, limit);
    }
  
    res.json(filteredProducts);
  });  

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3010, () => {
  console.log("Server is running on http://localhost:3010");
});
