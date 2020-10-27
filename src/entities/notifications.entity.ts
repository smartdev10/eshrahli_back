import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn ,  ManyToOne } from 'typeorm';
import { Teacher } from './teachers.entity';
import { SRequest } from './requests.entity';

@Entity('notifications')
export class NotificationEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar'  ,{ length: 250 })
  message: string;

  @ManyToOne(type => Teacher , teacher => teacher.notifications , {onDelete:'CASCADE'})
  teacher: Teacher

  @ManyToOne(() => SRequest, request => request.notifications , {onDelete:'CASCADE'})
  request: SRequest;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
