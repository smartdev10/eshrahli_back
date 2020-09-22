import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany } from 'typeorm';
import { Teacher } from './teachers.entity';

@Entity('nationalities')
export class Nationality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @OneToMany(() => Teacher, teachers => teachers.nationality)
  teachers:Teacher[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
