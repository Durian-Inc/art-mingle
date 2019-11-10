import { Arg, Mutation, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Group } from "../Group";
import { User } from "../User";
import { IContext } from "../../lib/interfaces";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Group)
export class GroupResolver {
  private groupRepo: Repository<Group> = getConnection().getRepository(Group);

  @Authorized()
  @Query(() => [Group])
  public async groups(): Promise<Group[]> {
    return this.groupRepo.find();
  }

  @Query(() => Group, { name: "group" })
  protected async getOne(@Arg("id", () => String) id: string) {
    return this.groupRepo.findOneOrFail({ id } as any);
  }

  @Mutation((_: void) => Group, { nullable: true })
  protected async joinGroup(
    @Ctx() context: IContext,
    @Arg("id", () => String) id: string
  ) {
    const user: User | undefined = context.state.user;
    const group: Group = await this.groupRepo.findOneOrFail({ id });
    const groupUsers = await group.users;

    if (!user) {
      return undefined;
    }

    if (groupUsers.findIndex(i => i.id === user.id) === -1) {
      groupUsers.push(user);
      group.users = groupUsers;
    }
    return group.save();
  }
}
