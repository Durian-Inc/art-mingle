import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  ManyToOne,
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

  @ManyToOne(() => User, user => user.submissions)
  user: Lazy<User>;

  @ManyToOne(() => Project, project => project.submissions)
  project: Lazy<Project>;
}
