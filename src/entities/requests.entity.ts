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

  @ManyToOne(type => Student, student => student.requests)
  student: Student;

  @ManyToOne(type => Teacher, teacher => teacher.requests)
  teacher: Teacher;

  @Column('varchar'  ,{ length: 250  })
  search_type: string;

  @ManyToOne(type => Level, level => level.requests)
  level: Level;

  @ManyToOne(type => Subject, subject => subject.requests)
  subject: Subject;

  @OneToOne(type => Coupon)
  coupon: Coupon;

  @Column('float'  , { default : null})
  amount: number;

  @Column('varchar'  ,{ length: 250 })
  latitude: string;

  @Column('integer'  ,{ default : 1  })
  nstudents: number;

  @Column('varchar'  ,{ length: 250 })
  longitude: string;
  
  @CreateDateColumn({ type: "timestamp"})
  sessionDate: Date;

  @Column('varchar'  ,{ length: 250 , default : "" })
  paymentMethod: string;

  @Column('varchar'  ,{ length: 250 , default : "" })
  zoomLink: string;

  @Column('varchar'  ,{ length: 250 , default : "pending" })
  status: string;

  @Column('text' , { default : "" })
  details: string;

  @Column('varchar' , { length: 250 , default : "" })
  other: string;

  @Column('varchar' , { length: 250 , default : "male" })
  student_gender: string;

  @Column('varchar' , { length: 250 , default : "male" })
  teacher_gender: string;

  @CreateDateColumn({ type: "timestamp" , nullable:true , default: () => "NULL"  })
  cancellationDate: Date;

  @Column('integer' ,{ default:null })
  canceledBy: Student | Teacher;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
