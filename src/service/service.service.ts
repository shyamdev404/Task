import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Service } from "./entities/service.entity";
import { InjectModel } from "@nestjs/sequelize";
import { Json } from "sequelize/types/utils";

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private serviceModel: typeof Service
  ) {}

  async create(categoryId: number, req: any) {
    // const service = new Service();
    req.body.category_id = categoryId;
    // service.service_name = req.body.service_name;
    // service.type = req.body.type;
    // return await service.save();
    console.log(req.body);
    req.body.price_options = JSON.stringify(req.body.price_options);

    return await this.serviceModel.create(req.body);
  }
  async getAllServicesByCategory(categoryId: number) {
    return this.serviceModel.findAll({
      where: { category_id: categoryId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async updateService(categoryId: number, serviceId: number, req: any) {
    const service = await this.serviceModel.findOne({
      where: {
        id: serviceId,
        category_id: categoryId,
      },
    });

    if (!service) {
      throw new NotFoundException(
        "Service not found in the specified category"
      );
    }

    // Update service fields if they are provided in the DTO
    if (req.body.service_name) {
      service.service_name = req.body.service_name;
    }

    if (req.body.type) {
      service.type = req.body.type;
    }
    if (req.body.price_options) {
      service.price_options = JSON.stringify(req.body.price_options);
    }

    return await service.save();
  }

  async removeServiceFromCategory(categoryId: number, serviceId: number) {
    // Check if the service exists in the specified category
    const service = await this.serviceModel.findOne({
      where: {
        id: serviceId,
        category_id: categoryId,
      },
    });

    // If service not found, throw NotFoundException
    if (!service) {
      throw new NotFoundException(
        "Service not found in the specified category"
      );
    }

    // Remove the service from the category by updating its category_id to null
    service.category_id = null;
    await service.save();

    return { message: "Service removed from category" };
  }
}
