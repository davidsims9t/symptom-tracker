import { DomainEvent } from "../../../shared/domain/events/domain-event";
import UniqueEntityID from "../../../shared/domain/id";
import { User } from "../user";

export class UserCreated implements DomainEvent {
  dateTimeOccurred: Date;
  user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }
  
  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}

export default UserCreated;