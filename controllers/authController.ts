import type { Jose, Payload, RouterContext } from "../deps.ts";
import User from "../Models/User.ts";
import { compareSync, hashSync, makeJwt, setExpiration } from "../deps.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export class AuthController {
  async login(ctx: RouterContext) {
    const result = ctx.request.body();

    if (result.type === "json") {
      const { email, password } = await result.value;
      if (!email || !password) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Please provide email and password" };
        return;
      }
      let _user = await User.findOne({ email });
      console.log(_user);
      if (!_user) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Incorrect email" };
        return;
      }
      if (!compareSync(password, _user.password)) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Incorrect password" };
        return;
      }
      const payload: Payload = {
        iss: _user.email,
        exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
      };
      const jwt = await makeJwt(
        { key: Deno.env.get("JWT_SECRET_KEY") || "", header, payload },
      );

      ctx.response.body = {
        id: _user.id,
        name: _user.name,
        email: _user.email,
        jwt,
      };
    }
  }
  async register(ctx: RouterContext) {
    const result = ctx.request.body();
    if (result.type === "json") {
      const { name, email, password } = await result.value;

      let _user = await User.findOne({ email });
      if (_user) {
        ctx.response.status = 422;
        ctx.response.body = { message: " Email is already used" };
        return;
      }
      console.log(name, email, password);
      const hashedPassword = hashSync(password);
      let user = new User({ name, email, password: hashedPassword });
      await user.save();
      ctx.response.status = 201;
      ctx.response.body = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }
}
export default new AuthController();
