import models from '../models';

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
      res.status(200).json({
        errorMsg: errors,
        code: 200
      });
    } else {
      models.Event.findOne({
        where: {
          centerId: parseInt(req.body.centerId, 10),
          eventDate: req.body.eventDate
        }
      }).then((e) => {
        if (e) {
          return res.status(200).json({
            message: 'An event has been booked for this date.',
            code: 200
          });
        }
        models.Event.create(event).then((newEvent) => {
          if (newEvent) {
            return res.status(200).json({
              message: 'Event is scheduled successfuly. Thanks',
              code: 201,
              data: event
            });
          }
        });
      });
    }
  });
};

const getEventsById = (req, res) => {
  models.Event.findAll({ where: { userId: req.params.id } }).then((event) => {
    if (event.length > 0) {
      return res.status(200).json({
        data: event,
        code: 200
      });
    }
    return res.status(200).json({
      message: 'You are yet to book an event'
    });
  });
};

const getAllEvents = (req, res) => {
  models.Event.findAll().then((event) => {
    if (event) {
      return res.status(200).json({
        data: event,
        code: 200
      });
    }
    return res.status(200).json({
      message: 'No event is scheduled yet'
    });
  });
};

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
      return res.status(200).json({
        errorMsg: errors,
        code: 200
      });
    }
    models.Event.findById(req.params.id).then((fEvent) => {
      if (fEvent) {
        models.Event.findOne({
          where: {
            centerId: parseInt(req.body.centerId, 10),
            eventDate: req.body.eventDate
          }
        }).then((e) => {
          if (e) {
            return res.status(200).json({
              message: 'Event not available for this date, please choose another date',
              code: -1
            });
          }
          models.Event.update(event, {
            where: {
              id: req.params.id
            }
          }).then((upEvent) => {
            res.status(200).json({
              message: `Event with ID ${req.params.id} successfully updated`,
              code: 200
            });
          });
        });
      } else {
        return res.status(404).json({
          message: `Event with ID ${req.params.id} not found`,
          code: 404
        });
      }
    });
  });
};

const deleteEventById = (req, res) => {
  const eventId = req.params.id;
  if (eventId === null) {
    return res.status(200).json({
      message: 'Please supply the event ID',
      code: 200
    });
  }
  models.Event.destroy({
    where: {
      id: req.params.id
    }
  }).then(event =>
    res.status(200).json({
      message: 'Center is successfully deleted',
      code: 204
    }));
};

const eventControllers = {
  createEvent,
  getAllEvents,
  getEventsById,
  updateEventById,
  deleteEventById
};

export default eventControllers;
