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
import { LearningResource } from "../LearningResource";
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
}
