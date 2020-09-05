import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @Column('varchar' , { length: 250 , nullable : false })
  code: string;

  @Column('varchar' , { length: 250 , nullable : false })
  description: string;

  @Column('varchar' , { length: 250 , nullable : false })
  discount: string;

  @CreateDateColumn({ type: "timestamp"})
  start: Date;

  @CreateDateColumn({ type: "timestamp"})
  end: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

}
