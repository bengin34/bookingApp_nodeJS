import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js" 

/**
* @description This function creates a new hotel using the `new Hotel(req.body)`
* constructor and saves it to the database. If there's an error saving the hotel.
* 
* @param { object } req - The `req` parameter is an HTTP request object that contains
* information about the client's request. In this case specifically for Hotel requests
* the information include bodily attributes used for creating new hotels. This means
* any requests for posting data related to a hotel (Hotel name/rating and its details).
* 
* @param { object } res - In the given function `createHotel`, the `res` input
* parameter is used to send a HTTP response back to the client after saving the new
* hotel. It's an instance of the `Response` class that contains information about
* the HTTP request and response.
* 
* @param { object } next - The `next` parameter is used to pass errors to the next
* middleware function when there is an error occurring during the execution of the
* current function.
* 
* @returns { object } The output returned by this function is a JSON object representing
* the newly created hotel.
*/
export const createHotel = async (req,res,next) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}

/**
* @description This function updates a hotel document based on its ID and returns
* the updated hotel document if successful.
* 
* @param { object } req - In this function `updateHotel`, the `req` input parameter
* is used to retrieve the Hotel document from the database using the ID provided on
* the URL path (`/hotels/:id`).
* 
* @param { object } res - In the provided function `updateHotel`, the `res` input
* parameter is used to send a HTTP response to the client after the hotel details
* have been updated successfully.
* 
* @param {  } next - The `next` input parameter is a callback function that is called
* if an error occurs during the execution of the `updateHotel` function.
* 
* @returns { object } The output returned by this function is a JSON object representing
* the updated hotel document.
*/
export const updateHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}
/**
* @description This function deletes a hotel from the database using its ID provided
* via a URL parameter (`req.params.id`), and returns a success message to the client
* if the deletion was successful. If an error occurs during the delete operation (e.g.
* 
* @param { object } req - The `req` parameter is an object that contains information
* about the incoming HTTP request.
* 
* @param { object } res - In the given function `deleteHotel`, the `res` parameter
* is an HTTP response object that contains information about the current request and
* response. It is not used explicitly within the function body.
* 
* @param { object } next - In this function `next` is an input parameter that
* represents the error that occurred during the execution of the function.
* 
* @returns { any } The output returned by the function is "Hotel has been deleted".
*/
export const deleteHotel = async (req,res,next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}
/**
* @description This function retrieves a hotel document from the database using the
* `id` parameter passed to the endpoint and returns it as JSON response if successful
* or sends an error to the next middleware function if an exception occurs during
* the execution.
* 
* @param { object } req - The `req` input parameter is an instance of the HTTP request
* object. It contains information about the incoming request such as method (e.g.,
* GET), URL pathname and query parameters.
* 
* @param { object } res - The `res` parameter is a request response object that
* allows you to send data back to the client.
* 
* @param {  } next - The `next` parameter is an optional parameter that allows the
* function to pass control to the next function called at that level of nesting. If
* there are no more functions to call at that level of nesting (e.g., if `next` is
* `undefined`), then control will be passed to the calling function.
* 
* @returns { object } The output returned by this function is a JSON object representing
* the hotel with the specified ID.
*/
export const getHotel = async (req,res,next) => {

    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}
/**
* @description This function retrieves hotels from a database that meet certain price
* range criteria (min and max prices) and returns them to the client as JSON data.
* 
* @param {  } req - In the function `getHotels`, the `req` object provides information
* from the incoming HTTP request.
* 
* @param { object } res - The `res` input parameter is a response object that provides
* methods for sending a HTTP response.
* 
* @param {  } next - In the given function `getHotels`, the `next` input parameter
* is used to pass any errors or exceptions that occur during execution to the next
* middleware function or the error handling mechanism.
* 
* @returns { object } The function `getHotels` returns a promise of an array of Hotel
* objects that meet the query parameters passed via `req.query`.
*/
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
/**
* @description This function counts the documents of a hotel collection using the
* city as a filter. It takes three arguments: `req`, `res`, and `next`.
* 
* @param {  } req - The `req` input parameter is the HTTP request object and contains
* information about the incoming HTTP request.
* 
* @param {  } res - The `res` parameter is used to return a JSON response with the
* list of counts for each city.
* 
* @param {  } next - In this function `countByCity`, `next` is a callback function
* that is called with any error that occurs during the execution of the promise chain.
* 
* @returns { array } The output returned by this function is a JSON array of counts
* for each city.
*/
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

/**
* @description This function counts the documents of different types ("hotel",
* "apartment", "resort", "villa", and "cabin") using MongoDB's `countDocuments`
* method and returns a JSON object with the count of each type.
* 
* @param { object } req - The `req` input parameter is not used at all within the
* scope of the given function.
* 
* @param {  } res - The `res` parameter is an HTTP response object that allows you
* to send a JSON response to the client with the count of each type of accommodation.
* 
* @param { object } next - The `next` parameter is used to pass the error to the
* next middleware function if an error occurs during execution of the current function.
* 
* @returns { object } The output returned by this function is an array of objects
* containing the type and count of each accommodation type:
* 
* [
*   {type: "hotel", count: x},
*   {type: "apartments", count: y},
*   {type: "resorts", count: z},
*   {type: "villas", count: w},
*   {type: "cabins", count: t}
* ]
*/
export const countByType = async (req, res, next) => {
  
  try {
      const hotelCount = await Hotel.countDocuments({type:"hotel"})
      const apartmentCount = await Hotel.countDocuments({type:"apartment"})
      const resortCount = await Hotel.countDocuments({type:"resort"})
      const villaCount = await Hotel.countDocuments({type:"villa"})
      const cabinCount = await Hotel.countDocuments({type:"cabin"})
      
      res.status(200).json([
        {type: "hotel", count: hotelCount},
        {type: "apartments", count: apartmentCount},
        {type: "resorts", count: resortCount},
        {type: "villas", count: villaCount},
        {type: "cabins", count: cabinCount},
      ]);
      
    } catch (err) {
      next(err);
    }
  };

/**
* @description This function fetches all the rooms of a hotel with the given ID using
* the `Hotel` and `Room` models.
* 
* @param { object } req - The `req` parameter is an HTTP request object that contains
* information about the current request. In this function it's being used to extract
* the hotel ID from the URL parameters (i.e.
* 
* @param { object } res - The `res` parameter is a shortcut for the HTTP response
* object and is used to send a response back to the client.
* 
* @param { object } next - The `next` input parameter is an optional callback function
* that allows the function to skip to the next handler of a chain of middleware
* functions and pass the error to it if there's an error.
* 
* @returns { object } The output returned by this function is a list of `Room` objects
* that corresponds to the rooms available at the hotel with the given `id`.
*/
  export const getHotelRooms = async (req,res,next) => {
    try {
      const hotel = await Hotel.findById(req.params.id)
      const list = await  Promise.all(hotel.rooms.map(room => {
        return Room.findById(room)
      }))
      res.status(200).json(list)
    } catch (error) {
      next(error)
    }
  }
