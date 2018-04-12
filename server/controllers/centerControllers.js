import models from '../models';

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dcgwltbei',
  api_key: '944773238156875',
  api_secret: 'HFk6VkbAIgT12fMATap1n2_tF9U'
});

const vear = 'wear';

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
          res.status(200).json({
            errorMsg: errors
          });
        } else {
          models.Center.create(center).then((c) => {
            if (c) {
              return res.status(200).json({
                message: 'New center has been created succefully',
                data: c,
                'status code': 200
              });
            }
            return res.status(500).json({
              message: 'An internal server error',
              code: 500
            });
          });
        }
      });
    }
  });
};

const getAllCenters = (req, res) => {
  models.Center.findAll().then((center) => {
    if (center) {
      return res.status(200).json({
        data: center,
        code: 200
      });
    }
    return res.status(200).json({
      message: 'No center found in the database, Create a new center',
      code: 200,
      error: false
    });
  });
};

const deleteCenter = (req, res) => {
  req.checkParams('id', 'Center Id is required').notEmpty();
  let errors = [];
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      res.json({
        errorMsg: errors,
        code: 200
      });
    } else {
      models.Center.destroy({
        where: {
          id: parseInt(req.params.id, 10)
        }
      }).then((center) => {
        if (center) {
          return res.json({
            message: 'Center is successfully deleted',
            code: 204
          });
        }
        return res.json({
          message: `Center with id: ${req.params.id} is not found`,
          code: 200
        });
      });
    }
  });
};

const updateCenter = (req, res) => {
  if (req.params.id === undefined) {
    return res.status(200).json({ message: 'Please provide a center Id', code: 200 });
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
            data: c,
            code: 200
          });
        }
        return res
          .status(404)
          .json({ message: `Center with Id: ${req.params.id} is not found`, code: 200 });
      });
    }
  });
};

const getCenterById = (req, res) => {
  req.checkParams('id', 'Id parameter is required').notEmpty();
  let errors = [];
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      return res.status(200).json({
        errorMsg: errors,
        code: 200
      });
    }
    models.Center.findById(req.params.id).then((center) => {
      if (center) {
        return res.status(200).json({
          message: 'Center found',
          code: 200,
          data: center
        });
      }
      return res.status(200).json({
        message: 'Center not found in the database',
        code: 200
      });
    });
  });
};

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
        code: 200,
        error: false,
        data: centersEvents
      });
    }
    return res.status(200).json({
      message: 'No center found',
      code: 200,
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
