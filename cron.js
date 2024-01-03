
const cron = require('node-cron');
const { tutorModel } = require('./model/tutors.model'); 

// CRON job
cron.schedule('*/10 * * * * *', async () => { 
  try {
    const threeSecondsAgo = new Date(new Date() - 50000); // 3 seconds ago

    const onlineTutorsCount = await tutorModel.countDocuments({ date: { $gt: threeSecondsAgo } });

    console.log(`Online Tutors: ${onlineTutorsCount}`);

    // Add your logic here based on the onlineTutorsCount
    // For example, you could send notifications, update a status, etc.

  } catch (error) {
    console.error('Error in CRON job:', error);
  }
});
