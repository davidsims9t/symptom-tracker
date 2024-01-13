import { DomainEvent } from "../../../shared/domain/events/domain-event";
import UniqueEntityID from "../../../shared/domain/id";
import { LabResult } from "../lab-result";

export class LabResultUpdated implements DomainEvent {
  dateTimeOccurred: Date;
  user: LabResult;

  constructor(user: LabResult) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }
  
  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}

export default LabResultUpdated;