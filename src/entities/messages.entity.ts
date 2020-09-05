import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn  } from 'typeorm';
import { Student } from './students.entity';
import { Teacher } from './teachers.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @Column('varchar'  ,{ length: 250 })
  email: string;

  @Column('text')
  message: string;

  @Column('integer')
  sender: Student | Teacher;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
