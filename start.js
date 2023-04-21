require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

  // app.get("/", (req,res, next)=> {
  //   let users=[];
  //   axios.get("https://randomuser.me/api/?results=10")
  //   .then((response)=>{
  //     response.data.results.map((user)=> {
  //       users.push(user);
  //     });
  //     console.log(users);
  //     res.render("main", {
  //       users
  //     });
  //   })
  //   .catch((err)=> {
  //     console.log(err);
  //     res.render("main");
  //   });
  // });

require('./models/Registration');
const app = require('./app');


// app.get("/manifest.json", function(req, res){
//   res.header("Content-Type", "text/cache-manifest");
//   res.sendFile(path.join(__dirname, "manifest.json"));
// });

// app.get("/sw.js", function(req, res){
//   res.header("Content-Type", "text/javascript");
//   res.sendFile(path.join(__dirname, "sw.js"));
// });

// app.get("/loader.js", function(req, res){
//   res.header("Content-Type", "text/javascript");
//   res.sendFile(path.join(__dirname, "loader.js"));
// });


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});