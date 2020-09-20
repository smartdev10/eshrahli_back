import {  Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn , BeforeInsert , BeforeUpdate } from 'typeorm';
import { hashSync , genSaltSync } from 'bcryptjs';


@Entity('adminusers')
export class AdminUser  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 , default:""})
  name: string;

  @Column({ length: 250 , unique : true})
  username: string;

  @Column({ length: 250 , unique : true})
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
