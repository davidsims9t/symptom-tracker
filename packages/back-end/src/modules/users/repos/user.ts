import { User } from "../domain/user";

export interface UserRepo {
  getUserById(id: string): Promise<User | void>;
  getUsers(): Promise<User[] | void>;
  save(user: User): Promise<boolean>;
};