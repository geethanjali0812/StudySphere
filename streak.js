// ======================================
// STUDYSPHERE - STREAK SYSTEM
// ======================================

const streakStorageKey = "studySphereStreak";


// ======================================
// GET TODAY'S DATE
// ======================================

function getTodayDate() {

    const today = new Date();

    return today.toISOString().split("T")[0];
}


// ======================================
// GET YESTERDAY'S DATE
// ======================================

function getYesterdayDate() {

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    return yesterday.toISOString().split("T")[0];
}


// ======================================
// GET SAVED STREAK
// ======================================

function getStreakData() {

    const savedData = localStorage.getItem(streakStorageKey);

    if (!savedData) {

        return {
            currentStreak: 0,
            lastActiveDate: null
        };
    }

    return JSON.parse(savedData);
}


// ======================================
// RECORD STUDY ACTIVITY
// ======================================

function recordStudyActivity() {

    const today = getTodayDate();

    const streakData = getStreakData();


    // Already recorded activity today
    if (streakData.lastActiveDate === today) {

        return streakData.currentStreak;
    }


    // Activity on consecutive day
    if (streakData.lastActiveDate === getYesterdayDate()) {

        streakData.currentStreak += 1;

    } else {

        // Streak was broken
        streakData.currentStreak = 1;
    }


    streakData.lastActiveDate = today;


    localStorage.setItem(
        streakStorageKey,
        JSON.stringify(streakData)
    );


    return streakData.currentStreak;
}


// ======================================
// GET CURRENT STREAK
// ======================================

function getCurrentStreak() {

    const streakData = getStreakData();

    if (!streakData.lastActiveDate) {

        return 0;
    }


    const today = getTodayDate();

    const yesterday = getYesterdayDate();


    // Still active today
    if (
        streakData.lastActiveDate === today ||
        streakData.lastActiveDate === yesterday
    ) {

        return streakData.currentStreak;
    }


    // More than one day missed
    return 0;
}