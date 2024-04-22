import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  public readonly users = [
    // {
    //   userId: 1,
    //   username: 'john',
    //   password: 'changeme',
    // },
    // {
    //   userId: 2,
    //   username: 'maria',
    //   password: 'guess',
    // },
  ];

  async getNewId(): Promise<number> {
    if (this.users.length === 0) {
      return 1;
    }

    let maxId = this.users[0].userId;

    for (const user of this.users) {
      if (user.userId > maxId) {
        maxId = user.userId;
      }
    }

    return maxId + 1;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneByPk(userId: number): Promise<User | undefined> {
    return this.users.find((user) => user.userId === userId);
  }

  async create(username: string, password: string): Promise<User | undefined> {
    const userFound = await this.findOne(username);

    if (userFound) return undefined;

    const newUser = {
      userId: await this.getNewId(),
      username,
      password
    }

    this.users.push(newUser);

    return newUser;
  }

  async updateOne(username: string, fieldsToUpdate: User): Promise<User | undefined> {
    const user = await this.findOne(username);

    let updated = false;

    Object.keys(fieldsToUpdate).forEach(key => {
      // Check if key exists in obj2
      if (user.hasOwnProperty(key)) {
        user[key] = fieldsToUpdate[key];
        updated = true;
      }
    });

    if(updated) return user

    return undefined;
  }
}
