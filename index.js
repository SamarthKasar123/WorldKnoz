import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));


app.get("/" , async (req,res)=>{
    try {
        const result = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=3b4e3faa0a1c4412b2f6e452baef397e");
        const firstArticle = result.data.articles[0];
        res.render("index.ejs",{
            author : firstArticle.author,
            title : firstArticle.title,
            description : firstArticle.description,
            image : firstArticle.urlToImage
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
});

app.listen(port,()=>{
    console.log("Server Started On Port "+port);
})