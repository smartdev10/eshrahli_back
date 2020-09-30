import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany , ManyToMany , JoinTable } from 'typeorm';
import { SRequest } from './requests.entity';
import { Subject } from './subjects.entity';
import { Teacher } from './teachers.entity';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @OneToMany(type => SRequest, request => request.level)
  requests: SRequest[];

  @ManyToMany(type => Teacher, teacher => teacher.levels)
  teachers: Teacher[];

  @ManyToMany(() => Subject , subject => subject.levels , {onUpdate:'CASCADE'})
  @JoinTable()
  subjects:Subject[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
