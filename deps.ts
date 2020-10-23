// OAK
export { Application, Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";

export type { RouterContext } from "https://deno.land/x/oak@v6.3.1/mod.ts";

// MONGO

export { MongoClient } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

// DOTENV
import "https://deno.land/x/dotenv@v0.5.0/load.ts";

//BCRYPT
export {
  compareSync,
  hashSync,
} from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

// DJWT JSON WEB TOKEN
export { validateJwt } from "https://deno.land/x/djwt@v1.7/validate.ts";

export {
  makeJwt,
  setExpiration,
} from "https://deno.land/x/djwt@v1.7/create.ts";

export type { Jose, Payload } from "https://deno.land/x/djwt@v1.7/create.ts";

//
