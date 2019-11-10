import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Submission } from "../Submission";
import { User } from "../User";
import { Project } from "../Project";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Submission)
export class SubmissionResolver {
  private submissionRepo: Repository<
    Submission
  > = getConnection().getRepository(Submission);
  private userRepo: Repository<User> = getConnection().getRepository(User);
  private projectRepo: Repository<Project> = getConnection().getRepository(
    Project
  );

  @Authorized()
  @Query(() => [Submission])
  public async submissions(): Promise<Submission[]> {
    return this.submissionRepo.find();
  }

  @Authorized()
  @Mutation(() => Submission)
  public async createSubmission(
    @Arg("name") name: string,
    @Arg("url") url: string,
    @Arg("project") projectId: string
  ): Promise<Submission> {
    const user: User = await this.userRepo.findOneOrFail({
      email: "tdong@test.com"
    });
    const project: Project = await this.projectRepo.findOneOrFail({
      id: projectId
    });
    return this.submissionRepo
      .create({ name, url, color: "#ff0000", user, project })
      .save();
  }
}
