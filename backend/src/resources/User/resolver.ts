import { Ctx, Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { getConnection, Repository, getRepository } from "typeorm";
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
  private userRepo: Repository<User> = getConnection().getRepository(User);

  @Query((_: void) => resource, { nullable: true })
  protected async me(@Ctx() context: IContext) {
    const user: User | undefined = context.state.user;

    if (!user) {
      return User.findOneOrFail({
        email: "tdong@test.com"
      });
    }

    return user;
  }

  @Authorized()
  @Mutation(() => User)
  public async addFollow(
    @Arg("user") userId: string,
    @Ctx() context: IContext
  ): Promise<User> {
    const me: User = context.state.user as User;
    const toFollow: User = await this.userRepo.findOneOrFail({ id: userId });
    const following: User[] | undefined = await me.following;
    if (following) {
      if (following.findIndex(i => i.id === toFollow.id) === -1) {
        following.push(toFollow);
        me.following = following;
      }
    } else {
      me.following = [toFollow];
    }
    return me.save();
  }

  @Authorized()
  @Mutation(() => User)
  public async removeFollow(
    @Arg("user") userId: string,
    @Ctx() context: IContext
  ): Promise<User> {
    const me: User = context.state.user as User;
    const toUnFollow: User = await this.userRepo.findOneOrFail({
      id: userId
    });
    const following: User[] | undefined = await me.following;
    if (following) {
      const index: number = following.findIndex(i => i.id === toUnFollow.id);
      if (index != -1) {
        following.splice(index, 1);
        me.following = following;
      }
    }
    return me.save();
  }
}
