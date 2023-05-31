/*Default Api calling
Default location Bhuj  */

import { useState } from "react";

var formdata = new FormData();
formdata.append("latitude", "23.2507356");
formdata.append("longitude", "69.6689201");

/* Home Service  */
var HomeCleaning = new FormData();
HomeCleaning.append("latitude", "23.2507356");
HomeCleaning.append("longitude", "69.6689201");
HomeCleaning.append("category_id", "213");

/*Laundry Service */
var LaundryService = new FormData();
LaundryService.append("latitude", "23.2507356");
LaundryService.append("longitude", "69.6689201");
LaundryService.append("category_id", "222");

/*Car Service */
var CarService = new FormData();
CarService.append("latitude", "23.2507356");
CarService.append("longitude", "69.6689201");
CarService.append("category_id", "259");

/*Plumbing Service */
var PlumbingService = new FormData();
PlumbingService.append("latitude", "23.2507356");
PlumbingService.append("longitude", "69.6689201");
PlumbingService.append("category_id", "240");

/* function for fetching Category  */
export const get_Api_Category = async () => {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_categories",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
};

/*  function for fetching Home Services */
export const get_categories_home = async () => {
  var requestOptions = {
    method: "POST",
    body: HomeCleaning,
    redirect: "follow",
  };

  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_sub_categories",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
};

/*  function for fetching laundry Services */
async function get_categories_laundry() {
  var requestOptions = {
    method: "POST",
    body: LaundryService,
    redirect: "follow",
  };

  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_sub_categories",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
}

/*  function for fetching plumbing Services */
async function get_categories_plumbing() {
  var requestOptions = {
    method: "POST",
    body: PlumbingService,
    redirect: "follow",
  };

  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_sub_categories",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
}

/*  function for fetching car Services */
async function get_categories_car() {
  var requestOptions = {
    method: "POST",
    body: CarService,
    redirect: "follow",
  };

  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_sub_categories",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
}

async function get_providers() {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_providers?limit=4",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
}

async function get_services() {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_services",
    requestOptions
  );
  const result = await response.json();
  // console.log(result);
  return result;
}

// async function allData() {
//   var requestOptions = {
//     method: "POST",
//     body: formdata,
//     redirect: "follow",
//   };
//   const response = await fetch(
//     "https://edemand.wrteam.me/api/v1",
//     requestOptions
//   );
//   const result = await response.json();
//   console.log(result);
//   return result;
// }
/*Exporting all Functions for reuseing in differnt components*/
export default {
  get_categories_home,
  get_Api_Category,
  get_categories_laundry,
  get_categories_car,
  get_categories_plumbing,
  get_providers,
  get_services,
};

/** This code is for fetchig datas from api
 * api: https://edemand.wrteam.me/api/v1/
 */
