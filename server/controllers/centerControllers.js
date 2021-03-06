import models from '../models';

require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * createCenters - crates a new center
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message, center)
 */
const createCenters = (req, res) => {
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('capacity', 'capacity is required').notEmpty();
  req.checkBody('location', 'location is required').notEmpty();
  req.checkBody('facilities', 'facilities is required').notEmpty();
  req.checkBody('type', 'center type is required').notEmpty();
  req.checkBody('price', 'price type is required').notEmpty();
  req.sanitize('name').trim();
  req.sanitize('facilities').trim();

  let errors = [];
  const imagePath = req.file ? req.file.path : 'server/sample.jpg';
  return cloudinary.uploader.upload(imagePath, (image) => {
    const imageName = image.original_filename;
    const imageUrl = image.secure_url || req.body.imageUrl;
    if (imageUrl) {
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
          return res.status(400).json({
            message: errors
          });
        }
        return models.Center.findOne({
          where: {
            name: req.body.name
          }
        }).then((data) => {
          if (data) {
            return res.status(409).json({
              message: 'Center name already exist'
            });
          }
          return models.Center.create(center).then((c) => {
            if (c) {
              return res.status(201).json({
                message: 'New center has been created succefully',
                data: c,
              });
            }
          });
        });
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
 * @return {object} (centers)
 */
const getAllCenters = (req, res) => {
  models.Center.findAll({
    include: [{
      model: models.Event
    }]
  }).then((centers) => {
    if (centers) {
      return res.status(200).json({
        data: centers
      });
    }
    return res.status(404).json({
      message: 'No center found in the database, Create a new center',
    });
  });
};

/**
 * getCenterPerPage - implementation of pagination
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (centers)
 */

const getCenterPerPage = (req, res) => {
  const limit = 5;
  let offset = 0;
  models.Center.findAndCountAll().then((data) => {
    let {
      page
    } = req.params;
    const isNum = isNaN(req.params.page); //eslint-disable-line
    page = parseInt(page, 10);
    const pages = Math.ceil(data.count / limit);
    if (page <= 0 || !Number.isInteger(page) || isNum) {
      return res.status(400).json({
        message: 'Invalid page number, should start with 1'
      });
    }
    offset = limit * (page - 1);
    models.Center.findAll({
      limit,
      offset,
      order: [
        ['id', 'ASC']
      ]
    }).then((centers) => {
      res.status(200).json({
        data: centers,
        count: data.count,
        limit,
        pages
      });
    });
  });
};

const deleteCenter = (req, res) => models.Center.destroy({
  where: {
    id: parseInt(req.params.id, 10)
  }
}).then((center) => {
  if (center >= 1) {
    return models.Event.destroy({
      where: {
        centerId: parseInt(req.params.id, 10)
      }
    }).then((event) => {
      if (event >= 0) {
        return res.status(200).json({
          message: 'Center is successfully deleted'
        });
      }
    });
  }
  return res.status(404).json({
    message: `Center with id: ${req.params.id} is not found`
  });
});

/**
 * updateCenter - Updates a particular center by centerId
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message, center)
 */
const updateCenter = (req, res) => {
  if (req.params.id === undefined || isNaN(req.params.id)) { // eslint-disable-line
    return res.json({
      message: 'Please provide a center Id'
    });
  }
  const imagePath = req.file ? req.file.path : 'server/sample.jpg';
  return cloudinary.uploader.upload(imagePath, (image) => {
    const imageName = image.original_filename;
    const imageUrl = image.secure_url || req.body.imageUrl;
    if (imageUrl) {
      const center = {
        id: parseInt(req.params.id, 10),
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        facilities: req.body.facilities,
        type: req.body.type,
        price: req.body.price,
        imageName,
        imageUrl
      };
      return models.Center.update(center, {
        where: {
          id: center.id
        }
      }).then((c) => {
        if (c[0] === 1) {
          return res.status(201).json({
            message: 'Center is sucessfully updated',
            data: c
          });
        }
        return res
          .status(404)
          .json({
            message: 'Center is not found'
          });
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
const getCenterById = (req, res) => models.Center.findById(parseInt(req.params.id, 10)).then((center) => {
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

/**
 * getCentersEvents - Gets events for a particular center
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (message, error, center)
 */
const getCentersEvents = (req, res) => models.Center.findById(req.params.id, {
  include: [{
    model: models.Event
  }]
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

const centersControllers = {
  createCenters,
  getAllCenters,
  deleteCenter,
  updateCenter,
  getCenterById,
  getCentersEvents,
  getCenterPerPage
};

export default centersControllers;
