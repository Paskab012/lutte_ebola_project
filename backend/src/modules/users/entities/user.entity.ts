import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../../common/enums/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Dr. Jean-Paul Mbeki' })
  @Column({ name: 'full_name' })
  fullName: string;

  @ApiProperty({ example: 'jpmbeki@who.int' })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ enum: Role, example: Role.EPIDEMIOLOGIST })
  @Column({ type: 'enum', enum: Role, default: Role.VIEWER })
  role: Role;

  @ApiProperty({ example: 'OMS Bureau de Goma' })
  @Column({ nullable: true })
  organization: string;

  @ApiProperty({ example: '+243 97 000 0000' })
  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @ApiProperty({ example: 'Goma, Nord-Kivu' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Exclude()
  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string | null;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date | null;
}
