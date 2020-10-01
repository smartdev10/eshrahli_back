import {  Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn , BeforeInsert , BeforeUpdate , Index } from 'typeorm';
import { hashSync , genSaltSync } from 'bcryptjs';


@Entity('adminusers')
export class AdminUser  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 , default:""})
  name: string;

  @Index('UQ_admin_username', { unique: true })
  @Column({ length: 250 })
  username: string;

  @Index('UQ_admin_mobile', { unique: true })
  @Column({ length: 250 })
  mobile: string;

  @Column({ length: 250 , select:false })
  password: string;

  @Column({ length: 250 , default:"superuser" })
  role: string;

  @Column({ default : "active" })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @BeforeInsert()
  async generatePasswordHash(): Promise<void> {
    console.log('GENERATE');
    this.password = await hashSync(this.password, genSaltSync(10));
  }
  @BeforeUpdate()
  async generatePasswordHash2(): Promise<void> {
    if(this.password){
      console.log('GENERATE UPDATE');
      this.password = await hashSync(this.password, genSaltSync(10));
    }
  }
}
