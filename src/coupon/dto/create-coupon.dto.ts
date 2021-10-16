import {
  IsDateString,
  IsNotEmpty,
  IsPositive,
  IsBoolean,
  MaxLength,
  MinLength,
  IsString,
  IsInt,
  Min,
} from 'class-validator';
import { IsIncludes } from '@app/coupon/decorators/isIncluses.decorator';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  secret: string;
  @IsNotEmpty()
  @IsDateString({ strict: true })
  expire: Date;
  @IsNotEmpty()
  @IsString()
  @IsIncludes('type')
  type: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  count: number;
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
