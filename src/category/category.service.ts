import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) {}
  async create(req: any) {
    return await this.categoryModel.create(req.body);
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  findOne(id: number): Promise<Category> {
    return this.categoryModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, req: any): Promise<Category> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(req.body);
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
