import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Group } from "../Group";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Group)
export class GroupResolver {
  private productRepo: Repository<Group> = getConnection().getRepository(Group);

  @Authorized()
  @Query(() => [Group])
  public async groups(): Promise<Group[]> {
    return this.productRepo.find();
  }

  @Query(() => Group, { name: "group" })
  protected async getOne(@Arg("id", () => String) id: string) {
    return this.productRepo.findOneOrFail({ id } as any);
  }
}
