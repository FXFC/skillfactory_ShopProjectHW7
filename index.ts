require('dotenv').config();
import express, { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import Shop_api from "./Shop.API";
import Shop_admin from "./Shop.Admin";
import {adminProductsRouter} from "./Shop.Admin/controllers/products.controllers";

export let server: Express;
export let connection: Connection | null;

async function launchApplication() {
    server = initServer();
    connection = await initDataBase();

    initRouter();
}

function initRouter() {
    const shopApi = Shop_api(connection!);
    server.use("/api", shopApi);

    const shopAdmin = Shop_admin();
    server.use("/admin", shopAdmin);

    server.use("/", (req, res) => {
        res.send("React App");
    });
}

launchApplication();