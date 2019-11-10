import { Arg, Authorized, Mutation, Query, Ctx, Resolver } from "type-graphql";
import { Submission } from "../Submission";
import { User } from "../User";
import { Project } from "../Project";
import { IContext } from "../../lib/interfaces";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Submission)
export class SubmissionResolver {
  private submissionRepo: Repository<
    Submission
  > = getConnection().getRepository(Submission);
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
    @Arg("project") projectId: string,
    @Ctx() context: IContext
  ): Promise<Submission> {
    const user: User = context.state.user as User;
    const project: Project = await this.projectRepo.findOneOrFail({
      id: projectId
    });
    return this.submissionRepo
      .create({ name, url, color: "#ff0000", user, project })
      .save();
  }

  @Authorized()
  @Mutation(() => Submission)
  public async addLike(
    @Arg("submission") submissionId: string,
    @Ctx() context: IContext
  ): Promise<Submission> {
    const submission: Submission = await this.submissionRepo.findOneOrFail({
      id: submissionId
    });
    const user: User = context.state.user as User;
    const likers: User[] | undefined = await submission.likers;
    if (likers) {
      if (likers.findIndex(i => i.id === user.id) === -1) {
        likers.push(user);
        submission.likers = likers;
      }
    } else {
      submission.likers = [user];
    }
    return submission.save();
  }

  @Authorized()
  @Mutation(() => Submission)
  public async removeLike(
    @Arg("submission") submissionId: string,
    @Ctx() context: IContext
  ): Promise<Submission> {
    const submission: Submission = await this.submissionRepo.findOneOrFail({
      id: submissionId
    });
    const user: User = context.state.user as User;
    const likers: User[] | undefined = await submission.likers;
    if (likers) {
      const index: number = likers.findIndex(i => i.id === user.id);
      if (index != -1) {
        likers.splice(index, 1);
        submission.likers = likers;
      }
    }
    return submission.save();
  }
}
