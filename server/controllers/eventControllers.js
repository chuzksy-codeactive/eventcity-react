import models from '../models';

const ADMIN_ACCTYPE = [1, 2];
/**
 * create event controller.
 *
 * @param {object} req - The request body
 * @param {object} res - The response body
 *
 * @returns {object} (data, message)
 */
const createEvent = (req, res) => {
  req.checkBody('name', 'event name is required').notEmpty();
  req.checkBody('purpose', 'purpose is required').notEmpty();
  req.checkBody('note', 'a short note is required').notEmpty();
  req.checkBody('eventDate', 'event date is required').notEmpty();
  req.checkBody('userId', 'user Id field must not be empty').notEmpty();
  req.checkBody('centerId', 'center Id field must not be empty').notEmpty();

  let errors = [];
  const event = {
    name: req.body.name,
    purpose: req.body.purpose,
    note: req.body.note,
    eventDate: req.body.eventDate,
    userId: req.body.userId,
    centerId: req.body.centerId
  };

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      res.status(400).json({
        message: errors
      });
    } else {
      return models.Event.findOne({
        where: {
          centerId: parseInt(req.body.centerId, 10),
          eventDate: req.body.eventDate
        }
      }).then((e) => {
        if (e) {
          return res.status(409).json({
            message: 'An event has been booked for this date.'
          });
        }
        return models.Event.create(event).then((newEvent) => {
          if (newEvent) {
            return res.status(201).json({
              message: 'Event is scheduled successfuly. Thanks',
              data: newEvent
            });
          }
        });
      });
    }
  });
};

/**
 * Controller to get event by Id
 *
 * @param {object} req - The request body
 * @param {object} res - The reponse body
 *
 * @returns {object} (message)
 */
const getEventsById = (req, res) => {
  const userId = req.user.dataValues.id;

  let events = null;
  if (ADMIN_ACCTYPE.indexOf(userId) > -1) {
    events = models.Event.findAll({
      include: [{
        model: models.Center
      }]

    });
  } else {
    events = models.Event.findAll({
      where: {
        userId
      }
    });
  }

  events.then((event) => {
    if (event.length > 0) {
      return res.status(200).json({
        data: event,
        code: 200
      });
    }
    return res.status(404).json({
      message: 'You are yet to book an event'
    });
  });
};


/**
 * Controller to get all event
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 *
 * @returns {object} (data)
 */
const getAllEvents = (req, res) => {
  const userId = req.user.dataValues.id;
  console.log(userId);

  return models.Event.findAll().then((event) => {
    if (event) {
      return res.status(200).json({
        data: event
      });
    }
    return res.status(404).json({
      message: 'No event is scheduled yet'
    });
  });
};


/**
 * Controller to get all event
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 *
 * @returns {object} (data)
 */

const getEventPerPage = (req, res) => {
  const limit = 5;
  let offset = 0;
  return models.Event.findAndCountAll().then((data) => {
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
    return models.Event.findAll({
      limit,
      offset,
      order: [
        ['id', 'ASC']
      ]
    }).then(events => res.status(200).json({
      data: events,
      count: data.count,
      pages
    }));
  });
};

/**
 * Controller to update event by Id
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 *
 * @returns {object} (message)
 */
const updateEventById = (req, res) => {
  req.checkBody('name', 'event name is required').notEmpty();
  req.checkBody('purpose', 'purpose is required').notEmpty();
  req.checkBody('note', 'a short note is required').notEmpty();
  req.checkBody('eventDate', 'event date is required').notEmpty();
  req.checkBody('userId', 'user id is required');
  req.checkBody('centerId', 'center id is required');
  req.checkParams('id', 'event id is required').notEmpty();

  let errors = [];
  const event = {
    name: req.body.name,
    purpose: req.body.purpose,
    note: req.body.note,
    eventDate: req.body.eventDate,
    userId: req.body.userId,
    centerId: req.body.centerId
  };

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      return res.status(400).json({
        message: errors
      });
    }
    return models.Event.findOne({
      where: {
        id: req.params.id,
      }
    }).then((fEvent) => {
      if (fEvent) {
        return models.Event.findOne({
          where: {
            centerId: parseInt(req.body.centerId, 10),
            eventDate: req.body.eventDate,
          }
        }).then((e) => {
          if (e && e.id != req.params.id) { // eslint-disable-line
            return res.status(400).json({
              message: 'Not available, please choose another date'
            });
          }
          return models.Event.update(event, {
            where: {
              id: req.params.id
            }
          }).then(upEvent => res.status(200).json({
            message: 'Event successfully updated'
          }));
        });
      }
      return res.status(404).json({
        message: 'Event not found'
      });
    });
  });
};

/**
 * Controller to delete event by Id
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 *
 * @returns {object} (message)
 */
const deleteEventById = (req, res) => {
  if (isNaN(req.params.id)) { // eslint-disable-line
    return res.status(400).json({
      message: 'Please supply the event ID'
    });
  }
  return models.Event.destroy({
    where: {
      id: req.params.id
    }
  }).then(event => res.status(200).json({
    message: 'event is successfully deleted'
  }));
};

const eventControllers = {
  createEvent,
  getAllEvents,
  getEventsById,
  updateEventById,
  deleteEventById,
  getEventPerPage
};

export default eventControllers;
