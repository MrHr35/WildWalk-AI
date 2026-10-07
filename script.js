/* =====================================================
   WILDWALK AI
   Pure JavaScript
   TensorFlow.js + MobileNet
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let model = null;

let selectedImage = null;

let walkStarted = false;

let startTime = null;

let timerInterval = null;

let totalPoints =
    Number(localStorage.getItem("wildwalkPoints")) || 0;

let discoveries =
    JSON.parse(
        localStorage.getItem("wildwalkDiscoveries")
        || "[]"
    );

let completedChallenges = [];



/* =====================================================
   HTML ELEMENTS
===================================================== */

const startWalkBtn =
    document.getElementById("startWalkBtn");

const locationBtn =
    document.getElementById("locationBtn");

const locationStatus =
    document.getElementById("locationStatus");

const walkSection =
    document.getElementById("walkSection");

const timer =
    document.getElementById("timer");

const imageInput =
    document.getElementById("imageInput");

const preview =
    document.getElementById("preview");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const loading =
    document.getElementById("loading");

const resultName =
    document.getElementById("resultName");

const confidence =
    document.getElementById("confidence");

const resultDescription =
    document.getElementById("resultDescription");

const discoveriesContainer =
    document.getElementById("discoveries");

const totalPointsElement =
    document.getElementById("totalPoints");

const pointsElement =
    document.getElementById("points");

const discoveryCount =
    document.getElementById("discoveryCount");

const walkTime =
    document.getElementById("walkTime");

const gpsStatus =
    document.getElementById("gpsStatus");

const challengesContainer =
    document.getElementById("challenges");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const darkModeBtn =
    document.getElementById("darkModeBtn");



/* =====================================================
   CHALLENGES
===================================================== */

const challenges = [

    {
        id: "walk",

        icon: "🚶",

        title: "Walk for 20 minutes",

        description:
            "Spend at least 20 minutes outside."

    },

    {
        id: "green",

        icon: "🌿",

        title: "Find something green",

        description:
            "Look around and discover nature."

    },

    {
        id: "ai",

        icon: "🤖",

        title: "Make an AI discovery",

        description:
            "Use the AI field guide."

    }

];



/* =====================================================
   INITIALIZE
===================================================== */

function initialize() {

    updateScore();

    renderDiscoveries();

    renderChallenges();

}


initialize();



/* =====================================================
   START WALK
===================================================== */

startWalkBtn.addEventListener(
    "click",
    function () {

        walkStarted = true;

        startTime = Date.now();

        walkSection.classList.remove(
            "hidden"
        );

        startTimer();

        walkSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);



/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    clearInterval(timerInterval);


    timerInterval =
        setInterval(
            function () {

                if (!startTime)
                    return;


                const elapsed =
                    Date.now() - startTime;


                const seconds =
                    Math.floor(
                        elapsed / 1000
                    );


                const minutes =
                    Math.floor(
                        seconds / 60
                    );


                const remainingSeconds =
                    seconds % 60;


                timer.textContent =

                    String(minutes)
                        .padStart(2, "0")

                    +

                    ":"

                    +

                    String(remainingSeconds)
                        .padStart(2, "0");


                walkTime.textContent =
                    minutes + "m";


                /*
                    Complete walking challenge
                    after 20 minutes.
                */

                if (
                    minutes >= 20
                    &&
                    !completedChallenges
                        .includes("walk")
                ) {

                    completeChallenge(
                        "walk"
                    );

                }

            },
            1000
        );

}



/* =====================================================
   GEOLOCATION
===================================================== */

locationBtn.addEventListener(
    "click",
    function () {

        if (!navigator.geolocation) {

            locationStatus.textContent =
                "Geolocation is not supported.";

            return;

        }


        locationStatus.textContent =
            "Getting your location...";


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                locationStatus.textContent =
                    "📍 Location enabled: "
                    +
                    latitude.toFixed(4)
                    +
                    ", "
                    +
                    longitude.toFixed(4);


                gpsStatus.textContent =
                    "ON";

            },


            function (error) {

                locationStatus.textContent =
                    "Location permission denied.";

                gpsStatus.textContent =
                    "OFF";

                console.log(error);

            }

        );

    }
);



/* =====================================================
   IMAGE UPLOAD
===================================================== */

imageInput.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];


        if (!file)
            return;


        selectedImage =
            file;


        const imageURL =
            URL.createObjectURL(file);


        preview.src =
            imageURL;


        preview.classList.remove(
            "hidden"
        );


        analyzeBtn.classList.remove(
            "hidden"
        );


        resultName.textContent =
            "Ready to analyze";


        confidence.textContent =
            "--";


        resultDescription.textContent =
            "Click the AI button to analyze this image.";

    }
);



/* =====================================================
   LOAD AI MODEL
===================================================== */

async function loadModel() {

    if (model !== null) {

        return model;

    }


    resultName.textContent =
        "Loading AI...";


    try {

        model =
            await mobilenet.load();


        return model;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}



/* =====================================================
   ANALYZE IMAGE
===================================================== */

analyzeBtn.addEventListener(
    "click",
    async function () {

        if (!selectedImage) {

            alert(
                "Please select an image first."
            );

            return;

        }


        analyzeBtn.disabled =
            true;


        loading.classList.remove(
            "hidden"
        );


        resultName.textContent =
            "AI is thinking...";


        try {

            /*
                Load MobileNet
            */

            const ai =
                await loadModel();


            /*
                Run AI prediction
            */

            const predictions =
                await ai.classify(
                    preview,
                    5
                );


            console.log(
                "AI predictions:",
                predictions
            );


            if (
                !predictions ||
                predictions.length === 0
            ) {

                throw new Error(
                    "No prediction returned."
                );

            }


            /*
                Best prediction
            */

            const best =
                predictions[0];


            const name =
                best.className;


            const score =
                Math.round(
                    best.probability * 100
                );


            /*
                Show result
            */

            resultName.textContent =
                name;


            confidence.textContent =
                score +
                "% confidence";


            resultDescription.textContent =
                createDescription(name);


            /*
                Add discovery
            */

            addDiscovery(
                name,
                score
            );


            /*
                Complete AI challenge
            */

            completeChallenge(
                "ai"
            );

        }

        catch (error) {

            console.error(error);


            resultName.textContent =
                "AI Error";


            confidence.textContent =
                "--";


            resultDescription.textContent =
                "The AI model could not analyze this image. Check your internet connection and try again.";

        }


        finally {

            loading.classList.add(
                "hidden"
            );


            analyzeBtn.disabled =
                false;

        }

    }
);



/* =====================================================
   DESCRIPTION
===================================================== */

function createDescription(name) {

    const lower =
        name.toLowerCase();


    if (
        lower.includes("bird")
    ) {

        return (
            "The AI detected a bird-like object. " +
            "Try observing it from a safe distance."
        );

    }


    if (
        lower.includes("flower")
        ||
        lower.includes("plant")
    ) {

        return (
            "The AI detected a possible plant or flower."
        );

    }


    if (
        lower.includes("tree")
    ) {

        return (
            "The AI detected something resembling a tree."
        );

    }


    if (
        lower.includes("dog")
        ||
        lower.includes("cat")
    ) {

        return (
            "The AI detected an animal."
        );

    }


    return (
        "The AI identified this object using its visual model."
    );

}



/* =====================================================
   ADD DISCOVERY
===================================================== */

function addDiscovery(
    name,
    confidenceScore
) {

    const discovery = {

        name: name,

        confidence:
            confidenceScore,

        time:
            new Date().toLocaleString(),

        points: 25

    };


    discoveries.push(
        discovery
    );


    totalPoints += 25;


    /*
        Save data
    */

    localStorage.setItem(
        "wildwalkPoints",
        totalPoints
    );


    localStorage.setItem(
        "wildwalkDiscoveries",
        JSON.stringify(
            discoveries
        )
    );


    updateScore();

    renderDiscoveries();

}



/* =====================================================
   UPDATE SCORE
===================================================== */

function updateScore() {

    totalPointsElement.textContent =
        totalPoints;


    pointsElement.textContent =
        totalPoints;


    discoveryCount.textContent =
        discoveries.length;

}



/* =====================================================
   RENDER DISCOVERIES
===================================================== */

function renderDiscoveries() {

    if (
        discoveries.length === 0
    ) {

        discoveriesContainer.innerHTML = `

            <div class="empty">

                <div style="font-size:45px;">
                    🌱
                </div>

                <p>
                    Your discoveries will appear here.
                </p>

            </div>

        `;

        return;

    }


    discoveriesContainer.innerHTML = "";


    /*
        Newest first
    */

    const reversed =
        [...discoveries].reverse();


    reversed.forEach(
        function (discovery) {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "discovery";


            element.innerHTML = `

                <div>

                    <div class="discovery-name">

                        🌿
                        ${escapeHTML(
                            discovery.name
                        )}

                    </div>

                    <div class="discovery-date">

                        ${discovery.time}

                        •
                        ${discovery.confidence}%
                        confidence

                    </div>

                </div>


                <strong>

                    +${discovery.points}

                </strong>

            `;


            discoveriesContainer
                .appendChild(
                    element
                );

        }
    );

}



/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}



/* =====================================================
   RENDER CHALLENGES
===================================================== */

function renderChallenges() {

    challengesContainer.innerHTML =
        "";


    challenges.forEach(
        function (challenge) {

            const completed =
                completedChallenges
                    .includes(
                        challenge.id
                    );


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "challenge";


            if (completed) {

                element.classList.add(
                    "completed"
                );

            }


            element.innerHTML = `

                <div class="challenge-icon">

                    ${challenge.icon}

                </div>


                <h3>

                    ${challenge.title}

                </h3>


                <p>

                    ${challenge.description}

                </p>


                <div style="
                    margin-top:12px;
                    font-size:12px;
                    font-weight:bold;
                    color:${completed
                        ? "#2f6b45"
                        : "#707970"};
                ">

                    ${
                        completed
                        ? "✓ Completed"
                        : "Click to complete"
                    }

                </div>

            `;


            element.addEventListener(
                "click",
                function () {

                    if (
                        completedChallenges
                            .includes(
                                challenge.id
                            )
                    ) {

                        return;

                    }


                    completeChallenge(
                        challenge.id
                    );

                }
            );


            challengesContainer
                .appendChild(
                    element
                );

        }
    );


    updateProgress();

}



/* =====================================================
   COMPLETE CHALLENGE
===================================================== */

function completeChallenge(
    id
) {

    if (
        completedChallenges
            .includes(id)
    ) {

        return;

    }


    completedChallenges.push(
        id
    );


    totalPoints += 20;


    localStorage.setItem(
        "wildwalkPoints",
        totalPoints
    );


    updateScore();

    renderChallenges();

}



/* =====================================================
   PROGRESS
===================================================== */

function updateProgress() {

    const total =
        challenges.length;


    const completed =
        completedChallenges.length;


    const percentage =
        Math.round(
            completed /
            total *
            100
        );


    progressBar.style.width =
        percentage + "%";


    progressText.textContent =
        percentage + "%";

}



/* =====================================================
   DARK MODE
===================================================== */

darkModeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            darkModeBtn.textContent =
                "☀️";

        }

        else {

            darkModeBtn.textContent =
                "🌙";

        }

    }
);