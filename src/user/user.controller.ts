import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get')
  getAll() {
    return this.userService.getAll();
  }

  @Get('get/:id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Put('update/:id')
  update(@Body() dto: UserUpdateDto) {
    return this.userService.update(dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
