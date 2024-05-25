import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { CategoryModule } from "./category/category.module";
import { ServiceModule } from "./service/service.module";
import { User } from "./users/entities/user.entity";
import { Category } from "./category/entities/category.entity";
import { Service } from "./service/entities/service.entity";
import { PriceOption } from "./service/entities/service.priceoption.entity";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "test",
      models: [User, Category, Service, PriceOption],
    }),
    UsersModule,
    CategoryModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
