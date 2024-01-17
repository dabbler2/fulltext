import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import Joi from 'joi'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { SearchModule } from './search/search.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: "mysql",
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    database: configService.get("DB_NAME"),
    entities: [__dirname + '/entities/*{.js,.ts}'],
    synchronize: configService.get("DB_SYNC"),
    logging: true,
  }),
  inject: [ConfigService],
}

@Module({
  imports: [
	ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
