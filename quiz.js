document.addEventListener('DOMContentLoaded', () => {

    // --- Quiz Data & Logic ---

    // Questions Configuration
    // Q1, Q2, Q4, Q5 (Q3 removed)
    const questions = [
        {
            id: 'q1',
            text: "What is your main goal right now?",
            options: [
                { text: "Money / Career", scores: { W: 2, V: 1, A: 1, R: 1, S: 1 } },
                { text: "Love / Relationship", scores: { H: 2, L: 2, S: 1, V: 1 } },
                { text: "Health", scores: { V: 2, S: 1, H: 1 } },
                { text: "Confidence / Exams", scores: { V: 2, L: 2, S: 1 } },
                { text: "Emotional Healing", scores: { H: 3, A: 1 } },
                { text: "Spiritual Growth", scores: { A: 2, V: 1, S: 1 } }
            ]
        },
        {
            id: 'q2',
            text: "Which activity feels most natural to you?",
            options: [
                { text: "Writing / Journaling", scores: { W: 3 } },
                { text: "Visualization (Imagining)", scores: { V: 3 } },
                { text: "Rituals (Actions)", scores: { R: 3 } },
                { text: "Night / Sleep methods", scores: { S: 3 } },
                { text: "Emotional Healing", scores: { H: 3 } },
                { text: "Quick mood shift", scores: { A: 3 } },
                { text: "Let app decide", scores: { A: 1, V: 1, S: 1 } }
            ]
        },
        {
            id: 'q4',
            text: "How much effort do you want to put in?",
            options: [
                { text: "Easy (5 mins)", scores: { S: 2, A: 2, H: 1 }, level: 'l1' },
                { text: "Medium (10-15 mins)", scores: { V: 2, W: 1 }, level: 'l2' },
                { text: "Hard (Dedicated practice)", scores: { W: 3, R: 2 }, level: 'l3' }
            ]
        },
        {
            id: 'q5',
            text: "What is currently blocking you?",
            options: [
                { text: "Not blocked (Just want more)", scores: { W: 1, V: 1, A: 1 } },
                { text: "Emotional pain / Past trauma", scores: { H: 3 } },
                { text: "Overthinking / Anxiety", scores: { S: 2, A: 2 } },
                { text: "Low energy / Motivation", scores: { S: 2, H: 2 } }
            ]
        }
    ];

    // Method Database
    const methods = {
        'W': {
            'l1': {
                name: 'Morning Affirmations',
                desc: 'A simple yet effective practice of reprogramming your subconscious with positive statements immediately upon waking.',
                benefits: ['Boosts morning mood', 'Rewires negative self-talk', 'Requires no equipment'],
                routine: ['Wake up and smile', 'Listen to or read 5 personalized affirmations', 'Feel the truth of them for 60 seconds']
            },
            'l2': {
                name: 'The 369 Method',
                desc: 'A famous Tesla-inspired scripting technique that uses divine geometry numbers to amplify your intent.',
                benefits: ['Keeps you focused all day', 'Structured practice', 'High repetition for impact'],
                routine: ['Morning: Write affirmation 3 times', 'Afternoon: Write affirmation 6 times', 'Night: Write affirmation 9 times']
            },
            'l3': {
                name: 'The 55×5 Method',
                desc: 'An intense writing practice to break through stubborn subconscious blocks by writing an affirmation 55 times for 5 days.',
                benefits: ['Breaks deep resistance', 'Creates laser focus', 'High commitment = High belief'],
                routine: ['Set aside 20 minutes', 'Write your exact affirmation 55 times', 'Do this for 5 consecutive days']
            }
        },
        'H': {
            'l1': {
                name: 'Ho’oponopono',
                desc: 'An ancient Hawaiian practice of reconciliation and forgiveness to cleanse "data" or memories replaying in the subconscious.',
                benefits: ['Heals relationships', 'Clears inner conflict', 'Brings immediate peace'],
                routine: ['Bring the situation to mind', 'Repeat: "I\'m sorry. Please forgive me. Thank you. I love you."', 'Feel the release of heavy energy']
            },
            'l2': {
                name: 'EFT Tapping',
                desc: 'Emotional Freedom Technique involves tapping on meridian points to release energy blocks and reduce emotional distress.',
                benefits: ['Reduces anxiety physically', 'Rewires the amygdala', 'Interactive and soothing'],
                routine: ['Identify the fear', 'Tap on the 9 meridian points', 'Repeat affirmation while tapping']
            },
            'l3': { name: 'EFT Tapping', desc: 'Emotional Freedom Technique involves tapping on meridian points to release energy blocks and reduce emotional distress.', benefits: ['Reduces anxiety physically', 'Rewires the amygdala', 'Interactive and soothing'], routine: ['Identify the fear', 'Tap on the 9 meridian points', 'Repeat affirmation while tapping'] }
        },
        'S': {
            'default': {
                name: 'The Pillow Method',
                desc: 'A gentle technique using sleep to program the subconscious when your brainwaves are in Theta state.',
                benefits: ['Zero effort required', 'Works while you sleep', 'Bypasses conscious resistance'],
                routine: ['Write your intention on paper', 'Place it under your pillow', 'Listen to a sleep visualization audio as you drift off']
            }
        },
        'V': {
            'default': {
                name: 'Multi-Sensory Visualization',
                desc: 'The classic athlete\'s secret. Creating a vivid mental movie of your goal as if it has already happened.',
                benefits: ['Trains the brain for success', 'Builds confidence', 'Clarifies your goals'],
                routine: ['Close eyes and relax', 'Visualize the end result in 1st person', 'Engage all 5 senses deeply for 5 minutes']
            }
        },
        'A': {
            'l1': {
                name: 'The Placemat Process',
                desc: 'An Abraham-Hicks process to surrender the "how" to the Universe while you focus on the "what".',
                benefits: ['Reduces overwhelm', 'Builds trust', 'Clearly defines responsibilities'],
                routine: ['Draw a line down a page', 'Left side: "My Job" (Write what you can do)', 'Right side: "Universe\'s Job" (Hand over the worries)']
            },
            'l2': {
                name: 'The Focus Wheel',
                desc: 'A tool to shift your vibration from negative to positive regarding a specific subject.',
                benefits: ['Shifts specific negativity', 'Builds momentum', 'Logical and emotional'],
                routine: ['Draw a large circle', 'Write goal in center', 'Write supporting beliefs around the edge until you feel better']
            },
            'l3': {
                name: 'SATS (State Akin To Sleep)',
                desc: 'A Neville Goddard technique performed in the drowsy state just before sleep to impress the wish fulfilled.',
                benefits: ['Deepest subconscious access', 'Very potent', 'Visual and feeling based'],
                routine: ['Get into bed, sleepy', 'Loop a short scene of success in your mind', 'Fall asleep in that feeling']
            }
        },
        'R': {
            'l1': {
                name: 'The Bay Leaf Method',
                desc: 'A simple ritual using nature to release intentions to the universe via fire (or water).',
                benefits: ['Tangible ritual', 'Symbolizes release', 'Good for letting go'],
                routine: ['Write wish on dry bay leaf', 'Visualize it coming true', 'Safely burn the leaf to release the energy']
            },
            'l2': {
                name: 'Two Cup Method',
                desc: 'A quantum jumping technique using two cups of water to shift from a current reality to a desired reality.',
                benefits: ['Visual representation of shift', 'Fun and ceremonial', 'Clear "Before" and "After"'],
                routine: ['Label Cup 1 "Current Reality", Cup 2 "Desired Reality"', 'Pour water from Cup 1 to Cup 2', 'Drink from Cup 2 to integrate']
            },
            'l3': { name: 'Two Cup Method', desc: 'A quantum jumping technique using two cups of water to shift from a current reality to a desired reality.', benefits: ['Visual representation of shift', 'Fun and ceremonial', 'Clear "Before" and "After"'], routine: ['Label Cup 1 "Current Reality", Cup 2 "Desired Reality"', 'Pour water from Cup 1 to Cup 2', 'Drink from Cup 2 to integrate'] }
        },
        'L': {
            'l1': {
                name: 'Mirror Work',
                desc: 'Staring into your own eyes to heal the relationship with yourself and boost self-worth.',
                benefits: ['Heals self-image', 'Increases confidence', 'Direct confrontation'],
                routine: ['Stand before a mirror', 'Look into your eyes', 'Say "I love you" and your affirmations aloud']
            },
            'l2': {
                name: 'Act As If',
                desc: 'Embodying the version of you who already has the goal in your daily life.',
                benefits: ['Changes behavior', 'Magnetizes opportunities', 'Fun roleplay'],
                routine: ['Identify your future self\'s traits', 'Make decisions as that person', 'Dress and act the part today']
            },
            'l3': { name: 'Act As If', desc: 'Embodying the version of you who already has the goal in your daily life.', benefits: ['Changes behavior', 'Magnetizes opportunities', 'Fun roleplay'], routine: ['Identify your future self\'s traits', 'Make decisions as that person', 'Dress and act the part today'] }
        }
    };


    // State
    let currentQuestionIndex = 0;
    let scores = { W: 0, H: 0, S: 0, V: 0, A: 0, R: 0, L: 0 };
    let selectedIntensity = 'l2'; // Default medium
    let answers = []; // To store selected option text for validtion or "Why" generation

    // DOM Elements
    const introScreen = document.getElementById('quiz-intro');
    const questionScreen = document.getElementById('quiz-question-container');
    const resultScreen = document.getElementById('quiz-result');

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const questionTracker = document.getElementById('question-tracker');

    // Event Listeners
    if (startBtn) { // Only run quiz logic if elements exist
        startBtn.addEventListener('click', startQuiz);
        nextBtn.addEventListener('click', nextQuestion);
        backBtn.addEventListener('click', prevQuestion);
    }

    function startQuiz() {
        introScreen.classList.remove('screen-active');
        introScreen.classList.add('screen-hidden');

        questionScreen.classList.remove('screen-hidden');
        questionScreen.classList.add('screen-active');

        loadQuestion(0);
    }

    function loadQuestion(index) {
        currentQuestionIndex = index;
        const q = questions[index];

        // Update UI
        questionText.innerText = q.text;
        questionTracker.innerText = `Question ${index + 1} of ${questions.length}`;
        progressBar.style.width = `${((index) / questions.length) * 100}%`;

        // Reset Buttons
        nextBtn.disabled = true;
        if (index === 0) {
            backBtn.style.visibility = 'hidden';
        } else {
            backBtn.style.visibility = 'visible';
        }

        // Render Options
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('div');
            btn.className = 'option-card';
            btn.innerHTML = `<span class="option-text">${opt.text}</span><i class="far fa-circle" style="color:var(--color-text-muted)"></i>`;

            // Check if previously answered
            if (answers[index] === idx) {
                btn.classList.add('selected');
                btn.querySelector('i').classList.remove('far', 'fa-circle');
                btn.querySelector('i').classList.add('fas', 'fa-check-circle');
                btn.querySelector('i').style.color = 'var(--color-primary)';
                nextBtn.disabled = false;
            }

            btn.addEventListener('click', () => selectOption(idx, index));
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(optionIndex, questionIndex) {
        // Save choice
        answers[questionIndex] = optionIndex;

        // Update UI selection
        const allOptions = optionsContainer.children;
        for (let i = 0; i < allOptions.length; i++) {
            allOptions[i].classList.remove('selected');
            allOptions[i].style.pointerEvents = 'none'; // Disable clicks
            const icon = allOptions[i].querySelector('i');
            icon.className = 'far fa-circle';
            icon.style.color = 'var(--color-text-muted)';
        }

        const selectedBtn = allOptions[optionIndex];
        selectedBtn.classList.add('selected');
        const selectedIcon = selectedBtn.querySelector('i');
        selectedIcon.className = 'fas fa-check-circle';
        selectedIcon.style.color = 'var(--color-primary)';

        nextBtn.disabled = false;

        // Auto-advance after 500ms
        setTimeout(() => {
            nextQuestion();
        }, 500);
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
            progressBar.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
        } else {
            calculateAndShowResults();
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    }

    function calculateAndShowResults() {
        // 1. Calculate Scores
        // Reset scores
        scores = { W: 0, H: 0, S: 0, V: 0, A: 0, R: 0, L: 0 };

        answers.forEach((optIdx, qIdx) => {
            const q = questions[qIdx];
            const selectedOpt = q.options[optIdx];

            // Add scores
            if (selectedOpt.scores) {
                for (let key in selectedOpt.scores) {
                    if (scores[key] !== undefined) {
                        scores[key] += selectedOpt.scores[key];
                    }
                }
            }

            // Capture Level if Q4
            if (q.id === 'q4' && selectedOpt.level) {
                selectedIntensity = selectedOpt.level;
            }
        });

        // 2. Find Primary Family
        let maxScore = -1;
        let primaryFamily = 'W'; // Default

        for (let family in scores) {
            if (scores[family] > maxScore) {
                maxScore = scores[family];
                primaryFamily = family;
            }
        }

        // 3. Select Method
        let methodData = null;
        const familyMethods = methods[primaryFamily];

        if (familyMethods['default']) {
            methodData = familyMethods['default'];
        } else {
            // Need to look up by level
            // Fallback: if l2 is selected but method only has l1, logic should probably handle it,
            // but our map seems complete for valid levels or has merged l2/l3.

            // Explicit checking for merged keys in our object above (like l2/l3 handling)
            // Actually, in the object I duplicated l3 for merged ones for simplicity.

            methodData = familyMethods[selectedIntensity];

            // Fallback if specific level undefined (safety)
            if (!methodData) {
                // Try l1 or first available
                const keys = Object.keys(familyMethods);
                methodData = familyMethods[keys[0]];
            }
        }

        // 4. Render Result
        document.getElementById('result-method-name').innerText = methodData.name;
        document.getElementById('result-description').innerText = methodData.desc;

        // Dynamic "Why"
        const goalText = questions[0].options[answers[0]].text.split('/')[0].trim();
        const styleText = questions[1].options[answers[1]].text.split('(')[0].trim();
        document.getElementById('result-why-text').innerText = `Your answers show you are focused on ${goalText} and resonate with ${styleText}. This method is perfect for you because it leverages your natural strengths.`;

        // Benefits
        const benefitsList = document.getElementById('result-benefits');
        benefitsList.innerHTML = '';
        methodData.benefits.forEach(b => {
            const li = document.createElement('li');
            li.innerText = b;
            benefitsList.appendChild(li);
        });

        // Routine
        const routineContainer = document.getElementById('result-routine');
        routineContainer.innerHTML = '';
        methodData.routine.forEach((step, idx) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step-item';
            stepDiv.innerHTML = `
                <div class="step-number">${idx + 1}</div>
                <div>${step}</div>
            `;
            routineContainer.appendChild(stepDiv);
        });

        // Switch Screens
        questionScreen.classList.remove('screen-active');
        questionScreen.classList.add('screen-hidden');

        resultScreen.classList.remove('screen-hidden');
        resultScreen.classList.add('screen-active');

        // Finish progress bar
        progressBar.style.width = '100%';
    }
});
