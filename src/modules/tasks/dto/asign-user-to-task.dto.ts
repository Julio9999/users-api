import { IsNumber } from "class-validator";

export class AsignUserToTaskDto {

    @IsNumber()
    userId: number

}