/***
 * This code is for fetching or recivig data from api
 * BASE URL : https://edemand.wrteam.me 
 */
import { API_URL } from "../config/config";

const lat = localStorage.getItem("Lat");
const lng = localStorage.getItem("Lng");
const phone = localStorage.getItem("ContactInfo");
const token = localStorage.getItem("Token");

var formdata = new FormData();
formdata.append("latitude", lat);
formdata.append("longitude", lng);

var Bookmark = new FormData();
formdata.append("latitude", lat);
formdata.append("longitude", lng);

var Homeformdata = new FormData();
Homeformdata.append("latitude", lat);
Homeformdata.append("longitude", lng);
Homeformdata.append("limit", "6");

//for that which require authentications 
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);


// Function to get all home screen data
/* function for fetching Category  */
const get_home_screen = async () => {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    `${API_URL}/get_home_screen_data`,
    requestOptions
  );
  const result = await response.json();
  return result;
};

/* function for fetching Category  */
const get_Api_Category = async () => {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(`${API_URL}/get_categories`, requestOptions);
  const result = await response.json();
  return result;
};

// function for fetching all providers 
async function get_providers() {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(`${API_URL}/get_providers`, requestOptions);
  const result = await response.json();
  return result;
}

// function for fetching services 
async function get_services() {
  var requestOptions = {
    method: "POST",
    body: Homeformdata,
    redirect: "follow",
  };
  const response = await fetch(`${API_URL}/get_services`, requestOptions);
  const result = await response.json();
  return result;
}

// function for fetching some default settings 
async function get_settings() {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  const response = await fetch(`${API_URL}/get_settings`, requestOptions);
  const result = await response.json();
  return result;
}

// function for fetching default bookmarks 
async function get_bookmarks(bookmark) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: bookmark,
    headers: myHeaders,
  };
  const response = await fetch(`${API_URL}/book_mark`, requestOptions);
  const result = await response.json();
  return result;
}

// function for fetching cart items 
async function get_cart() {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: formdata,
    headers: myHeaders
  };
  const response = await fetch(`${API_URL}/get_cart`, requestOptions);
  const result = await response.json();
  return result;
}

//function for check is provider avilable for this location
const providerAvailable = async () => {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    `${API_URL}/provider_check_availability`,
    requestOptions
  );

  const result = await response.json();
  return result;
};

/*Exporting all Functions for reuseing in differnt components*/
export default{
  get_Api_Category,
  get_providers,
  get_services,
  get_settings,
  get_home_screen,
  providerAvailable,
  get_bookmarks,
  get_cart
};