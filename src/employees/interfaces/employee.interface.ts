import { IPosition } from "src/positions/interfaces";

export interface IEmployee {
  readonly id: number;
  readonly name: string;
  readonly position: IPosition;
  readonly child: IEmployee[];
  readonly parent: IEmployee;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}
