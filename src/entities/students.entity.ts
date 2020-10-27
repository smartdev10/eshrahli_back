import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , BeforeInsert , BeforeUpdate , OneToMany , ManyToOne } from 'typeorm';
import { hashSync , genSaltSync } from 'bcryptjs';
import { SRequest } from './requests.entity';
import { Favorite } from './favorites.entity';
import { StudentNotificationEntity } from './student_notifications.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 ,default: "" })
  name: string;

  @Column('varchar'  ,{ length: 250 , unique:true })
  mobile: string;

  @Column('varchar'  ,{ length: 250 , default:"active" })
  status: string;

  @Column('varchar'  ,{ length: 250 , default: "" })
  gender: string;

  @Column('varchar'  ,{ length: 250 , default: ""  })
  push_id: string;

  @Column('varchar'  ,{ length: 250 , default: "" , select:false  })
  password: string;

  @OneToMany(type => Favorite, favorites => favorites.student , {onDelete:'CASCADE'})
  favorites:Favorite[]

  @OneToMany(type => StudentNotificationEntity, notification => notification.student , {onDelete:'CASCADE'})
  notifications:StudentNotificationEntity[]

  @OneToMany(type => SRequest, srequest => srequest.student ,{onDelete:'CASCADE'})
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
    if(this.password){
      console.log('GENERATE UPDATE');
      this.password = await hashSync(this.password, genSaltSync(10));
    }
  }

}
