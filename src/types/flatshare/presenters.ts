import { Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { FlatshareEntity } from "../../databases/mysql/flatshare.entity";

export class FlatsharePresenter {
    @Expose()
    @IsNumber()
    id: FlatshareEntity['id'];

    @Expose()
    @IsNumber()
    surface: FlatshareEntity['surface'];

    @Expose()
    @IsNumber()
    bedrooms: FlatshareEntity['bedrooms'];

    @Expose()
    @IsString()
    agency: FlatshareEntity['agency'];

    @Expose()
    @IsArray()
    @IsOptional()
    @Type(() => FlatsharePresenter)
    roomates: FlatshareEntity['roomates'];

    @Expose()
    @Type(() => FlatsharePresenter)
    chief: FlatshareEntity['chief'];
}