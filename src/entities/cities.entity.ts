import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany } from 'typeorm';
import { SRequest } from './requests.entity';
import { Teacher } from './teachers.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @OneToMany(() => Teacher, teachers => teachers.city)
  teachers:Teacher[]

  @OneToMany(type => SRequest, request => request.city)
  requests: SRequest[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
