function submitCognitiveTest() {
    // Retrieve input values
    const userId = document.getElementById("userIdTest").value;
    const memoryTestScore = parseFloat(document.getElementById("memoryTestScore").value);
    const attentionTestScore = parseFloat(document.getElementById("attentionTestScore").value);
    const timeTaken = parseFloat(document.getElementById("timeTaken").value);
    
    // Define weights for memory and attention test scores
    const Wm = 0.5;  // Memory test weight
    const Wa = 0.5;  // Attention test weight

    // Calculate cognitive ability score (C)
    const C = ((Wm * memoryTestScore) + (Wa * attentionTestScore)) / timeTaken;

    // Determine the cognitive performance based on the score (C)
    let performance = "";
    if (C >= 0.75) {
        performance = "Above average and strong cognitive performance";
    } else if (C >= 0.5 && C < 0.75) {
        performance = "Normal and average cognitive performance";
    } else {
        performance = "Below average and slower or less accurate cognitive performance";
    }

    // Display the result
    document.getElementById("testResponse").innerHTML = `User ID: ${userId}<br>Cognitive Ability Score: ${C.toFixed(2)}<br>Performance: ${performance}`;
}

function assessRisk() {
    // Retrieve input values
    const userId = document.getElementById("userIdRisk").value;
    const initialScore = parseFloat(document.getElementById("initialScore").value);
    const currentScore = parseFloat(document.getElementById("currentScore").value);
    const timeBetweenTests = parseFloat(document.getElementById("timeBetweenTests").value);
    const lifestyleFactor = parseFloat(document.getElementById("lifestyle").value);
    const medicalHistory = parseFloat(document.getElementById("familyandmedicalHistory").value);
    
    // Define weights for lifestyle and medical history factors
    const w1 = 0.5;  // Weight for lifestyle factor
    const w2 = 0.5;  // Weight for medical history factor

    // Calculate cognitive decline rate (CDR)
    const CDR = Math.abs((initialScore - currentScore) / timeBetweenTests) + (w1 * lifestyleFactor) + (w2 * medicalHistory);

    // Determine the cognitive decline risk based on CDR
    let riskLevel = "";
    if (CDR >= 0 && CDR <= 3) {
        riskLevel = "No risk, stable cognitive health";
    } else if (CDR > 3 && CDR <= 6) {
        riskLevel = "Moderate risk, early signs of cognitive health deterioration";
    } else {
        riskLevel = "High risk, rapid cognitive health deterioration";
    }

    // Display the result
    document.getElementById("riskResponse").innerHTML = `User ID: ${userId}<br>Cognitive Decline Rate: ${CDR.toFixed(2)}<br>Risk Level: ${riskLevel}`;
}

function getBrainHealthScore() {
    // Retrieve input values
    const userId = document.getElementById("userIdScore").value;
    const Sm = parseFloat(document.getElementById("memoryScoreInput").value);
    const Tm = parseFloat(document.getElementById("timeMemoryInput").value);
    const Sa = parseFloat(document.getElementById("attentionScoreInput").value);
    const Ta = parseFloat(document.getElementById("timeAttentionInput").value);
    const S = parseFloat(document.getElementById("stressLevelInput").value);

    // Constants for weights
    const Wm = 0.5;
    const Wa = 0.3;
    const Ws = 0.2;

    // Calculate Brain Health Score (BHS)
    const BHS = (Wm * (Sm / Tm)) + (Wa * (Sa / Ta)) - (Ws * S);

    // Determine risk level and output message
    let resultMessage;
    if (BHS >= 75) {
        resultMessage = `No risk, strong cognitive function.`;
    } else if (BHS >= 50 && BHS < 75) {
        resultMessage = `Moderate risk, average cognitive function.`;
    } else {
        resultMessage = `High risk, significant cognitive decline.`;
    }

    // Display the result
    document.getElementById("scoreResponse").innerHTML = `User ID: ${userId} <br>Brain Health Score: ${BHS.toFixed(2)}<br>Brain Health: ${resultMessage}`;
}

function getMentalFatigueScore() {
    const userId = document.getElementById("userIdMFS").value;
    const totalTaskTime = parseFloat(document.getElementById("totalTaskTimeInput").value);
    const baselineCognitiveScore = parseFloat(document.getElementById("baselineCognitiveScoreInput").value);
    const sleepLevel = parseFloat(document.getElementById("sleepLevelInput").value);
    const hoursSinceRest = parseFloat(document.getElementById("hoursSinceRestInput").value);
    const currentCognitiveScore = parseFloat(document.getElementById("currentCognitiveScoreInput").value);

    // Calculate Mental Fatigue Score
    const MFS = ((totalTaskTime * baselineCognitiveScore) / (sleepLevel + hoursSinceRest)) - currentCognitiveScore;

    // Determine risk level based on MFS value
    let fatigueRisk;
    if (MFS <= -10) {
        fatigueRisk = "Normal, no significant fatigue";
    } else if (MFS >= -9 && MFS <= -5) {
        fatigueRisk = "Mild risk, early signs of cognitive strain";
    } else if (MFS >= -4 && MFS <= 0) {
        fatigueRisk = "Moderate risk, increased risk of cognitive decline";
    } else {
        fatigueRisk = "High risk, significant mental fatigue";
    }

    // Display result with line breaks
    document.getElementById("fatigueResponse").innerHTML = 
        `User ID: ${userId}<br>` +
        `Mental Fatigue Score: ${MFS.toFixed(2)}<br>` +
        `Fatigue Risk: ${fatigueRisk}`;
}

function analyzeSleepBrainHealthCorrelation() {
    // Get input values
    const userId = document.getElementById('userId').value; // User ID input
    const numObservations = parseInt(document.getElementById('numObservations').value);
    const sleepQualityInput = document.getElementById('sleepQualityInput').value;
    const testScoresInput = document.getElementById('testScoresInput').value;
    
    // Convert comma-separated strings into arrays of numbers
    const sleepQuality = sleepQualityInput.split(',').map(num => parseFloat(num.trim()));
    const testScores = testScoresInput.split(',').map(num => parseFloat(num.trim()));

    // Check if the number of observations matches the number of values provided
    if (sleepQuality.length !== numObservations || testScores.length !== numObservations) {
        alert('The number of values in Sleep Quality and Test Scores must match the number of observations.');
        return;
    }

    // Initialize sums
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    // Calculate sums needed for the formula
    for (let i = 0; i < numObservations; i++) {
        sumX += sleepQuality[i];
        sumY += testScores[i];
        sumXY += sleepQuality[i] * testScores[i];
        sumX2 += Math.pow(sleepQuality[i], 2);
        sumY2 += Math.pow(testScores[i], 2);
    }

    // Calculate the correlation coefficient (r)
    const numerator = numObservations * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
        (numObservations * sumX2 - Math.pow(sumX, 2)) * (numObservations * sumY2 - Math.pow(sumY, 2))
    );

    const r = numerator / denominator;

    // Display the result
    let resultMessage;
    if (r > 0 && r <= 1) {
        resultMessage = 'High sleep quality. Good cognitive performance and brain health';
    } else if (r >= -1 && r < 0) {
        resultMessage = 'Low quality sleep and low cognitive performance and brain health';
    } else {
        resultMessage = 'Correlation result is undefined or invalid.';
    }

    // Show results on the webpage with the user ID
    document.getElementById("correlationResponse").innerHTML = `User ID: ${userId} <br>Correlation coefficient (r): ${r.toFixed(2)}<br>${resultMessage}`;
}

function trackMoodAndCognitiveFunction() {
    // Get input values
    const userId = document.getElementById("userIdMCS").value;
    const dailyMoodScores = document.getElementById("dailyMoodScoresInput").value.split(",").map(Number);
    const moodScore = parseFloat(document.getElementById("moodScoreInput").value);
    const cognitiveScore = parseFloat(document.getElementById("cognitiveScoreInput").value);

    // Calculate the average mood score
    const totalMoodScores = dailyMoodScores.reduce((acc, score) => acc + score, 0);
    const averageMoodScore = totalMoodScores / dailyMoodScores.length;

    // Weights for mood and cognitive scores
    const W1 = 0.5; // Weight for mood score
    const W2 = 0.5; // Weight for cognitive score

    // Calculate MCS
    const MCS = (W1 * averageMoodScore) + (W2 * cognitiveScore);

    // Determine the result based on MCS
    let resultMessage = "";
    if (MCS >= 75) {
        resultMessage = "Strong mood and cognitive function";
    } else if (MCS >= 50 && MCS < 75) {
        resultMessage = "Average mood and cognitive function";
    } else {
        resultMessage = "Decline in mood and cognitive function";
    }

    // Display the results
    document.getElementById("mcsResponse").innerHTML = `
        User ID: ${userId} <br>
        Average Mood Score: ${averageMoodScore.toFixed(2)} <br>
        Cognitive Score: ${cognitiveScore} <br>
        MCS: ${MCS.toFixed(2)} <br>
        Mood and Cognitive Function Status: ${resultMessage}
    `;
}

function suggestBrainHealthIntervention() {
    // Get input values
    const userId = document.getElementById("userIdBHS").value;
    const cognitiveScore = document.getElementById("cognitiveScoreInput").value;
    const sleepQuality = document.getElementById("sleepQualityInput").value;
    const exercise = document.getElementById("exerciseInput").value;
    const diet = document.getElementById("dietInput").value;
    const mentalHealthScore = document.getElementById("mentalHealthScoreInput").value;

    // Number of inputs (n=5)
    const n = 5;

    // Calculate Brain Health Score (BHS)
    const BHS = (cognitiveScore + sleepQuality + diet + exercise + mentalHealthScore) / 5;

    // Determine Brain Health Status based on BHS
    let healthStatus = "";
    if (BHS >= 8) {
        healthStatus = "Good Brain Health. Continue current habits.";
    } else if (BHS >= 5 && BHS < 8) {
        healthStatus = "Average Brain Health. Increase intake of nutritious food and sleep quality.";
    } else if (BHS >= 3 && BHS < 5) {
        healthStatus = "Below Average Brain Health. Consult professionals, increase physical and brain training activities.";
    } else {
        healthStatus = "Poor Brain Health. Establish a support network for motivation and accountability.";
    }

    // Display the result
    document.getElementById("bhsResponse").innerHTML = `
        User ID: ${userId} <br>
        Brain Health Score (BHS): ${BHS.toFixed(2)} <br>
        Brain Health Status: ${healthStatus}
    `;
}

function checkBrainHealthDecline() {
    // Get input values
    const userId = document.getElementById("userIdAlert").value;
    const newScore = parseFloat(document.getElementById("newScoreInput").value);
    const oldScore = parseFloat(document.getElementById("oldScoreInput").value);

    // Calculate percentage change
    const percentageChange = ((newScore - oldScore) / oldScore) * 100;

    // Determine alert message based on percentage change
    let alertMessage;
    if (Math.abs(percentageChange) <= 5) {
        alertMessage = "No action required";
    } else if (Math.abs(percentageChange) > 5 && Math.abs(percentageChange) <= 10) {
        alertMessage = "Recommended monitoring and engagement in cognitive activities";
    } else if (Math.abs(percentageChange) > 10 && Math.abs(percentageChange) <= 20) {
        alertMessage = "Seek professional help and consider lifestyle changes";
    } else if (Math.abs(percentageChange) > 20) {
        alertMessage = "Intermediate intervention recommended";
    }

    // Display the result
    document.getElementById("alertResponse").innerHTML = `User ID: ${userId}<br>Percentage Change: ${percentageChange.toFixed(2)}%<br>Alert: ${alertMessage}`;
}

function compareBrainHealthForAgeGroup() {
    // Get input values
    const userId = document.getElementById("userIdComparison").value;
    const userBrainHealth = parseFloat(document.getElementById("brainHealthScoreInput").value);
    const userCognitiveTestResult = parseFloat(document.getElementById("cognitiveTestResultInput").value);
    const avgBrainHealth = parseFloat(document.getElementById("averageBrainHealthInput").value);
    const avgCognitiveScore = parseFloat(document.getElementById("averageCognitiveScoreInput").value);

    // Calculate Brain Health Comparison (BHC) and Cognitive Health Comparison (CHC)
    const BHC = ((userBrainHealth - avgBrainHealth) / avgBrainHealth) * 100;
    const CHC = ((userCognitiveTestResult - avgCognitiveScore) / avgCognitiveScore) * 100;

    // Combine BHC and CHC to determine the result
    const combinedComparison = (BHC + CHC) / 2;
    let resultMessage;
    if (combinedComparison > 0) {
        resultMessage = "Above average";
    } else if (combinedComparison < 0) {
        resultMessage = "Below average";
    } else {
        resultMessage = "Equal to average";
    }

    // Display the result
    document.getElementById("comparisonResponse").innerHTML = 
        `User ID: ${userId}<br>Brain Health Comparison: ${BHC.toFixed(2)}%<br>Cognitive Health Comparison: ${CHC.toFixed(2)}%<br>Overall Comparison: ${resultMessage}`;
}

function recommendNeuroplasticityEnhancement() {
    // Get input values
    const userId = document.getElementById("userIdNeuroplasticity").value;
    const cognitivePerformance = document.getElementById("cognitivePerformanceInput").value;
    const lifestyleHabits = document.getElementById("lifestyleHabitsInput").value;
    const stressLevel = document.getElementById("stressLevelInput").value;

    // Weightage constants
    const W1 = 0.4;
    const W2 = 0.4;
    const W3 = 0.2;

    // Calculate Neuroplasticity Score
    const N = (W1 * cognitivePerformance) + (W2 * lifestyleHabits) + (W3 * (10 - stressLevel));

    // Determine Neuroplasticity Level
    let recommendation;
    if (N >= 0 && N <= 3) {
        recommendation = "Low Neuroplasticity";
    } else if (N > 3 && N <= 6) {
        recommendation = "Moderate Neuroplasticity";
    } else if (N > 6 && N <= 10) {
        recommendation = "High Neuroplasticity";
    } else {
        recommendation = "Invalid input values. Please check your scores.";
    }

    // Display the result
    document.getElementById("neuroplasticityResponse").innerHTML = 
        `User ID: ${userId}<br>Neuroplasticity Score: ${N.toFixed(2)}<br>Recommendation: ${recommendation}`;
}
