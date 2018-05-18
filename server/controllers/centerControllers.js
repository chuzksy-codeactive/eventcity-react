import models from '../models';

require('dotenv').config();


const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const vear = 'wear';


/**
 * createCenters - crates a new center
 *
 * @param {object} req
 * @param {object} res
 * @param {next} next
 *
 * @return {object} (message, center)
 */
const createCenters = (req, res, next) => {
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('capacity', 'capacity is required').notEmpty();
  req.checkBody('location', 'location is required').notEmpty();
  req.checkBody('facilities', 'facilities is required').notEmpty();
  req.checkBody('type', 'center type is required').notEmpty();
  req.sanitize('name').trim();
  req.sanitize('facilities').trim();

  let errors = [];
  const imagePath = req.file ? req.file.path : 'sample.jpg';
  cloudinary.uploader.upload(imagePath, (image) => {
    const imageName = image.original_filename;
    const imageUrl = image.secure_url;
    if (image.secure_url) {
      const center = {
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        facilities: req.body.facilities,
        type: req.body.type,
        price: req.body.price,
        imageName,
        imageUrl
      };
      req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
          errors = result.array().map(e => e.msg);
          res.status(400).json({
            message: errors
          });
        } else {
          models.Center.create(center).then((c) => {
            if (c) {
              return res.status(201).json({
                message: 'New center has been created succefully',
                data: c,
              });
            }
            return res.status(500).json({
              message: 'An internal server error'
            });
          });
        }
      });
    }
  });
};

/**
 * getAllCenters - Get all centers
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message)
 */
const getAllCenters = (req, res) => {
  models.Center.findAll().then((center) => {
    if (center) {
      return res.status(200).json({
        data: center
      });
    }
    return res.status(404).json({
      message: 'No center found in the database, Create a new center',
    });
  });
};

const deleteCenter = (req, res) => {
  req.checkParams('id', 'Center Id is required').notEmpty();
  let errors = [];
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      res.status(400).json({
        message: errors,
      });
    } else {
      models.Center.destroy({
        where: {
          id: parseInt(req.params.id, 10)
        }
      }).then((center) => {
        if (center) {
          return res.status(204).json({
            message: 'Center is successfully deleted'
          });
        }
        return res.status(404).json({
          message: `Center with id: ${req.params.id} is not found`
        });
      });
    }
  });
};

/**
 * updateCenter - Updates a particular center by centerId
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message, center)
 */
const updateCenter = (req, res) => {
  if (req.params.id === undefined) {
    return res.json({ message: 'Please provide a center Id' });
  }
  const imagePath = req.file ? req.file.path : 'sample.jpg';
  cloudinary.uploader.upload(imagePath, (image) => {
    const imageName = image.original_filename;
    const imageUrl = image.secure_url;
    if (image.secure_url) {
      const center = {
        id: req.params.id,
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        facilities: req.body.facilities,
        type: req.body.type,
        price: req.body.price,
        imageName,
        imageUrl
      };
      models.Center.update(center, { where: { id: center.id } }).then((c) => {
        if (c) {
          return res.status(200).json({
            message: `Center with ID ${req.params.id} is sucessfully updated`,
            data: c
          });
        }
        return res
          .status(404)
          .json({ message: `Center with Id: ${req.params.id} is not found`, code: 200 });
      });
    }
  });
};

/**
 * getCenterById - Gets a center by its Id
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message, center)
 */
const getCenterById = (req, res) => {
  req.checkParams('id', 'Id parameter is required').notEmpty();
  let errors = [];
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      return res.status(400).json({
        message: errors
      });
    }
    models.Center.findById(req.params.id).then((center) => {
      if (center) {
        return res.status(200).json({
          message: 'Center found',
          data: center
        });
      }
      return res.status(404).json({
        message: 'Center not found in the database'
      });
    });
  });
};

/**
 * getCentersEvents - Gets events for a particular center
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message, error, center)
 */
const getCentersEvents = (req, res) => {
  models.Center.findById(req.params.id, {
    include: [
      {
        model: models.Event,
        as: 'events'
      }
    ]
  }).then((centersEvents) => {
    if (centersEvents) {
      return res.status(200).json({
        message: 'Successfully found a center',
        error: false,
        data: centersEvents
      });
    }
    return res.status(404).json({
      message: 'No center found',
      error: true,
      data: null
    });
  });
};

const centersControllers = {
  createCenters,
  getAllCenters,
  deleteCenter,
  updateCenter,
  getCenterById,
  getCentersEvents
};

export default centersControllers;
