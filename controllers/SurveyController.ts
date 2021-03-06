import type { RouterContext } from "../deps.ts";
import Survey from "../Models/Survey.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

class SurveyController extends BaseSurveyController {
  async getAllForUser(ctx: RouterContext) {
    const surveys = await Survey.findByUser("1");
    console.log(surveys);
    ctx.response.body = surveys;
  }

  async getSingle(ctx: RouterContext) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id,ctx);
    if (survey) {
        ctx.response.body = survey;
        return;
    }
}
  async create(ctx: RouterContext) {
    const result = ctx.request.body();

    if (result.type === "json") {
      const { name, description } = await result.value;

      //@TODO
      const survey = new Survey("1", name, description);
      await survey.create();

      ctx.response.status = 201;
      ctx.response.body = survey;
    }
  }
  async update(ctx: RouterContext) {
    const result = ctx.request.body();
    if (result.type = "json") {
      const id = ctx.params.id!;
      const survey = await this.findSurveyOrFail(id, ctx);
      if (survey) {
        const { name, description } = await result.value;
        await survey.update({ name, description });
        ctx.response.body = survey;
      }
    }
  }

    async delete(ctx: RouterContext) {
        const id:string = ctx.params.id!;
        const survey: Survey|null = await this.findSurveyOrFail(id,ctx);
        if (survey){
            await survey.delete();
            ctx.response.status = 204;
        }
    }
}

const surveyController = new SurveyController();
export default surveyController;
