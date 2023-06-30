/*Default Api calling
Default location Bhuj  */

import { useState } from "react";

const lat = localStorage.getItem("Lat");
const lng = localStorage.getItem("Lng");

var formdata = new FormData();
formdata.append("latitude", lat);
formdata.append("longitude", lng);

var Homeformdata = new FormData();
Homeformdata.append("latitude", lat);
Homeformdata.append("longitude", lng);
Homeformdata.append("limit", "6");

/* Home Service  */
var HomeCleaning = new FormData();
HomeCleaning.append("latitude", lat);
HomeCleaning.append("longitude", lng);
HomeCleaning.append("category_id", "213");

/*Laundry Service */
var LaundryService = new FormData();
LaundryService.append("latitude", lat);
LaundryService.append("longitude", lng);
LaundryService.append("category_id", "222");

/*Car Service */
var CarService = new FormData();
CarService.append("latitude", lat);
CarService.append("longitude", lng);
CarService.append("category_id", "259");

/*Plumbing Service */
var PlumbingService = new FormData();
PlumbingService.append("latitude", lat);
PlumbingService.append("longitude", lng);
PlumbingService.append("category_id", "240");


// Function to get all home screen data 
/* function for fetching Category  */
export const get_home_screen = async () => {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    "https://edemand-test.thewrteam.in/api/v1/get_home_screen_data",
    requestOptions
  );
  const result = await response.json();
  return result;
};


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
  return result;
}

async function get_providers() {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_providers",
    requestOptions
  );
  const result = await response.json();
  return result;
}

async function get_home_providers() {
  var requestOptions = {
    method: "POST",
    body: Homeformdata,
    redirect: "follow",
  };
  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_providers",
    requestOptions
  );
  const result = await response.json();
  return result;
}

async function get_services() {
  var requestOptions = {
    method: "POST",
    body: Homeformdata,
    redirect: "follow",
  };
  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_services",
    requestOptions
  );
  const result = await response.json();
  return result;
}

async function get_settings() {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  const response = await fetch(
    "https://edemand.wrteam.me/api/v1/get_settings",
    requestOptions
  );
  const result = await response.json();
  return result;
}

/*Exporting all Functions for reuseing in differnt components*/
export default {
  get_categories_home,
  get_Api_Category,
  get_categories_laundry,
  get_categories_car,
  get_categories_plumbing,
  get_providers,
  get_services,
  get_home_providers,
  get_settings,
  get_home_screen
};

/** This code is for fetchig datas from api
 * api: https://edemand.wrteam.me/api/v1/
 */
