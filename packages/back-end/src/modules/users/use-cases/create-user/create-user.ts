import { UseCase } from "../../../shared/core/use-case";
import { UserDto } from "../../dtos/user";
import { UserRepo } from "../../repos/user";

export class CreateUserUseCase implements UseCase<UserDto, Promise<any>> {
    #userRepo: UserRepo;

    constructor(private userRepo: UserRepo) {
        this.#userRepo = userRepo;
    }

    async execute(request?: any) {
        
    }
}