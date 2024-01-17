import { Post, Get, Query, UseInterceptors, UploadedFile, Controller } from '@nestjs/common'
import {SearchService} from './search.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) {}
	
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	async create(@UploadedFile() file: Express.Multer.File) {
		await this.searchService.create(file)
	}
	
	@Get('?')
	async search(@Query('key') key){
		return await this.searchService.search(key)
	}
}
