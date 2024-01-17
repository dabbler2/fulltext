import {Column, Index, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('movie')
@Index(['name','body'],{ fulltext: true })
export class Movie{
	@PrimaryGeneratedColumn({unsigned: true})
    id: number

	@Index({ fulltext: true })
	@Column()
	name: string
	
	@Column('text')
	body: string
}