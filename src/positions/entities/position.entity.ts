import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities';
import { Designation } from 'src/common/constant';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity({ name: 'positions' })
export class Position extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Designation,
    unique: true
  })
  name: string;

  @OneToMany(() => Employee, Employee => Employee.position)
  Employees: Employee[];
}

