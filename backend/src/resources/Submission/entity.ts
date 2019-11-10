import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
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
  public color: string;

  @Field()
  @Column()
  public url: string;

  @JoinTable()
  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user: User) => user.likes, { lazy: true })
  public likers?: Lazy<User[]>;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.submissions, { lazy: true })
  public user: Lazy<User>;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.submissions, { lazy: true })
  public project: Lazy<Project>;
}
