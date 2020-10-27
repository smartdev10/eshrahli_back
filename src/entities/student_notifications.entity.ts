import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn ,  ManyToOne } from 'typeorm';
import { SRequest } from './requests.entity';
import { Student } from './students.entity';

@Entity('students_notifications')
export class StudentNotificationEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar'  ,{ length: 250 })
  message: string;

  @ManyToOne(type => Student , student => student.notifications ,{onDelete:'CASCADE'})
  student: Student

  @ManyToOne(() => SRequest, request => request.notifications , {onDelete:'CASCADE'})
  request: SRequest;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
