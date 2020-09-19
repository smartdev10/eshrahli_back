import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn , CreateDateColumn , OneToMany , OneToOne , JoinColumn , BeforeUpdate , BeforeInsert , ManyToMany, JoinTable } from 'typeorm';
import { Nationality } from './nationalities.entity';
import { City } from './cities.entity';
import { Level } from './levels.entity';
import { Subject } from './subjects.entity';
import { hashSync , genSaltSync } from 'bcryptjs';
import { SRequest } from './requests.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar' , { length: 250 , nullable : false })
  name: string;

  @Column('varchar' ,{ length: 250 , unique : true })
  mobile: string;

  @Column('varchar'  ,{ length: 250 , default:"" })
  push_id: string;

  @OneToOne(type => Nationality) // specify inverse side as a second parameter
  @JoinColumn()
  nationality: Nationality;

  @OneToOne(type => City) // specify inverse side as a second parameter
  @JoinColumn()
  city: City;

  @Column('varchar'  ,{ length: 250 , default:"" })
  gender: string;

  @Column('text' ,{ default:"" })
  qualification :string

  @ManyToMany(type => Level)
  @JoinTable()
  levels:Level[]

  @ManyToMany(type => Subject)
  @JoinTable()
  subjects:Subject[]

  @OneToMany(type => SRequest, srequest => srequest.teacher)
  requests:SRequest[]

  @Column('varchar' ,{ length: 250 , default: "inactive" })
  status: string;

  @Column('varchar' ,{ length: 250 , default:"" })
  bankname: string;

  @Column('varchar' ,{ length: 250 , default:"" })
  bankiban: string;

  @Column('varchar'  ,{ length: 250 , default:"" , select:false })
  password: string;

  @Column('varchar' ,{ length: 250 , default:"" })
  image: string;
  
  @Column('varchar' ,{ length: 250 , default:""})
  certificate: string;

  @Column('varchar' ,{ length: 250 , default:""})
  personalcard: string;

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
