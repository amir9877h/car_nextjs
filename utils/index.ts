import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number = 23, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { brand, min_start_of_production_year, model, limit, fuel_type } =
    filters;
  const safe_brand = brand ? `&brand=${brand}` : "";
  const safe_model = model ? `&model=${model}` : "";
  const safe_min_start_of_production_year = min_start_of_production_year
    ? `&min_start_of_production_year=${min_start_of_production_year}`
    : "";
  const safe_limit = limit ? limit : 10;
  const safe_fuel_type = fuel_type ? `&fuel_type=${fuel_type}` : "";

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-data3.p.rapidapi.com",
  };

  console.log(
    `https://cars-data3.p.rapidapi.com/cars-data?limit=${safe_limit}&skip=0${safe_brand}${safe_model}${safe_fuel_type}${safe_min_start_of_production_year}`
  );

  // Set the required headers for the API request
  const response = await fetch(
    `https://cars-data3.p.rapidapi.com/cars-data?limit=${safe_limit}&skip=0${safe_brand}${safe_model}${safe_fuel_type}${safe_min_start_of_production_year}`,
    {
      headers: headers,
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    }
  );
  console.log(response);

  // Parse the response as JSON
  const result = await response.json();

  return result.reuslts;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { brand, model, start_of_production_year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", brand);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${start_of_production_year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};