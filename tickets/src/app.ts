import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new"

import { errorHandler, NotFoundError, currentUser } from "@gptickethub/common";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";
import { indexTicketRouter } from "./routes";

const app = express();
app.set("trust proxy", true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test"
    })
)

app.use(currentUser);   
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);
app.use(indexTicketRouter);

app.all("*", () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };