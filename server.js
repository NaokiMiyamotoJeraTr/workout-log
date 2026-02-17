const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// publicフォルダの中のファイルをそのままwebで見られるようにする設定
app.use(express.static(path.join(__dirname, "/public")));

//ルートパスにGETリクエストが送られた時の処理
app.get("/", (req, res));

app.listen(PORT, () => {
  console.log("Server is runnning");
});
