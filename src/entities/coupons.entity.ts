import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany, Index } from 'typeorm';
import { SRequest } from './requests.entity';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , default:"" })
  name: string;

  @Index('UQ_coupon_code', { unique: true })
  @Column('varchar' , { length: 250 , default:""})
  code: string;

  @Column('varchar' , { length: 250 , default:"" })
  description: string;

  @Column('float' , { default:null , nullable :true })
  discount: number;

  @Column('varchar' , { length: 250 , default:"inactive" })
  status: string;

  @OneToMany(type => SRequest, request => request.coupon)
  requests: SRequest[];

  @CreateDateColumn({ type: "timestamp"})
  start: Date;

  @CreateDateColumn({ type: "timestamp"})
  end: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
