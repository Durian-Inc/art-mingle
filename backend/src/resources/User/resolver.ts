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
    const user: User | undefined = context.state.user;
    const test: User = await User.findOneOrFail({
      email: "cmcginnis@test.com"
    });
    console.log(await test.following);

    if (!user) {
      return undefined;
    }

    return user;
  }
}
