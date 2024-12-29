import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from '../../infraestructure/repositories/boards/boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async create(createBoardDto: CreateBoardDto) {
    const { name } = createBoardDto;
    await this.boardsRepository.create({
      data: {
        name,
      },
    });

    return 'Tablero creado exitosamente';
  }

  findAll() {
    return this.boardsRepository.findAll()
  }

  findOne(id: number) {
    return this.boardsRepository.findOne(id)
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
