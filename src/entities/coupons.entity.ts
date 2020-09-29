import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany } from 'typeorm';
import { SRequest } from './requests.entity';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , default:"" })
  name: string;

  @Column('varchar' , { length: 250 , default:"" , unique:true })
  code: string;

  @Column('varchar' , { length: 250 , default:"" })
  description: string;

  @Column('varchar' , { length: 250 , default:"" })
  discount: string;

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
