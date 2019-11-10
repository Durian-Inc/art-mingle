import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";

import { User } from "../User";
import { Project } from "../Project";

@ObjectType()
@Entity()
export class Submission extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Field()
  @CreateDateColumn()
  public readonly dateSubmitted: Date;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column()
  public category: string;

  @Field()
  @Column()
  public color: string;

  @Field()
  @Column()
  public likes: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.submissions, { lazy: true })
  user: Lazy<User>;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.submissions, { lazy: true })
  project: Lazy<Project>;
}
