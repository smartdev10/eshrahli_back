import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , JoinColumn , OneToOne , ManyToOne} from 'typeorm';
import { Level } from './levels.entity';
import { Subject } from './subjects.entity';
import { Coupon } from './coupons.entity';
import { Student } from './students.entity';
import { Teacher } from './teachers.entity';

@Entity('srequests')
export class SRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @Column('float'  , { nullable : false })
  amount: number;

  @Column('varchar'  ,{ length: 250 })
  type: string;

  @OneToOne(type => Level)
  @JoinColumn()
  level: Level;

  @OneToOne(type => Subject)
  @JoinColumn()
  material: Subject;

  coupon: Coupon;

  @Column('varchar'  ,{ length: 250 })
  latitude: string;

  @Column('varchar'  ,{ length: 250 })
  longitude: string;
  
  @CreateDateColumn({ type: "timestamp"})
  date: Date;

  @CreateDateColumn({ type: "time"})
  time: Date;

  @Column('text')
  details: string;

  @ManyToOne(type => Student, student => student.requests)
  student: Student;

  @ManyToOne(type => Teacher, teacher => teacher.requests)
  teacher: Teacher;

  @Column('varchar'  ,{ length: 250 })
  paymentMethod: string;

  @Column('varchar'  ,{ length: 250 })
  zoomLink: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
