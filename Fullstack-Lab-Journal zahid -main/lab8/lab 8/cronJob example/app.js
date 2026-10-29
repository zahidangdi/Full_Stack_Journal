// const cron= require ("node-cron");

// cron.schedule("30 9 * * *", function() {
//     console.log("Called at",new Date());
// });

 const cron= require ("node-cron");

 cron.schedule("*/2 * * * *", function() {
     console.log("Called at",new Date());
});
