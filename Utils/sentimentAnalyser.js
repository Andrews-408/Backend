const sentiment = require("sentiment");
const Users = require('../models/userModel');

function calculateDaysSince(dateString) {
    // Convert the given date string to a Date object
    const givenDate = new Date(dateString);
  
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - givenDate.getTime();
  
    // Convert the time difference to days
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  
    return daysDiff;
  }

// a function that handles sentiment analysis of reviews
const calculateSentiment = (reviews) => {
    const analyzer = new sentiment();
    const sentimentResults = reviews.map((review) => analyzer.analyze(review));
    
    // Calculate the average sentiment score
    const totalScore = sentimentResults.reduce((total, result) => total + result.score, 0);
    const averageSentiment = totalScore / sentimentResults.length;

    // Convert the average sentiment score to a percentage
    const sentimentPercentage = Math.round((averageSentiment + 5) * 10);
    if (sentimentPercentage > 100) {
        return 100;
    } else if (sentimentPercentage < 0) {
        return 0;
    } else {
        return sentimentPercentage;
    }
    


}

const verifyOrganisations = async() => {
    const results = await Users.find({role: "Organisation"})

    results.forEach(async item=>{
        const platformUsageDuration = calculateDaysSince(item.createdAt)
        const reviews = item.reviews.length

        if(platformUsageDuration < 28) return
        if(reviews < 10) return

        const sentimentScore = calculateSentiment(item.reviews)
        if(sentimentScore < 75) return

        const organisation = await Users.updateOne({username: item.username}, {$set : {isVerified : true}} )
})
}



module.exports = {
    verifyOrganisations
}