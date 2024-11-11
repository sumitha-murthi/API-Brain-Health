from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/submitCognitiveTest', methods=['POST'])
def submit_cognitive_test():
    data = request.json
    user_id = data.get("userId")
    memory_test_score = data.get("memoryTestScore")
    attention_test_score = data.get("attentionTestScore")
    time_taken = data.get("timeTaken")

    Wm, Wa = 0.5, 0.5
    C = ((Wm * memory_test_score) + (Wa * attention_test_score)) / time_taken

    if C >= 0.75:
        performance = "Above average and strong cognitive performance"
    elif C >= 0.5:
        performance = "Normal and average cognitive performance"
    else:
        performance = "Below average and slower or less accurate cognitive performance"

    return jsonify(userId=user_id, cognitiveAbilityScore=round(C, 2), performance=performance)

@app.route('/assessRisk', methods=['POST'])
def assess_risk():
    data = request.json
    user_id = data.get("userId")
    initial_score = data.get("initialScore")
    current_score = data.get("currentScore")
    time_between_tests = data.get("timeBetweenTests")
    lifestyle_factor = data.get("lifestyle")
    medical_history = data.get("familyandmedicalHistory")

    w1, w2 = 0.5, 0.5
    CDR = abs((initial_score - current_score) / time_between_tests) + (w1 * lifestyle_factor) + (w2 * medical_history)

    if CDR <= 3:
        risk_level = "No risk, stable cognitive health"
    elif CDR <= 6:
        risk_level = "Moderate risk, early signs of cognitive health deterioration"
    else:
        risk_level = "High risk, rapid cognitive health deterioration"

    return jsonify(userId=user_id, cognitiveDeclineRate=round(CDR, 2), riskLevel=risk_level)

@app.route('/getBrainHealthScore', methods=['POST'])
def get_brain_health_score():
    data = request.json
    user_id = data.get("userId")
    Sm, Tm, Sa, Ta, S = data.get("memoryScore"), data.get("timeMemory"), data.get("attentionScore"), data.get("timeAttention"), data.get("stressLevel")

    Wm, Wa, Ws = 0.5, 0.3, 0.2
    BHS = (Wm * (Sm / Tm)) + (Wa * (Sa / Ta)) - (Ws * S)

    if BHS >= 75:
        result_message = "No risk, strong cognitive function."
    elif BHS >= 50:
        result_message = "Moderate risk, average cognitive function."
    else:
        result_message = "High risk, significant cognitive decline."

    return jsonify(userId=user_id, brainHealthScore=round(BHS, 2), result=result_message)

@app.route('/getMentalFatigueScore', methods=['POST'])
def get_mental_fatigue_score():
    data = request.json
    user_id = data.get("userId")
    total_task_time = data.get("totalTaskTime")
    baseline_cognitive_score = data.get("baselineCognitiveScore")
    sleep_level = data.get("sleepLevel")
    hours_since_rest = data.get("hoursSinceRest")
    current_cognitive_score = data.get("currentCognitiveScore")

    MFS = ((total_task_time * baseline_cognitive_score) / (sleep_level + hours_since_rest)) - current_cognitive_score

    if MFS <= -10:
        fatigue_risk = "Normal, no significant fatigue"
    elif -9 <= MFS <= -5:
        fatigue_risk = "Mild risk, early signs of cognitive strain"
    elif -4 <= MFS <= 0:
        fatigue_risk = "Moderate risk, increased risk of cognitive decline"
    else:
        fatigue_risk = "High risk, significant mental fatigue"

    return jsonify(userId=user_id, mentalFatigueScore=round(MFS, 2), fatigueRisk=fatigue_risk)

@app.route('/analyzeSleepBrainHealthCorrelation', methods=['POST'])
def analyze_sleep_brain_health_correlation():
    data = request.json
    user_id = data.get("userId")
    sleep_quality = data.get("sleepQuality")
    test_scores = data.get("testScores")
    
    if len(sleep_quality) != len(test_scores):
        return jsonify(error="The number of values in Sleep Quality and Test Scores must match.")

    num_observations = len(sleep_quality)
    sumX, sumY, sumXY, sumX2, sumY2 = 0, 0, 0, 0, 0

    for i in range(num_observations):
        sumX += sleep_quality[i]
        sumY += test_scores[i]
        sumXY += sleep_quality[i] * test_scores[i]
        sumX2 += sleep_quality[i] ** 2
        sumY2 += test_scores[i] ** 2

    numerator = num_observations * sumXY - sumX * sumY
    denominator = math.sqrt((num_observations * sumX2 - sumX ** 2) * (num_observations * sumY2 - sumY ** 2))
    r = numerator / denominator

    result_message = "High sleep quality. Good cognitive performance and brain health" if r > 0 else "Low quality sleep and low cognitive performance and brain health"

    return jsonify(userId=user_id, correlationCoefficient=round(r, 2), result=result_message)

@app.route('/trackMoodAndCognitiveFunction', methods=['POST'])
def track_mood_and_cognitive_function():
    data = request.json
    user_id = data.get("userId")
    daily_mood_scores = data.get("dailyMoodScores")
    cognitive_score = data.get("cognitiveScore")

    average_mood_score = sum(daily_mood_scores) / len(daily_mood_scores)
    W1, W2 = 0.5, 0.5
    MCS = (W1 * average_mood_score) + (W2 * cognitive_score)

    if MCS >= 75:
        result_message = "Strong mood and cognitive function"
    elif MCS >= 50:
        result_message = "Average mood and cognitive function"
    else:
        result_message = "Decline in mood and cognitive function"

    return jsonify(userId=user_id, moodScore=round(average_mood_score, 2), cognitiveScore=cognitive_score, MCS=round(MCS, 2), result=result_message)

@app.route('/suggestBrainHealthIntervention', methods=['POST'])
def suggest_brain_health_intervention():
    data = request.json
    user_id = data.get("userId")
    cognitive_score = data.get("cognitiveScore")
    sleep_quality = data.get("sleepQuality")
    exercise = data.get("exercise")
    diet = data.get("diet")
    mental_health_score = data.get("mentalHealthScore")

    BHS = (cognitive_score + sleep_quality + exercise + diet + mental_health_score) / 5

    if BHS >= 8:
        health_status = "Good Brain Health. Continue current habits."
    elif BHS >= 5:
        health_status = "Average Brain Health. Increase intake of nutritious food and sleep quality."
    elif BHS >= 3:
        health_status = "Below Average Brain Health. Consult professionals."
    else:
        health_status = "Poor Brain Health. Establish a support network."

    return jsonify(userId=user_id, brainHealthScore=round(BHS, 2), healthStatus=health_status)

@app.route('/checkBrainHealthDecline', methods=['POST'])
def check_brain_health_decline():
    data = request.json
    user_id = data.get("userId")
    new_score = data.get("newScore")
    old_score = data.get("oldScore")

    percentage_change = ((new_score - old_score) / old_score) * 100

    if abs(percentage_change) <= 5:
        alert_message = "No action required"
    elif abs(percentage_change) <= 10:
        alert_message = "Recommended monitoring and cognitive activities"
    elif abs(percentage_change) <= 20:
        alert_message = "Seek professional help"
    else:
        alert_message = "Intermediate intervention recommended"

    return jsonify(userId=user_id, percentageChange=round(percentage_change, 2), alert=alert_message)

@app.route('/compareBrainHealthForAgeGroup', methods=['POST'])
def compare_brain_health_for_age_group():
    data = request.json
    user_id = data.get("userId")
    user_brain_health = data.get("brainHealthScore")
    user_cognitive_test_result = data.get("cognitiveTestResult")
    avg_brain_health = data.get("averageBrainHealth")
    avg_cognitive_score = data.get("averageCognitiveScore")

    BHC = ((user_brain_health - avg_brain_health) / avg_brain_health) * 100
    CHC = ((user_cognitive_test_result - avg_cognitive_score) / avg_cognitive_score) * 100
    combined_comparison = (BHC + CHC) / 2

    result_message = "Above average" if combined_comparison > 0 else "Below average" if combined_comparison < 0 else "Average"

    return jsonify(userId=user_id, brainHealthComparison=round(BHC, 2), cognitiveHealthComparison=round(CHC, 2), combinedComparison=round(combined_comparison, 2), result=result_message)

@app.route('/recommendNeuroplasticityEnhancement', methods=['POST'])
def recommend_neuroplasticity_enhancement():
    data = request.json
    user_id = data.get("userId")
    cognitive_function_score = data.get("cognitiveFunctionScore")
    lifestyle_factor = data.get("lifestyleFactor")
    mental_exercise_score = data.get("mentalExerciseScore")

    Wc, Wl, Wm = 0.4, 0.3, 0.3
    NS = (Wc * cognitive_function_score) + (Wl * lifestyle_factor) + (Wm * mental_exercise_score)

    recommendation = "No enhancement needed." if NS >= 75 else "Consider cognitive exercises." if NS >= 50 else "Engage in regular mental training."

    return jsonify(userId=user_id, neuroplasticityScore=round(NS, 2), recommendation=recommendation)

if __name__ == '__main__':
    app.run(debug=True)
