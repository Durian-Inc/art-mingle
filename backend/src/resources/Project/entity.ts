import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  OneToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

import { Submission } from "../Submission";
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
  public category: string;

  @Field()
  @Column()
  public color: string;

  @Field(() => [Submission])
  @OneToMany(() => Submission, (submissions: Submission) => submissions.project)
  submissions: Lazy<Submission[]>;
}
