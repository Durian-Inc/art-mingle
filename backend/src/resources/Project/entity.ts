import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  OneToMany,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn
} from "typeorm";

import { Submission } from "../Submission";
import { User } from "../User";
import { LearningResource } from "../LearningResource";
import { Group } from "../Group";
import { Lazy } from "../../lib/helpers";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column()
  public description: string;

  @Field()
  @Column()
  public category: string;

  @Field()
  @Column()
  public color: string;

  @Field()
  @Column()
  public deadline: Date;

  @Field(() => [Submission])
  @OneToMany(
    () => Submission,
    (submissions: Submission) => submissions.project,
    { lazy: true }
  )
  submissions: Lazy<Submission[]>;

  @Field(() => [LearningResource])
  @ManyToMany(
    () => LearningResource,
    (learningResource: LearningResource) => learningResource.projects,
    {
      lazy: true
    }
  )
  @JoinTable()
  resources: Lazy<LearningResource[]>;

  @Field(() => [Group])
  @ManyToMany(() => Group, (group: Group) => group.projects, {
    lazy: true
  })
  @JoinTable()
  groups: Lazy<Project[]>;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.projects, { lazy: true })
  participants: Lazy<User[]>;
}
