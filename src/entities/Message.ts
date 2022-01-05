import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    messageId!: number;

    @Column()
    text: String;

    @ManyToOne(() => User, (user) => user.messages, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user: User;

    @ManyToOne(() => Room, (room) => room.messages, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    room: Room;

    @CreateDateColumn()
    createdAt: Date;
}