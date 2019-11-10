import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  ManyToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

import { Project } from "../Project";
import { Lazy } from "../../lib/helpers";

@ObjectType()
@Entity()
export class LearningResource extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Field()
  @Column()
  public description: string;

  @Field()
  @Column()
  public url: string;

  @Field()
  @Column()
  public color: string;

  @Field()
  @Column()
  public type: string;

  @Field(() => [Project])
  @ManyToMany(() => Project, (project: Project) => project.resources, {
    lazy: true
  })
  projects: Lazy<Project[]>;
}
