const alarmSchema = require("../models/alarm.schema");
const router = require("express").Router();
const schedule = require("node-schedule");

module.exports = (io) => {
  router.get("/getAlarmsByUserName/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const alarms = await alarmSchema.find({ userInfo: id });
      alarms.forEach(alarm => {
        schedule.scheduleJob(alarm.time, () => {
            console.log('Alarm triggered at', new Date());
        });
    });
      res.status(200).send(alarms);
    } catch (err) {
      console.log("Some error finding alarms by username");
    }
  });

  router.post("/setAlarm", async (req, res) => {
    const { time, userInfo } = req.body;

    const alarmFunction = () => {
      console.log("Wake up!!!!!");    
      io.emit(userInfo, "Alarm Ringing!" ); 
    };

    if (time < Date.now()) { 
      res.status(400).send("Invalid time");
      return;
    }

    const alarm = new alarmSchema({ time, userInfo });
    await alarm.save();
    console.log("Alarm set for ", time);

    schedule.scheduleJob(time, alarmFunction);

    res.status(200).send({
      message: "Alarm successfully set",
      alarm: alarm,
    });
  });

  return router;
};
