import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Manager extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  managerId!: string;

  @Column()
  id!: string;

  @Column()
  password!: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  loginSecret: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
