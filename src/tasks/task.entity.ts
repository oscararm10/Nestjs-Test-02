import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'tasks'})
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    titulo: string

    @Column()
    descripcion: string

    @Column()
    estado: string
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}