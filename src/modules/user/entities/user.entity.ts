import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { EntityNames } from "src/common/enum/entity.enum";
import { AbstractEntity } from "src/common/abstracts/abstract.entity";
import { Roles } from "src/common/enum/role.enum";

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
    @Column({ default: Roles.Admin })
    role:string;
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
}