import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from "../User";
import { Project } from "../Project";
import { Lazy } from "../../lib/helpers";

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Field()
  @Column()
  public name: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.groups, { lazy: true })
  users: Lazy<User[]>;

  @Field(() => [Project])
  @ManyToMany(() => Project, (project: Project) => project.groups, {
    lazy: true
  })
  projects: Lazy<Project[]>;
}
