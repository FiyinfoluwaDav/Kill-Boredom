import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import serverless from "serverless-http";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const request = await axios.get("https://bored-api.appbrewery.com/random");
    const result = request.data;
    res.render("solution.ejs", { data: result });
  } catch (error) {
    res.render("solution.ejs", { error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

// ✅ Export handler instead of app.listen()
export const handler = serverless(app);
