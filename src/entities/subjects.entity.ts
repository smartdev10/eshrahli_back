import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany , ManyToMany , ManyToOne } from 'typeorm';
import { Level } from './levels.entity';
import { SRequest } from './requests.entity';
import { Teacher } from './teachers.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @Column('varchar' , { length: 250 , default : "main" })
  type: string;

  @OneToMany(type => SRequest, request => request.subject)
  requests: SRequest[];

  @ManyToMany(type => Teacher, teacher => teacher.subjects)
  teachers: Teacher[];
  
  @ManyToMany(type => Teacher, teacher => teacher.other_subjects)
  other_teachers: Teacher[];

  @ManyToOne(() => Level, level => level.subjects)
  level: Level;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
