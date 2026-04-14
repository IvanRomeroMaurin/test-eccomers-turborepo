import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';
import { RolesGuard } from './guards/roles.guard';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PassportModule, PrismaModule],
  providers: [SupabaseStrategy, RolesGuard],
  exports: [SupabaseStrategy, RolesGuard],
})
export class AuthModule {}
