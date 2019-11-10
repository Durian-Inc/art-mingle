import { MigrationInterface } from "typeorm";

import { User } from "../resources/User";
import { Project } from "../resources/Project";
import { Submission } from "../resources/Submission";

export class data1573343123926 implements MigrationInterface {
  public async up(): Promise<any> {
    const project1: Project = await Project.create({
      name: "Sing-off",
      category: "Music",
      color: "#46EAEA"
    }).save();

    const project2: Project = await Project.create({
      name: "Sing-off II",
      category: "Music",
      color: "#46EAEA"
    }).save();

    const clay: User = await User.create({
      sub: "1",
      firstName: "Clay",
      lastName: "McGinnis",
      email: "cmcginnis@test.com",
      emailVerified: true
    }).save();

    const david: User = await User.create({
      sub: "2",
      firstName: "David",
      lastName: "Gardiner",
      email: "dgardiner@test.com",
      emailVerified: true,
      following: [clay]
    }).save();

    const kevin: User = await User.create({
      sub: "3",
      firstName: "Kevin",
      lastName: "Schoonover",
      email: "kschoon@test.com",
      emailVerified: true
    }).save();

    const tommy: User = await User.create({
      sub: "4",
      firstName: "Tommy",
      lastName: "Dong",
      email: "tdong@test.com",
      emailVerified: true,
      following: [clay, kevin, david]
    }).save();

    await Submission.create({
      name: "The Best",
      category: "music",
      color: "#46EAEA",
      likes: 25,
      user: clay,
      project: project2
    }).save();

    await Submission.create({
      name: "The Best III",
      category: "music",
      color: "#46EAEA",
      likes: 30,
      user: david,
      project: project2
    }).save();

    await Submission.create({
      name: "The Best IIII",
      category: "music",
      color: "#46EAEA",
      likes: 12,
      user: kevin,
      project: project1
    }).save();

    await Submission.create({
      name: "The Best II",
      category: "music",
      color: "#46EAEA",
      likes: 12,
      user: tommy,
      project: project1
    }).save();
  }

  public async down(): Promise<any> {}
}
