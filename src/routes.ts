import { Application } from "express";

export const routes = (app: Application) => {
  app.get("/", (req,res) => {
    res.send("wow")
  });
};
