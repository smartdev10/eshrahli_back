import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , BeforeInsert , BeforeUpdate , OneToMany } from 'typeorm';
import { hashSync , genSaltSync } from 'bcryptjs';
import { SRequest } from './requests.entity';
import { Favorite } from './favorites.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @Column('varchar'  ,{ length: 250 , unique:true })
  mobile: string;

  @Column('varchar'  ,{ length: 250 , default:"active" })
  status: string;

  @Column('varchar'  ,{ length: 250 })
  gender: string;

  @Column('varchar'  ,{ length: 250 })
  push_id: string;

  @Column('varchar'  ,{ length: 250 })
  password: string;

  @OneToMany(type => Favorite, favorites => favorites.student)
  favorites:Favorite[]

  @OneToMany(type => SRequest, srequest => srequest.student)
  requests:SRequest[]

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
    console.log('GENERATE UPDATE');
    this.password = await hashSync(this.password, genSaltSync(10));
  }

}
