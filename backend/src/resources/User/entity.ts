import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  JoinTable,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  Index,
  PrimaryGeneratedColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";

import { Submission } from "../Submission";
import { Group } from "../Group";
import { Project } from "../Project";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Index({ unique: true })
  @Column()
  public sub: string;

  @Field({ nullable: true })
  @Column({
    length: 50,
    nullable: true
  })
  public firstName?: string;

  @Field({ nullable: true })
  @Column({
    length: 50,
    nullable: true
  })
  public lastName?: string;

  @Field()
  @Column({
    unique: true
  })
  public email: string;

  @Field()
  @Column()
  public emailVerified: boolean;

  @Field()
  @Column({ default: "https://www.gravatar.com/avatar/?d=identicon&s=140" })
  public profilePictureUrl: string;

  @Field()
  @CreateDateColumn()
  public readonly dateJoined: Date;

  @Field(() => [Submission])
  @ManyToMany(() => Submission, (submission: Submission) => submission.likers, {
    lazy: true
  })
  public likes: Lazy<Submission[]>;

  @Field(() => [Submission])
  @OneToMany(() => Submission, (submissions: Submission) => submissions.user, {
    lazy: true
  })
  @JoinTable()
  submissions: Lazy<Submission[]>;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.following, { lazy: true })
  @JoinTable()
  followers: Lazy<User[]>;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.followers, { lazy: true })
  following: Lazy<User[]>;

  @Field(() => [Group])
  @ManyToMany(() => Group, (group: Group) => group.users, { lazy: true })
  @JoinTable()
  groups: Lazy<Group[]>;

  @Field(() => [Project])
  @ManyToMany(() => Project, project => project.participants, { lazy: true })
  @JoinTable()
  projects: Lazy<Project[]>;
}
