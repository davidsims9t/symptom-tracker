import { User } from "../../users/domain/user";
import { LabResult } from "../domain/lab-result";

export interface LabRepo {
  getLabs(id: string, user: User): Promise<LabResult[]>;
  getLabById(id: string, user: User): Promise<LabResult>;
  save(lab: LabResult): Promise<boolean>;
};