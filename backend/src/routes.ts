import Router from "@koa/router";

import { router as indexRouter } from "./routes/index";

const router = new Router();
router.use("/", indexRouter.routes(), indexRouter.allowedMethods());

export { router };
