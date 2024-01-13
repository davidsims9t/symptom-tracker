import { DomainEvent } from "../../../shared/domain/events/domain-event";
import UniqueEntityID from "../../../shared/domain/id";
import { LabResult } from "../lab-result";

export class LabResultDeleted implements DomainEvent {
  dateTimeOccurred: Date;
  lab: LabResult;

  constructor(lab: LabResult) {
    this.dateTimeOccurred = new Date();
    this.lab = lab;
  }
  
  getAggregateId(): UniqueEntityID {
    return this.lab.id;
  }
}

export default LabResultDeleted;