import React, { useEffect, useState } from "react";

const GoogleMapWithLocation = () => {

    const [condition, setCondition] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    const init = () => {

    }
    useEffect(() => {
        // Load Google Maps API script dynamically
        const script = document.createElement("script");
        const apiKey = 'AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=init`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialize map once the Google Maps API is loaded
            initMap();
            setMapLoaded(true); // Update the mapLoaded flag once the map is loaded
        };

    }, [condition]);

    useEffect(() => {
        setCondition(!condition);
    }, [])

    useEffect(() => {
        if (mapLoaded) {
          // Store the mapLoaded status in localStorage
          localStorage.setItem("mapLoaded", JSON.stringify(mapLoaded));
        }
      }, [mapLoaded]);

    const initMap = () => {

        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 23.171664978883527, lng: 69.57070658721315 },
            zoom: 8,
        });

        const marker = new window.google.maps.Marker({
            map: map,
            position: { lat: 23.171664978883527, lng: 69.57070658721315 },
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
            },
        });

        map.addListener("click", (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            localStorage.setItem("addLat", lat);
            localStorage.setItem("addLong", lng);

            const geocoder = new window.google.maps.Geocoder();
            const location = new window.google.maps.LatLng(lat, lng);

            geocoder.geocode({ location: location }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const addressComponents = results[0].address_components;
                    const locationName = getAddressComponentValue(addressComponents, "locality") || getAddressComponentValue(addressComponents, "sublocality") || getAddressComponentValue(addressComponents, "administrative_area_level_1") || getAddressComponentValue(addressComponents, "country");
                    localStorage.setItem("addLocationName", locationName);
                    const state = getAddressComponentValue(addressComponents, "administrative_area_level_1");
                    const country = getAddressComponentValue(addressComponents, "country");

                    localStorage.setItem("addLocationName", locationName);
                    localStorage.setItem("addState", state);
                    localStorage.setItem("addCountry", country);

                    console.log("Location Name:", locationName);
                    console.log("State:", state);
                    console.log("Country:", country);
                } else {
                    console.log("Geocoder failed due to:", status);
                }
            });

            console.log("Latitude:", lat);
            console.log("Longitude:", lng);

            // Update marker position
            marker.setPosition({ lat: lat, lng: lng });
            map.panTo({ lat: lat, lng: lng });
        });
    };

    const getAddressComponentValue = (addressComponents, type) => {
        for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            const componentType = component.types[0];

            if (componentType === type) {
                return component.long_name;
            }
        }
        return null;
    };


    return (
        <div>
            <div id="map" style={{ height: "430px" }}></div>
        </div>
    );
};

export default GoogleMapWithLocation;



// export const UpdateLocationMap = () => {

//     const [condition, setCondition] = useState(false);
//     const [mapLoaded, setMapLoaded] = useState(false);

//     const lat = localStorage.getItem("addLat");
//     const long = localStorage.getItem("addLong");

//     console.log("Lattt",lat)
//     console.log("Laonggg",long)

//     const init = () => {

//     }
//     useEffect(() => {
//         // Load Google Maps API script dynamically
//         const script = document.createElement("script");
//         const apiKey = 'AIzaSyA0B2eTsnUMMG4SN6Agjz7JD3w_gCDj1lE';
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=init`;
//         script.async = true;
//         document.body.appendChild(script);

//         script.onload = () => {
//             // Initialize map once the Google Maps API is loaded
//             initMap();
//             setMapLoaded(true); // Update the mapLoaded flag once the map is loaded
//         };

//     }, [condition]);

//     useEffect(() => {
//         setCondition(!condition);
//     }, [])

//     useEffect(() => {
//         if (mapLoaded) {
//           // Store the mapLoaded status in localStorage
//           localStorage.setItem("mapLoaded", JSON.stringify(mapLoaded));
//         }
//       }, [mapLoaded]);

//     const initMap = () => {

//         const map = new window.google.maps.Map(document.getElementById("updateMap"), {
//             center: { lat: lat, lng: long },
//             zoom: 8,
//         });

//         const marker = new window.google.maps.Marker({
//             map: map,
//             position: { lat: lat, lng: long },
//             icon: {
//                 url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
//                 scaledSize: new window.google.maps.Size(40, 40),
//             },
//         });

//         map.addListener("click", (event) => {
//             const lat = event.latLng.lat();
//             const lng = event.latLng.lng();

//             localStorage.setItem("addLat", lat);
//             localStorage.setItem("addLong", lng);

//             const geocoder = new window.google.maps.Geocoder();
//             const location = new window.google.maps.LatLng(lat, lng);

//             geocoder.geocode({ location: location }, (results, status) => {
//                 if (status === "OK" && results[0]) {
//                     const addressComponents = results[0].address_components;
//                     const locationName = getAddressComponentValue(addressComponents, "locality") || getAddressComponentValue(addressComponents, "sublocality") || getAddressComponentValue(addressComponents, "administrative_area_level_1") || getAddressComponentValue(addressComponents, "country");
//                     localStorage.setItem("addLocationName", locationName);
//                     const state = getAddressComponentValue(addressComponents, "administrative_area_level_1");
//                     const country = getAddressComponentValue(addressComponents, "country");

//                     localStorage.setItem("addLocationName", locationName);
//                     localStorage.setItem("addState", state);
//                     localStorage.setItem("addCountry", country);

//                     console.log("Location Name:", locationName);
//                     console.log("State:", state);
//                     console.log("Country:", country);
//                 } else {
//                     console.log("Geocoder failed due to:", status);
//                 }
//             });

//             console.log("Latitude:", lat);
//             console.log("Longitude:", lng);

//             // Update marker position
//             marker.setPosition({ lat: lat, lng: lng });
//             map.panTo({ lat: lat, lng: lng });
//         });
//     };

//     const getAddressComponentValue = (addressComponents, type) => {
//         for (let i = 0; i < addressComponents.length; i++) {
//             const component = addressComponents[i];
//             const componentType = component.types[0];

//             if (componentType === type) {
//                 return component.long_name;
//             }
//         }
//         return null;
//     };


//     return (
//         <div>
//             <div id="updateMap" style={{ height: "430px" }}></div>
//         </div>
//     );
// };
