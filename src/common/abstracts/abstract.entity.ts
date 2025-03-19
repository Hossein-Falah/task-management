import { PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}