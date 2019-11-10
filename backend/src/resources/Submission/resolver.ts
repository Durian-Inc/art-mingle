import { Authorized, Query, Resolver } from "type-graphql";
import { Submission } from "../Submission";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Submission)
export class SubmissionResolver {
  private productRepo: Repository<Submission> = getConnection().getRepository(
    Submission
  );

  @Authorized()
  @Query(() => [Submission])
  public async submissions(): Promise<Submission[]> {
    return this.productRepo.find();
  }
}
