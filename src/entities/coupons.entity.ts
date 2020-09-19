import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , default:"" })
  name: string;

  @Column('varchar' , { length: 250 , default:"" })
  code: string;

  @Column('varchar' , { length: 250 , default:"" })
  description: string;

  @Column('varchar' , { length: 250 , default:"" })
  discount: string;

  @Column('varchar' , { length: 250 , default:"inactive" })
  status: string;

  @CreateDateColumn({ type: "timestamp"})
  start: Date;

  @CreateDateColumn({ type: "timestamp"})
  end: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
