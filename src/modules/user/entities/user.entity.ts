import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { EntityNames } from "src/common/enum/entity.enum";
import { AbstractEntity } from "src/common/abstracts/abstract.entity";
import { Roles } from "src/common/enum/role.enum";
import { TaskEntity } from "src/modules/task/entities/task.entity";

@Entity(EntityNames.User)
export class UserEntity extends AbstractEntity {
    @Column({ nullable: true, unique: true })
    phone:string;
    @Column({ unique: true })
    username:string;
    @Column({ nullable: true, unique: true })
    email:string;
    @Column()
    password:string;
    @Column({ nullable: true })
    profile_image:string;
    @Column({ default: Roles.Admin })
    role:string;
    @OneToMany(() => TaskEntity, task => task.user)
    tasks:TaskEntity[];
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
}