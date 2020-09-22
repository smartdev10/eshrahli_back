import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany } from 'typeorm';
import { Student } from './students.entity';
import { Teacher } from './teachers.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @OneToMany(() => Teacher, teachers => teachers.city)
  teachers:Teacher[]

  @OneToMany(() => Student, student => student.city)
  students:Student[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
