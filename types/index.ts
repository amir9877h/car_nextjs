import { MouseEventHandler } from "react";

export interface CarProps {
  title: string;
  body_type: string;
  seats: number;
  doors: number;
  cceleration_0_100_kmh: string;
  drive_wheel: string;
  fuel_type: string;
  length_in: number;
  brand: string;
  model: string;
  start_of_production_year:number;
}

export interface FilterProps {
  brand?: string;
  min_start_of_production_year?: number;
  model?: string;
  limit?: number;
  fuel_type?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}