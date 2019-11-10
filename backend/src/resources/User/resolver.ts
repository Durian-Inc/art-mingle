import { Ctx, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { IContext } from "../../lib/interfaces";
import { User } from "./entity";
import { UserCreateInput, UserDeletePayload, UserUpdateInput } from "./input";

import { ResourceResolver } from "../Resource";

const resource = User;
type resourceType = User;

@Resolver((_: void) => User)
export class UserResolver extends ResourceResolver<resourceType>(
  resource,
  UserCreateInput,
  UserUpdateInput,
  UserDeletePayload,
  getRepository(resource)
) {
  @Query((_: void) => resource, { nullable: true })
  protected async me(@Ctx() context: IContext) {
    let user: User | undefined = context.state.user;
    user = await User.findOneOrFail({
      email: "tdong@test.com"
    });

    if (!user) {
      return undefined;
    }

    return user;
  }
}
