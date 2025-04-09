// console.log('Express Tutorial')
//const { products, people } = require("./data"); //I have also added a data1.js just for more data variety to test out some scenarios
const express = require("express"); 
const app = express();
const { products } = require("./data");
const peopleRouter = require("./routes/people");

// Added logger here
const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); 
};

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger); 

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
  });

app.use("/api/v1/people", peopleRouter);

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

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filteredProducts = filteredProducts.filter((product) => product.price <= max);
    }
    
    if (limit) {
        limit = parseInt(limit);
        filteredProducts = filteredProducts.slice(0, limit);
    }
  
    res.json(filteredProducts);
  });
  
  // app.get("/api/v1/people", (req, res) => {
  //   res.json(people);
  // });

  // app.post("/api/v1/people", (req, res) => {
  //   const { name } = req.body;
  
  //   if (!name) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "Please provide a name" });
  //   }
  
  //   people.push({ id: people.length + 1, name });
  //   res.status(201).json({ success: true, name });
  // });

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3010, () => {
  console.log("Server is running on http://localhost:3010");
});
