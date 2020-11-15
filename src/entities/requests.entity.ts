import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany  , ManyToOne, DeleteDateColumn ,  } from 'typeorm';
import { Level } from './levels.entity';
import { Subject } from './subjects.entity';
import { Coupon } from './coupons.entity';
import { Student } from './students.entity';
import { Teacher } from './teachers.entity';
import { Bid } from './bids.entity';
import { City } from './cities.entity';
import { StudentNotificationEntity } from './student_notifications.entity';
import { NotificationEntity } from './notifications.entity';

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

  @ManyToOne(() => Level, level => level.requests)
  level: Level;

  @ManyToOne(() => Subject, subject => subject.requests)
  subject: Subject;

  @ManyToOne(() => City, city => city.requests)
  city: City;

  @OneToMany(() => Bid, bid => bid.request)
  bids:Bid[]

  @OneToMany(() => StudentNotificationEntity, sn => sn.request)
  student_notifications:StudentNotificationEntity[]

  @OneToMany(() => NotificationEntity, n => n.request)
  notifications:NotificationEntity[]

  @ManyToOne(() => Coupon, coupon => coupon.requests)
  coupon: Coupon;

  @Column('float'  , { default : null})
  discount_amount: number;

  @Column('float'  , { default : null})
  tax: number;

  @Column('float'  , { default : null})
  total: number;

  @Column('varchar'  ,{ length: 250 })
  latitude: string;

  @Column('integer'  ,{ default : 1  })
  nstudents: number;

  @Column('varchar'  ,{ length: 250 })
  longitude: string;
  
  @Column({ type: "timestamp"})
  sessionDate: Date;

  @Column({ type: "timestamp" , nullable:true , default: () => "NULL"  })
  lesson_start_time: Date;

  @Column({ type: "timestamp" , nullable:true , default: () => "NULL"  })
  lesson_end_time: Date;

  @Column('varchar'  ,{ length: 250 , default : "" })
  paymentMethod: string;

  @Column('varchar'  ,{ length: 250 , default : "" })
  paymentReference: string;

  @Column('varchar'  ,{ length: 250 , default : "" })
  lesson_duration : string;

  @Column('varchar'  ,{ length: 250 , default : "" })
  hostZoomLink: string;

  @Column('varchar'  ,{ length: 250 , default : "" })
  clientZoomLink: string;

  @Column('varchar'  ,{ length: 250 , default : "" })
  zoomPass: string;

  @Column('varchar'  ,{ length: 250 , default : "PENDING" })
  status: string;

  @Column('boolean'  ,{ default:false })
  paid: boolean;

  @Column('boolean'  ,{ default:false })
  is_remote: boolean;

  @Column('text' , { default : "" })
  details: string;

  @Column('varchar' , { length: 250 , default : "" })
  other: string;

  @Column('varchar' , { length: 250 , default : "male" })
  student_gender: string;

  @Column('varchar' , { length: 250 , default : "male" })
  teacher_gender: string;

  @Column({ type: "timestamp" , nullable:true , default: () => "NULL"  })
  cancellationDate: Date;

  @Column('integer' ,{ default:null })
  canceledBy: Student | Teacher;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp"})
  deletedAt: Date;

}
