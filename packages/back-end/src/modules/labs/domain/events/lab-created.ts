import { DomainEvent } from "../../../shared/domain/events/domain-event";
import UniqueEntityID from "../../../shared/domain/id";
import { LabResult } from "../lab-result";

export class LabResultCreated implements DomainEvent {
  dateTimeOccurred: Date;
  lab: LabResult;

  constructor(user: LabResult) {
    this.dateTimeOccurred = new Date();
    this.lab = user;
  }
  
  getAggregateId(): UniqueEntityID {
    return this.lab.id;
  }
}

export default LabResultCreated;