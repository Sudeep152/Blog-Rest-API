const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend Server Is Running Port 3000");
});
