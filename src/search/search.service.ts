import { Injectable, BadRequestException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Movie} from 'src/entities/movie.entity'
import csvToJson from 'csvtojson'

@Injectable()
export class SearchService {
	constructor(
		@InjectRepository(Movie)
		private readonly movieRepository: Repository<Movie>
	) {}
	
	async create(file: Express.Multer.File){
		const csvContent = file.buffer.toString()
		const movieData = await csvToJson().fromString(csvContent)
		const movieRows = movieData.map(movie => ({name: movie.name, body: movie.body}))
		await this.movieRepository.save(movieRows)
	}
	
	async search(key: string){
		const res = await this.movieRepository.createQueryBuilder()
            .select().where(`match(name, body) against ('${key}')`).getMany()
		return res
	}
}
