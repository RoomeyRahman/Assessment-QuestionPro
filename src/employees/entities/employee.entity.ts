import { Entity, Column, ManyToOne, TreeChildren, TreeParent } from 'typeorm';
import { BaseEntity } from '../../common/entities';
import { Position } from 'src/positions/entities/position.entity';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
	@Column({ type: 'varchar', length: 200 })
  name: string;

  @ManyToOne(() => Position, position => position.Employees)
  position: Position;

  @TreeChildren()
  child: Employee[];

  @TreeParent()
  parent: Employee;
}

