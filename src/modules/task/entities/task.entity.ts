import { Column, CreateDateColumn, Entity, ManyToMany, UpdateDateColumn } from "typeorm";
import { EntityNames } from "src/common/enum/entity.enum";
import { AbstractEntity } from "src/common/abstracts/abstract.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Entity(EntityNames.Task)
export class TaskEntity extends AbstractEntity {
    @Column()
    title:string;
    @Column({ type: "text", nullable: true })
    description:string;
    @Column({ nullable: true })
    attchmentUrl:string;
    @Column({ nullable: true })
    userId:string;
    @ManyToMany(() => UserEntity, user => user.tasks, { onDelete: "CASCADE" })
    user:UserEntity;
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
}