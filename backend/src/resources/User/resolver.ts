import { Ctx, Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { getConnection, Repository, getRepository } from "typeorm";
import { IContext } from "../../lib/interfaces";
import { User } from "./entity";
import { Project } from "../Project/entity";
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
  private projectRepo: Repository<Project> = getConnection().getRepository(
    Project
  );

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

  @Authorized()
  @Mutation(() => User)
  public async addProject(
    @Arg("project") projectId: string,
    @Ctx() context: IContext
  ): Promise<User> {
    const me: User = context.state.user as User;
    const project: Project = await this.projectRepo.findOneOrFail({
      id: projectId
    });
    const projects: Project[] | undefined = await me.projects;
    if (projects) {
      if (projects.findIndex(i => i.id === project.id) === -1) {
        projects.push(project);
        me.projects = projects;
      }
    } else {
      me.projects = [project];
    }
    return me.save();
  }

  @Authorized()
  @Mutation(() => User)
  public async removeProject(
    @Arg("project") projectId: string,
    @Ctx() context: IContext
  ): Promise<User> {
    const me: User = context.state.user as User;
    const project: Project = await this.projectRepo.findOneOrFail({
      id: projectId
    });
    const projects: Project[] | undefined = await me.projects;
    if (projects) {
      const index: number = projects.findIndex(i => i.id === project.id);
      if (index != -1) {
        projects.splice(index, 1);
        me.projects = projects;
      }
    }
    return me.save();
  }
}
