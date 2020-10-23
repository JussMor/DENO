import { Router } from "./deps.ts";
import type { RouterContext } from "./deps.ts";
import authController from "./controllers/authController.ts";
import surveyController from "./controllers/SurveyController.ts";
import { authMiddleware } from "./Middlewares/authMiddleware.ts";

const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // For survey
  .get("/api/survey", surveyController.getAllForUser.bind(surveyController))
  .get("/api/survey/:id",surveyController.getSingle.bind(surveyController))
  .post("/api/survey", surveyController.create.bind(surveyController))
  .put("/api/survey/:id", surveyController.update.bind(surveyController))
  .delete("api/survey/:id", surveyController.delete.bind(surveyController));

export default router;
