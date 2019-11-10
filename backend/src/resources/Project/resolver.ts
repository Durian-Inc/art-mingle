import { Authorized, Query, Resolver } from "type-graphql";
import { Project } from "../Project";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Project)
export class ProjectResolver {
  private productRepo: Repository<Project> = getConnection().getRepository(
    Project
  );

  @Authorized()
  @Query(() => [Project])
  public async projects(): Promise<Project[]> {
    return this.productRepo.find();
  }
}
