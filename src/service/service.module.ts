import { Module } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ServiceController } from "./service.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Service } from "./entities/service.entity";
import { PriceOption } from "./entities/service.priceoption.entity";

@Module({
  imports: [SequelizeModule.forFeature([Service, PriceOption])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
