import { User } from "../domain/user";

export interface IUserRepo {
  getUserById(id: string): Promise<User>;
  getUsers(): Promise<User[]>;
  save(user: User): Promise<boolean>;
};