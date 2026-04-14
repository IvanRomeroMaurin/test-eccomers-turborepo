import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany();
  }

  async findById(id: string) {
    const record = await this.prisma.users.findUnique({
      where: { id } as any,
      include: {
        user_roles: {
          include: { roles: true }
        }
      } as any
    });
    if (!record) throw new NotFoundException(`User #${id} not found`);
    return record;
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  create(dto: CreateUserDto) {
    return this.prisma.users.create({ data: dto as any });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    return this.prisma.users.update({
      where: { id } as any,
      data: dto as any,
      include: {
        user_roles: {
          include: { roles: true }
        }
      } as any
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.users.delete({ where: { id } });
  }

  // Verificar si un usuario tiene un rol específico
  async hasRole(userId: string, roleName: string): Promise<boolean> {
    const userRole = await this.prisma.user_roles.findFirst({
      where: {
        user_id: userId,
        roles: { name: roleName }
      },
      include: { roles: true }
    });
    return !!userRole;
  }
}
