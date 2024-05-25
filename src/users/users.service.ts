// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UsersService {
//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all users`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService
  ) {}

  async register(req) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hashSync(
      req.body.password,
      saltOrRounds
    );
    req.body.password = hashedPassword;
    return await this.userModel.create(req.body);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: { email },
    });

    // If user is found, get the plain data values
    const plainUser = user ? user.get({ plain: true }) : null;

    if (plainUser) {
      const isPasswordValid = await bcrypt.compareSync(
        pass,
        plainUser?.password
      );
      console.log("Password valid:", isPasswordValid);
      const { password, ...result } = plainUser;
      console.log("Authenticated user:", result);
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
