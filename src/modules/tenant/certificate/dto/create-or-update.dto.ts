import { IsNotEmpty } from 'class-validator'

export class CreateOrUpdateDto {
    @IsNotEmpty()
    file: Express.Multer.File

    @IsNotEmpty()
    password: string
}