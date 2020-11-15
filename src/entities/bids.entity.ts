import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , JoinColumn , OneToOne , ManyToOne, DeleteDateColumn} from 'typeorm';
import { Teacher } from './teachers.entity';
import { SRequest } from './requests.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SRequest, request => request.bids ,  {onDelete:'CASCADE'})
  request: SRequest;

  @ManyToOne(() => Teacher, teacher => teacher.bids ,  {onDelete:'CASCADE'})
  teacher: Teacher;

  @Column('float'  ,{ default: 0  })
  price: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp"})
  deletedAt: Date;

}
