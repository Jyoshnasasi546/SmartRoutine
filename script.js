// ==========================================
// SMART ROUTINE - PHASE 5
// ==========================================


// ==========================================
// ROUTINE
// ==========================================

const routine = [

    {
        id: 1,
        time: "4:30 AM - 5:00 AM",
        startHour: 4,
        startMinute: 30,
        endHour: 5,
        endMinute: 0,
        task: "Prayer",
        category: "Personal",
        repeat: "daily"
    },

    {
        id: 2,
        time: "5:00 AM - 5:30 AM",
        startHour: 5,
        startMinute: 0,
        endHour: 5,
        endMinute: 30,
        task: "Exercise",
        category: "Health",
        repeat: "daily"
    },

    {
        id: 3,
        time: "5:30 AM - 6:30 AM",
        startHour: 5,
        startMinute: 30,
        endHour: 6,
        endMinute: 30,
        task: "Fresh Up",
        category: "Personal",
        repeat: "daily"
    },

    {
        id: 4,
        time: "6:30 AM - 7:30 AM",
        startHour: 6,
        startMinute: 30,
        endHour: 7,
        endMinute: 30,
        task: "Current Affairs",
        category: "SSC CGL",
        repeat: "daily"
    },

    {
        id: 5,
        time: "7:30 AM - 5:00 PM",
        startHour: 7,
        startMinute: 30,
        endHour: 17,
        endMinute: 0,
        task: "College",
        category: "Education",
        repeat: "weekdays"
    },

    {
        id: 6,
        time: "5:00 PM - 6:00 PM",
        startHour: 17,
        startMinute: 0,
        endHour: 18,
        endMinute: 0,
        task: "SSC CGL",
        category: "Competitive Exam",
        repeat: "daily"
    },

    {
        id: 7,
        time: "6:00 PM - 8:00 PM",
        startHour: 18,
        startMinute: 0,
        endHour: 20,
        endMinute: 0,
        task: "Dinner / Break",
        category: "Personal",
        repeat: "daily"
    },

    {
        id: 8,
        time: "8:00 PM - 10:30 PM",
        startHour: 20,
        startMinute: 0,
        endHour: 22,
        endMinute: 30,
        task: "DSA",
        category: "Placement Preparation",
        repeat: "daily"
    }

];
// ==========================================
// LOAD CUSTOM ROUTINE
// ==========================================

let userRoutine =
    JSON.parse(
        localStorage.getItem("userRoutine")
    ) || routine;


// ==========================================
// DATE KEY
// ==========================================

function getDateKey(date = new Date()) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// ==========================================
// TODAY STATUS
// ==========================================

const todayKey =
    getDateKey();

let taskStatus =
    JSON.parse(
        localStorage.getItem(
            "taskStatus-" + todayKey
        )
    ) || {};
// ==========================================
// TODAY'S RESCHEDULED TASKS
// ==========================================

let rescheduledTasks =
    JSON.parse(
        localStorage.getItem(
            "rescheduledTasks-" + todayKey
        )
    ) || {};

// ==========================================
// GET TODAY'S ROUTINE
// ==========================================

function getTodaysRoutine() {

    const day = new Date().getDay();

    return userRoutine.filter(task => {

        // Sunday = 0
        // Monday = 1
        // Tuesday = 2
        // Wednesday = 3
        // Thursday = 4
        // Friday = 5
        // Saturday = 6

        // If your task has no specific days,
        // show it every day.
        if (!task.days) {
            return true;
        }

        return task.days.includes(day);
    });
}


// ==========================================
// DATE
// ==========================================

function displayDate() {

    const today =
        new Date();

    const options = {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    };

    document.getElementById("date")
        .textContent =
        today.toLocaleDateString(
            "en-US",
            options
        );

}


// ==========================================
// GREETING
// ==========================================

function displayGreeting() {

    const hour =
        new Date().getHours();

    let greeting;

    if (hour < 12) {

        greeting =
            "Good Morning";

    }

    else if (hour < 17) {

        greeting =
            "Good Afternoon";

    }

    else {

        greeting =
            "Good Evening";

    }

    document.getElementById("greeting")
        .textContent =
        greeting + ", Jyoshna 👋";

}


// ==========================================
// TASK END TIME
// ==========================================

function getTaskEndTime(task) {

    const time =
        new Date();

    time.setHours(
        task.endHour,
        task.endMinute,
        0,
        0
    );

    return time;

}


// ==========================================
// CHECK MISSED TASK
// ==========================================

function isTaskMissed(task) {

    if (taskStatus[task.id] === true) {

        return false;

    }

    return new Date() >
        getTaskEndTime(task);

}


// ==========================================
// DISPLAY ROUTINE
// ==========================================

function displayRoutine() {

    const container =
        document.getElementById(
            "scheduleContainer"
        );

    container.innerHTML = "";

    const todaysRoutine =
        getTodaysRoutine();

    todaysRoutine.forEach(function(originalTask) {

        // Create a copy so the original routine
        // is never permanently changed
        const task = {
            ...originalTask
        };

        // Check whether this task was rescheduled today
        if (rescheduledTasks[task.id]) {

            task.time =
                rescheduledTasks[task.id].time;

            task.startHour =
                rescheduledTasks[task.id].startHour;

            task.startMinute =
                rescheduledTasks[task.id].startMinute;

            task.endHour =
                rescheduledTasks[task.id].endHour;

            task.endMinute =
                rescheduledTasks[task.id].endMinute;
        }


        const card =
            document.createElement("div");

        card.className =
            "task-card";


        const completed =
            taskStatus[task.id] === true;


        const missed =
            isTaskMissed(task);


        if (completed) {

            card.classList.add(
                "completed"
            );

        }

        else if (missed) {

            card.classList.add(
                "missed"
            );

        }


        let buttonText =
            "Complete";


        if (completed) {

            buttonText =
                "✓ Completed";

        }

        else if (missed) {

            buttonText =
                "⚠ Missed";

        }


        card.innerHTML = `

            <div class="task-left">

                <div class="time">
                    ${task.time}
                </div>

                <div>

                    <div class="task-name">
                        ${task.task}
                    </div>

                    <div class="category">
                        ${task.category}
                    </div>

                    ${
                        missed
                        ?
                        `
                        <div class="missed-label">
                            ⚠ Missed
                        </div>
                        `
                        :
                        ""
                    }

                </div>

            </div>


            <button
                class="complete-btn"
                onclick="toggleTask(${task.id})">

                ${buttonText}

            </button>

        `;


        container.appendChild(card);

    });


    updateStatistics();

    showRecoverySuggestion();

}
// ==========================================
// COMPLETE / UNCOMPLETE TASK
// ==========================================

function toggleTask(id) {

    if (taskStatus[id] === true) {

        taskStatus[id] = false;

    }

    else {

        taskStatus[id] = true;

    }

    saveToday();

    displayRoutine();

}


// ==========================================
// SAVE TODAY
// ==========================================

function saveToday() {

    localStorage.setItem(

        "taskStatus-" + todayKey,

        JSON.stringify(taskStatus)

    );

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics() {

    const tasks =
        getTodaysRoutine();

    let completed = 0;


    tasks.forEach(function(task) {

        if (
            taskStatus[task.id] === true
        ) {

            completed++;

        }

    });


    const total =
        tasks.length;

    let progress = 0;


    if (total > 0) {

        progress =
            Math.round(
                completed /
                total *
                100
            );

    }


    document.getElementById(
        "totalTasks"
    ).textContent = total;


    document.getElementById(
        "completedTasks"
    ).textContent = completed;


    document.getElementById(
        "progress"
    ).textContent =
        progress + "%";


    updateProductivityScore(
        completed,
        total
    );

    updateStreak();

}


// ==========================================
// PRODUCTIVITY SCORE
// ==========================================

function updateProductivityScore(
    completed,
    total
) {

    let score = 0;


    if (total > 0) {

        score =
            Math.round(
                completed /
                total *
                100
            );

    }


    document.getElementById(
        "productivityScore"
    ).textContent =
        score;

}


// ==========================================
// STREAK
// ==========================================

function updateStreak() {

    let streak = 0;

    const today =
        new Date();


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const date =
            new Date(today);

        date.setDate(
            today.getDate() - i
        );


        const key =
            getDateKey(date);


        const data =
            JSON.parse(
                localStorage.getItem(
                    "taskStatus-" + key
                )
            );


        if (!data) {

            break;

        }


        const tasks =
            getTasksForDate(date);


        const completed =
            tasks.filter(function(task) {

                return data[task.id] === true;

            }).length;


        if (
            tasks.length > 0 &&
            completed === tasks.length
        ) {

            streak++;

        }

        else {

            break;

        }

    }


    const streakElement =
        document.getElementById(
            "streak"
        );


    if (streakElement) {

        streakElement.textContent =
            streak + " Days";

    }

}


// ==========================================
// GET TASKS FOR DATE
// ==========================================

function getTasksForDate(date) {

    const day =
        date.getDay();

    return routine.filter(function(task) {

        if (task.repeat === "daily") {

            return true;

        }

        if (task.repeat === "weekdays") {

            return day >= 1 &&
                day <= 5;

        }

        return false;

    });

}


// ==========================================
// MISSED TASK
// ==========================================

function getMissedTask() {

    const tasks =
        getTodaysRoutine();


    for (
        let i = 0;
        i < tasks.length;
        i++
    ) {

        if (
            isTaskMissed(tasks[i])
        ) {

            return tasks[i];

        }

    }


    return null;

}


// ==========================================
// RECOVERY SUGGESTION
// ==========================================
function showRecoverySuggestion() {

    const box =
        document.getElementById(
            "recoveryBox"
        );


    const missed =
        getMissedTask();


    if (!missed) {

        box.classList.remove(
            "show"
        );

        box.innerHTML = "";

        return;

    }


    // Don't show recovery again
    // if this task was already rescheduled
    if (
        rescheduledTasks[missed.id]
    ) {

        box.classList.remove(
            "show"
        );

        box.innerHTML = "";

        return;

    }


    const now =
        new Date();


    const newTime =
        formatTime(
            now.getHours(),
            now.getMinutes()
        );


    box.classList.add(
        "show"
    );


    box.innerHTML = `

        <h3>
            ⚠️ Missed Task Detected
        </h3>


        <p>

            You missed your

            <strong>
                ${missed.task}
            </strong>

            session.

            You can recover this session
            starting from

            <strong>
                ${newTime}
            </strong>.

        </p>


        <button
            class="recovery-btn"
            onclick="
                rescheduleTask(${missed.id})
            ">

            🔄 Reschedule

        </button>


        <button
            class="skip-btn"
            onclick="skipRecovery()">

            Skip Today

        </button>

    `;

}
// ==========================================
// RESCHEDULE MISSED TASK
// ==========================================

function rescheduleTask(id) {

    const task =
        routine.find(function(item) {

            return item.id === id;

        });


    if (!task) {

        return;

    }


    const now =
        new Date();


    // Current time
    const startHour =
        now.getHours();

    const startMinute =
        now.getMinutes();


    // Recovery duration = 1 hour
    const endTime =
        new Date(now);

    endTime.setHours(
        endTime.getHours() + 1
    );


    const endHour =
        endTime.getHours();

    const endMinute =
        endTime.getMinutes();


    const startText =
        formatTime(
            startHour,
            startMinute
        );


    const endText =
        formatTime(
            endHour,
            endMinute
        );


    // Save today's rescheduled task
    rescheduledTasks[id] = {

        time:
            startText +
            " - " +
            endText +
            " 🔄 Recovery",

        startHour:
            startHour,

        startMinute:
            startMinute,

        endHour:
            endHour,

        endMinute:
            endMinute

    };


    // Save to LocalStorage
    localStorage.setItem(

        "rescheduledTasks-" + todayKey,

        JSON.stringify(
            rescheduledTasks
        )

    );


    // Hide recovery message
    const box =
        document.getElementById(
            "recoveryBox"
        );


    box.classList.remove(
        "show"
    );

    box.innerHTML = "";


    alert(
        task.task +
        " has been rescheduled to " +
        startText +
        " - " +
        endText
    );


    // Refresh schedule
    displayRoutine();

}
// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(
    hour,
    minute
) {

    const suffix =
        hour >= 12
        ? "PM"
        : "AM";


    let displayHour =
        hour % 12;


    if (displayHour === 0) {

        displayHour = 12;

    }


    return (
        displayHour +
        ":" +
        String(minute)
            .padStart(2, "0") +
        " " +
        suffix
    );

}


// ==========================================
// SKIP RECOVERY
// ==========================================

function skipRecovery() {

    const box =
        document.getElementById(
            "recoveryBox"
        );


    box.classList.remove(
        "show"
    );

    box.innerHTML = "";

}


// ==========================================
// WEEKLY OVERVIEW
// ==========================================

function displayWeeklyStats() {

    const container =
        document.getElementById(
            "weeklyStats"
        );


    container.innerHTML = "";


    const today =
        new Date();


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date(today);


        date.setDate(
            today.getDate() - i
        );


        const key =
            getDateKey(date);


        const data =
            JSON.parse(
                localStorage.getItem(
                    "taskStatus-" + key
                )
            );


        const tasks =
            getTasksForDate(date);


        let completed = 0;


        if (data) {

            tasks.forEach(function(task) {

                if (
                    data[task.id] === true
                ) {

                    completed++;

                }

            });

        }


        let score = 0;


        if (tasks.length > 0) {

            score =
                Math.round(
                    completed /
                    tasks.length *
                    100
                );

        }


        const box =
            document.createElement(
                "div"
            );


        box.className =
            "day-box";


        const day =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        box.innerHTML = `

            <div class="day-name">
                ${day}
            </div>

            <div class="day-score">
                ${score}%
            </div>

        `;


        container.appendChild(box);

    }

}


// ==========================================
// CURRENT STREAK FOR STATISTICS PAGE
// ==========================================

function getCurrentStreak() {

    let streak = 0;

    const today =
        new Date();


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const date =
            new Date(today);


        date.setDate(
            today.getDate() - i
        );


        const key =
            getDateKey(date);


        const data =
            JSON.parse(
                localStorage.getItem(
                    "taskStatus-" + key
                )
            );


        if (!data) {

            break;

        }


        const tasks =
            getTasksForDate(date);


        let completed = 0;


        tasks.forEach(function(task) {

            if (
                data[task.id] === true
            ) {

                completed++;

            }

        });


        if (
            tasks.length > 0 &&
            completed === tasks.length
        ) {

            streak++;

        }

        else {

            break;

        }

    }


    return streak;

}


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

const navButtons =
    document.querySelectorAll(
        ".nav-btn"
    );


navButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const page =
                button.getAttribute(
                    "data-page"
                );


            navButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            showPage(page);

        }
    );

});


// ==========================================
// SHOW PAGE
// ==========================================

function showPage(page) {

    if (
        page === "dashboard"
    ) {

        location.reload();

    }

    else if (
        page === "routine"
    ) {

        showRoutinePage();

    }

    else if (
        page === "calendar"
    ) {

        showCalendarPage();

    }

    else if (
        page === "statistics"
    ) {

        showStatisticsPage();

    }

    else if (
        page === "settings"
    ) {

        showSettingsPage();

    }

}


// ==========================================
// MY ROUTINE PAGE
// ==========================================

function showRoutinePage() {

    const main =
        document.getElementById(
            "mainContent"
        );


    main.innerHTML = `

        <header class="header">

            <div>

                <h2>
                    📋 My Routine
                </h2>

                <p>
                    Your automatically repeating routine
                </p>

            </div>


            <div class="today-badge">

                🔄 Recurring

            </div>

        </header>


        <section class="page-card">

            <h2>
                My Daily Routine
            </h2>


            <p class="page-description">

                You define your routine once.

                SmartRoutine automatically generates
                it every day.

            </p>


            <div class="routine-list">

                ${
                    routine.map(
                        function(task) {

                            return `

                                <div class="routine-item">

                                    <div>

                                        <strong>
                                            ${task.task}
                                        </strong>

                                        <p>
                                            ${task.category}
                                        </p>

                                    </div>


                                    <div class="routine-time">

                                        ${task.time}

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")
                }

            </div>

        </section>

    `;

}


// ==========================================
// CALENDAR PAGE
// ==========================================

function showCalendarPage() {

    const main =
        document.getElementById(
            "mainContent"
        );


    const today =
        new Date();


    let calendarHTML =
        "";


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date(today);


        date.setDate(
            today.getDate() - i
        );


        const key =
            getDateKey(date);


        const data =
            JSON.parse(
                localStorage.getItem(
                    "taskStatus-" + key
                )
            );


        const tasks =
            getTasksForDate(date);


        let completed = 0;


        if (data) {

            tasks.forEach(function(task) {

                if (
                    data[task.id] === true
                ) {

                    completed++;

                }

            });

        }


        let percentage = 0;


        if (
            tasks.length > 0
        ) {

            percentage =
                Math.round(
                    completed /
                    tasks.length *
                    100
                );

        }


        const day =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const dateNumber =
            date.getDate();


        calendarHTML += `

            <div class="calendar-day">

                <div class="calendar-day-name">

                    ${day}

                </div>


                <div class="calendar-date">

                    ${dateNumber}

                </div>


                <div class="calendar-progress">

                    ${percentage}%

                </div>


                <p>

                    ${completed}/${tasks.length}
                    tasks

                </p>

            </div>

        `;

    }


    main.innerHTML = `

        <header class="header">

            <div>

                <h2>
                    📅 Calendar
                </h2>

                <p>
                    Your weekly productivity
                </p>

            </div>

        </header>


        <section class="page-card">

            <h2>
                Last 7 Days
            </h2>


            <p class="page-description">

                Track how consistently you followed
                your routine.

            </p>


            <div class="calendar-grid">

                ${calendarHTML}

            </div>

        </section>

    `;

}


// ==========================================
// STATISTICS PAGE
// ==========================================

function showStatisticsPage() {

    const main =
        document.getElementById(
            "mainContent"
        );


    const tasks =
        getTodaysRoutine();


    let completed = 0;


    tasks.forEach(function(task) {

        if (
            taskStatus[task.id] === true
        ) {

            completed++;

        }

    });


    const total =
        tasks.length;


    let percentage = 0;


    if (
        total > 0
    ) {

        percentage =
            Math.round(
                completed /
                total *
                100
            );

    }


    main.innerHTML = `

        <header class="header">

            <div>

                <h2>
                    📊 Statistics
                </h2>

                <p>
                    Your productivity performance
                </p>

            </div>

        </header>


        <section class="stats">


            <div class="stat-card">

                <h3>
                    Total Tasks
                </h3>

                <p>
                    ${total}
                </p>

            </div>


            <div class="stat-card">

                <h3>
                    Completed
                </h3>

                <p>
                    ${completed}
                </p>

            </div>


            <div class="stat-card">

                <h3>
                    Completion Rate
                </h3>

                <p>
                    ${percentage}%
                </p>

            </div>


            <div class="stat-card">

                <h3>
                    Current Streak
                </h3>

                <p>
                    ${getCurrentStreak()} Days
                </p>

            </div>


        </section>


        <section class="page-card">

            <h2>
                Today's Performance
            </h2>


            <div class="big-score">

                ${percentage}%

            </div>


            <p class="page-description">

                ${
                    percentage === 100
                    ? "Excellent! You completed everything today. 🎉"
                    : percentage >= 50
                    ? "Good progress! Keep going. 💪"
                    : "You can improve your routine completion. 🌱"
                }

            </p>

        </section>

    `;

}


// ==========================================
// SETTINGS PAGE
// ==========================================
function showSettingsPage() {

    mainContent.innerHTML = `
        <header class="header">
            <div>
                <h2>⚙️ Settings</h2>
                <p>Customize your daily timetable</p>
            </div>
        </header>

        <section class="schedule-section">

            <div class="section-header">
                <div>
                    <h2>Customize Your Routine</h2>
                    <p>
                        Change task names and timings according
                        to your daily schedule.
                    </p>
                </div>
            </div>

            <div id="editRoutineContainer"></div>

            <div class="routine-buttons">

                <button id="addTaskBtn">
                    ➕ Add Task
                </button>

                <button id="saveRoutineBtn">
                    💾 Save Routine
                </button>

                <button id="resetRoutineBtn">
                    🔄 Reset Routine
                </button>

            </div>

        </section>
    `;

    displayEditableRoutine();

    document
        .getElementById("addTaskBtn")
        .addEventListener("click", addNewTask);

    document
        .getElementById("saveRoutineBtn")
        .addEventListener("click", saveCustomRoutine);

    document
        .getElementById("resetRoutineBtn")
        .addEventListener("click", resetRoutine);
}

// ==========================================
// START APPLICATION
// ==========================================

displayDate();

displayGreeting();

displayRoutine();

displayWeeklyStats();
function displayEditableRoutine() {

    const container =
        document.getElementById(
            "editRoutineContainer"
        );

    container.innerHTML = "";

    userRoutine.forEach((task, index) => {

        const taskBox =
            document.createElement("div");

        taskBox.className = "edit-task";

        taskBox.innerHTML = `

            <div class="edit-row">

                <input
                    type="text"
                    value="${task.title}"
                    class="task-name"
                    data-index="${index}"
                >

                <input
                    type="time"
                    value="${formatInputTime(
                        task.startHour,
                        task.startMinute
                    )}"
                    class="start-time"
                    data-index="${index}"
                >

                <input
                    type="time"
                    value="${formatInputTime(
                        task.endHour,
                        task.endMinute
                    )}"
                    class="end-time"
                    data-index="${index}"
                >

                <button
                    class="delete-task"
                    data-index="${index}"
                >
                    🗑️
                </button>

            </div>
        `;

        container.appendChild(taskBox);
    });

    document
        .querySelectorAll(".delete-task")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    userRoutine.splice(
                        index,
                        1
                    );

                    displayEditableRoutine();
                }
            );
        });
}
function formatInputTime(hour, minute) {

    return (
        String(hour).padStart(2, "0") +
        ":" +
        String(minute).padStart(2, "0")
    );
}
function addNewTask() {

    userRoutine.push({

        id: Date.now(),

        title: "New Task",

        startHour: 10,
        startMinute: 0,

        endHour: 11,
        endMinute: 0

    });

    displayEditableRoutine();
}
function saveCustomRoutine() {

    const names =
        document.querySelectorAll(
            ".task-name"
        );

    const startTimes =
        document.querySelectorAll(
            ".start-time"
        );

    const endTimes =
        document.querySelectorAll(
            ".end-time"
        );

    userRoutine.forEach((task, index) => {

        task.title =
            names[index].value;

        const start =
            startTimes[index].value.split(":");

        const end =
            endTimes[index].value.split(":");

        task.startHour =
            Number(start[0]);

        task.startMinute =
            Number(start[1]);

        task.endHour =
            Number(end[0]);

        task.endMinute =
            Number(end[1]);
    });

    localStorage.setItem(
        "userRoutine",
        JSON.stringify(userRoutine)
    );

    alert(
        "✅ Routine saved successfully!"
    );

    showPage("dashboard");
}
function resetRoutine() {

    const confirmReset =
        confirm(
            "Reset your routine to the original timetable?"
        );

    if (!confirmReset) {
        return;
    }

    userRoutine =
        JSON.parse(
            JSON.stringify(routine)
        );

    localStorage.removeItem(
        "userRoutine"
    );

    displayEditableRoutine();

    alert(
        "🔄 Routine reset successfully!"
    );
}