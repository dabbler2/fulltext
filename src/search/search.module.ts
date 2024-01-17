import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import {Movie} from '../entities/movie.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
