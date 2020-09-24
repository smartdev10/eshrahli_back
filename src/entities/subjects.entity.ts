import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany , ManyToMany } from 'typeorm';
import { SRequest } from './requests.entity';
import { Teacher } from './teachers.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @OneToMany(type => SRequest, request => request.subject)
  requests: SRequest[];

  @ManyToMany(type => Teacher, teacher => teacher.subjects)
  teachers: Teacher[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
