import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"; 

/**
* @description This function creates a new room based on the incoming request body
* and saves it to the database.
* 
* @param { object } req - The `req` input parameter is used to access the request
* data sent by the client. It contains information such as headers and body parameters.
* 
* @param { object } res - In this context ,the `res` input parameter is used to send
* a response to the client after the room is created .
* 
* @param { object } next - The `next` parameter is an optional parameter that allows
* the callback function to skip to the next handling of the route and prevent the
* execution of any further code after it. In other words.
*/
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

/**
* @description This function updates a single room document by ID using the
* `findByIdAndUpdate` method provided by Mongoose. It accepts a `req` object containing
* the updated room data and returns the updated room document.
* 
* @param { object } req - The `req` input parameter is an instance of the Express.js
* request object and provides access to the request metadata such as `params`,
* `query`, `body`, and others.
* 
* @param { object } res - The `res` parameter is an HTTP response object that allows
* you to send a response to the client after updating the room.
* 
* @param {  } next - The `next` input parameter is used to pass errors or exceptions
* caught during the execution of the `updateRoom` function to the calling code.
*/
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
/**
* @description This function deletes a room from the database.
* 
* @param { object } req - The `req` parameter is an instance of the Request object
* that contains information about the incoming HTTP request.
* 
* @param {  } res - The `res` input parameter is used to return a HTTP response to
* the client after the room has been deleted.
* 
* @param {  } next - In the function `deleteRoom`, the `next` input parameter is a
* callback function that is called if an error occurs while executing the code inside
* the `try` block.
*/
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

/**
* @description This function retrieves a room by its ID using the `Room.findById`
* method and sends the room data as JSON response to the client if the query is
* successful; otherwise it passes the error to the next handler.
* 
* @param { object } req - The `req` input parameter is used to pass information from
* the client request to the server function. It contains properties such as method
* (e.g., GET or POST), headers (such as Content-Type or Accept), and URL parameters
* (such as id).
* 
* @param {  } res - In the provided function `getRoom`, the `res` parameter is used
* to send a response to the client upon successful execution of the promise.
* 
* @param {  } next - The `next` parameter is a callback function that is called if
* an error occurs while executing the `getRoom` function.
*/
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
/**
* @description This function fetches all the rooms from the database and returns
* them to the client as a JSON object with a status code of 200.
* 
* @param { object } req - The `req` parameter is used to access the HTTP request
* object that triggered the function.
* 
* @param { object } res - The `res` parameter is used to send a JSON response to the
* client.
* 
* @param {  } next - The `next` input parameter is used to handle errors that occur
* within the function. It takes the error object as an argument and passes it on to
* the next handler function down the chain.
*/
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
