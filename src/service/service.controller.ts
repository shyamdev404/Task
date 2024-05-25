import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("category/:categoryId")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post("/service")
  create(@Param("categoryId") categoryId: number, @Req() req: any) {
    // console.log(categoryId);

    return this.serviceService.create(categoryId, req);
  }

  @Get("/services")
  async getAllServicesByCategory(@Param("categoryId") categoryId: number) {
    return this.serviceService.getAllServicesByCategory(categoryId);
  }

  @Patch("service/:serviceId")
  async updateService(
    @Param("categoryId") categoryId: number,
    @Param("serviceId") serviceId: number,
    @Req() req: any
  ) {
    return this.serviceService.updateService(categoryId, serviceId, req);
  }

  @Delete("/service/:serviceId")
  async removeServiceFromCategory(
    @Param("categoryId") categoryId: number,
    @Param("serviceId") serviceId: number
  ) {
    return this.serviceService.removeServiceFromCategory(categoryId, serviceId);
  }
}
