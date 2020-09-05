import {  Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn , BeforeInsert , BeforeUpdate, ManyToOne , OneToMany} from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Entity('adminusers')
export class AdminUser  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 , unique : true})
  username: string;

  @Column({ length: 250 , unique : true})
  mobile: string;

  @Column({ length: 250 , select:false })
  password: string;

  @Column({ length: 250 })
  role: string;

  @Column({ default : "Active" })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @BeforeInsert()
  async generatePasswordHash(): Promise<void> {
    console.log('GENERATE');
    this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
}
