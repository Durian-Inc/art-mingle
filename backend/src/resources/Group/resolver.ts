import { Arg, Mutation, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Group } from "../Group";
import { User } from "../User";
import { Project } from "../Project";
import { IContext } from "../../lib/interfaces";

import { getConnection, Repository } from "typeorm";

@Resolver(() => Group)
export class GroupResolver {
  private groupRepo: Repository<Group> = getConnection().getRepository(Group);
  private projectRepo: Repository<Project> = getConnection().getRepository(
    Project
  );

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

  @Mutation(() => Group)
  protected async createGroup(
    @Ctx() context: IContext,
    @Arg("name") name: string
  ): Promise<Group> {
    const me: User = context.state.user as User;
    const newGroup: Group = this.groupRepo.create({ name, users: [me] });
    return newGroup.save();
  }

  @Mutation(() => Group)
  protected async addProjectToGroup(
    @Arg("group") groupId: string,
    @Arg("project") projectId: string
  ): Promise<Group> {
    const group: Group = await this.groupRepo.findOneOrFail({ id: groupId });
    const project: Project = await this.projectRepo.findOneOrFail({
      id: projectId
    });
    const projects: Project[] | undefined = await group.projects;
    if (projects) {
      if (projects.findIndex(i => i.id === project.id) === -1) {
        projects.push(project);
        group.projects = projects;
      }
    } else {
      group.projects = [project];
    }
    return group.save();
  }
}
