import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn ,  ManyToOne } from 'typeorm';
import { Student } from './students.entity';
import { Teacher } from './teachers.entity';

@Entity('favorites')
export class Favorite {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Student , student => student.favorites)
  student: Student

  @ManyToOne(type => Teacher)
  teacher: Teacher

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
