import { Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { FlatshareEntity } from "../../databases/mysql/flatshare.entity";
import { UserToCreateDTO } from "../user/dtos";

export class FlatshareToCreateDTO {
    @Expose()
    @IsNumber()
    surface: FlatshareEntity['surface'];

    @Expose()
    @IsString()
    agency: FlatshareEntity['agency'];

    @Expose()
    @IsNumber()
    bedrooms: FlatshareEntity['bedrooms'];

    @Expose()
    @IsOptional()
    @IsArray()
    @Type(() => UserToCreateDTO)
    roomates: FlatshareEntity['roomates'];
}