# 📚 Complete Self-Study Guide: Building a Professional Assessment & Quiz Engine in React

> **Created for Personal Study & Architectural Reference**  
> You can copy or extract this entire folder (`assessment_study_guide/`) to keep as a reference for interview prep, portfolio architecture, and deep understanding of modern React state management.

---

## Table of Contents
1. [Core Concept & Mental Model](#1-core-concept--mental-model)
2. [State Variables Breakdown](#2-state-variables-breakdown)
3. [The Pointer Algorithm (currentIndex)](#3-the-pointer-algorithm-currentindex)
4. [Next Question vs. Skip Question: The Validation Rule](#4-next-question-vs-skip-question-the-validation-rule)
5. [How "Mark as Preview" Works](#5-how-mark-as-preview-works)
6. [How the Question Lists & Palette Work](#6-how-the-question-lists--palette-work)
7. [Async Data Fetching & The Preparation Loader](#7-async-data-fetching--the-preparation-loader)
8. [Progress Persistence (LocalStorage)](#8-progress-persistence-localstorage)
9. [Visual State Transition Diagram](#9-visual-state-transition-diagram)
10. [Summary Checklist for Your Learning](#10-summary-checklist-for-your-learning)

---

## 1. Core Concept & Mental Model

In a complex web assessment (such as a psychometric test, online examination, or multi-step wizard), you are **never rendering all 20 questions at once**. Instead, you treat the questions as an array and maintain a **single pointer** (`currentIndex`) in state that dictates which question is currently visible.

Think of it like a deck of flashcards:
- You have an array of cards: `[Card 0, Card 1, Card 2, ... Card 19]`.
- Your thumb is on card `currentIndex = 3`.
- The user can flip forward (`currentIndex + 1`), flip backward (`currentIndex - 1`), or jump straight to card 14 by picking it from the table.
- A notebook records your choices (`answers = { 1: 'b', 2: 'a', ... }`).
- A yellow sticky note marks questions you skipped (`skippedIds = [2, 5]`).
- A purple bookmark flags questions you want to preview later (`markedIds = [3, 7]`).

---

## 2. State Variables Breakdown

Here are the state variables managed inside `Assessment.jsx`:

```javascript
// 1. Array of questions loaded asynchronously from backend/service
const [questions, setQuestions] = useState([])

// 2. Loading state for the preparation animation
const [isLoading, setIsLoading] = useState(false)

// 3. Whether the student has initiated the assessment
const [isStarted, setIsStarted] = useState(false)

// 4. Pointer to the currently visible question (0 to questions.length - 1)
const [currentIndex, setCurrentIndex] = useState(0)

// 5. Hash map of answers: { [questionId]: selectedOptionId }
const [answers, setAnswers] = useState({})

// 6. Array of question IDs that the user intentionally skipped
const [skippedIds, setSkippedIds] = useState([])

// 7. Array of question IDs marked for preview/review
const [markedIds, setMarkedIds] = useState([])

// 8. Whether the test has been submitted
const [isCompleted, setIsCompleted] = useState(false)

// 9. Active filter tab for the Question List Drawer ('all' | 'skipped' | 'marked' | 'answered')
const [activeFilter, setActiveFilter] = useState('all')
```

### Why use an Object (`{}`) for `answers` instead of an Array?
If you store answers in an array like `['a', 'b', 'c']`, deleting an item or handling non-linear jumps causes index mismatch bugs if questions re-order or IDs do not match indices.
With a key-value dictionary `{ [question.id]: optionId }`:
- Fast `O(1)` lookup: `answers[currentQuestion.id]`.
- Safe if question IDs are UUIDs or non-sequential numbers (`q101`, `q102`).
- Check if answered: `Boolean(answers[currentQuestion.id])`.

---

## 3. The Pointer Algorithm (`currentIndex`)

### Finding the Active Question
```javascript
// Derived value (never store this in state separately, calculate it on each render!)
const currentQuestion = questions[currentIndex] || questions[0]
```

### Previous Question (`handlePrev`)
```javascript
const handlePrev = () => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }
}
```
- **Boundary guard**: `if (currentIndex > 0)` prevents negative indices (`-1`).
- The **Previous** button is disabled when `currentIndex === 0`.

### Direct Jump to Any Question (`jumpToQuestion`)
```javascript
const jumpToQuestion = (targetIndex) => {
  if (targetIndex >= 0 && targetIndex < questions.length) {
    setCurrentIndex(targetIndex)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }
}
```
- Used whenever the user clicks any number in the **1, 2, 3, 4, 5... All Questions Palette** or clicks an item in the **Skipped List** or **Marked List**.

---

## 4. Next Question vs. Skip Question: The Validation Rule

The user requirement states:
> *"When the user clicks the next button but the question is not selected, the user cannot go to the next question. There will be an option called skip, so the user can skip a question, but without answering, the user cannot go to the next question, but the user can skip it."*

### Next Button Logic (`handleNext`)
```javascript
const hasAnsweredCurrent = Boolean(answers[currentQuestion?.id])

const handleNext = () => {
  // Hard guard: Do not advance if no option is selected
  if (!hasAnsweredCurrent) return

  // Self-healing: If this question was previously in skippedIds, remove it now!
  if (skippedIds.includes(currentQuestion.id)) {
    setSkippedIds((prev) => prev.filter((id) => id !== currentQuestion.id))
  }

  // Advance pointer or finish
  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  } else {
    // If on the last question, show completion or review
    handleCompleteAssessment()
  }
}
```
**UI Enforcement**:
```jsx
<Button
  onClick={handleNext}
  disabled={!hasAnsweredCurrent}
  className={!hasAnsweredCurrent ? 'opacity-40 cursor-not-allowed' : ''}
>
  Next Question →
</Button>
```

### Skip Button Logic (`handleSkip`)
```javascript
const handleSkip = () => {
  const currentId = currentQuestion?.id
  if (!currentId) return

  // 1. Add current question ID to skippedIds (if not already there)
  setSkippedIds((prev) => (prev.includes(currentId) ? prev : [...prev, currentId]))

  // 2. Advance to the next question if not at the end
  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  } else {
    // If on last question and skipping, prompt to review skipped items
    setActiveFilter('skipped')
  }
}
```

---

## 5. How "Mark as Preview" Works

The user requirement states:
> *"There will be another button on that page that will be like 'Mark as Preview', so the user can preview that question whenever they need to check if the question is correct or not. There will also be a 'Marked Question List' or 'Marked List'."*

### Toggle Mark as Preview (`handleToggleMark`)
```javascript
const isMarkedForPreview = markedIds.includes(currentQuestion?.id)

const handleToggleMark = () => {
  const currentId = currentQuestion?.id
  if (!currentId) return

  setMarkedIds((prev) =>
    prev.includes(currentId)
      ? prev.filter((id) => id !== currentId) // Unmark if already marked
      : [...prev, currentId]                  // Add to marked list
  )
}
```

---

## 6. How the Question Lists & Palette Work

The system provides 4 views accessible via tabs:
1. **All Questions (1, 2, 3, 4, 5... N)**: A grid palette of buttons with live status badges.
2. **Skipped Questions**: Filtered list showing only skipped items.
3. **Marked for Preview**: Filtered list showing only marked items.
4. **Answered Questions**: Filtered list showing answered items.

### Deriving Status for Any Question in the Palette:
```javascript
const getQuestionStatus = (question, index) => {
  const isCurrent = index === currentIndex
  const isAnswered = Boolean(answers[question.id])
  const isSkipped = skippedIds.includes(question.id)
  const isMarked = markedIds.includes(question.id)

  return { isCurrent, isAnswered, isSkipped, isMarked }
}
```

### Color Tokens for the Palette:
- **Current Question**: Blue ring (`ring-2 ring-blue-600 bg-blue-50 text-blue-700 font-black`)
- **Answered**: Emerald green badge (`bg-emerald-50 text-emerald-700 border-emerald-300`) with checkmark `✓`
- **Skipped**: Amber badge (`bg-amber-50 text-amber-700 border-amber-300`) with arrow `↷`
- **Marked for Preview**: Purple badge (`bg-purple-50 text-purple-800 border-purple-300`) with star `★`
- **Unvisited**: Neutral slate badge (`bg-slate-50 text-slate-600 border-slate-200`)

### Direct Navigation from Lists:
Clicking any question in any list immediately executes `jumpToQuestion(originalIndex)`.

### 6.1 Mobile Question Navigator UI/UX Standards
Mobile screens (< 1024px) demand distinct ergonomics because thumbs operate at the bottom and screen height is constrained:
1. **Horizontal Swipeable Question Strip (`overflow-x-auto`)**:
   - Placed directly above the question card so students can see and tap any question (1..N) without opening a modal.
   - **Auto-centering Ref**: Uses `scrollIntoView({ inline: 'center', behavior: 'smooth' })` whenever `currentIndex` changes so the active question chip stays centered automatically!
2. **Thumb-Friendly Bottom Action Dock**:
   - Fixed at the bottom of the screen (`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl`).
   - Contains `← Prev`, `↷ Skip`, and `Next →` buttons reachable by one hand.
   - Includes a mini header showing `Q(X) of (Y)` and a `🧭 Navigator` pull tab.
3. **Mobile Bottom Sheet Drawer Modal**:
   - Tapping the `🧭 Navigator` tab opens a full touch-optimized bottom sheet with drag indicator, tabs (`All`, `Skipped`, `Marked`, `Answered`), and 44px touch targets.
4. **Distraction-Free Mode**:
   - The general website social navigation bar and footer are hidden during `/assessment` so test controls never collide with site links.

---

## 7. Async Data Fetching & The Preparation Loader

When the student clicks **"Start Assessment"**, an asynchronous request is fired to `questionService.fetchAssessmentQuestions()`:

```javascript
const handleStartAssessment = async () => {
  setIsLoading(true)
  try {
    // 1. Async network call to backend API (simulated with realistic network delay)
    const fetchedQuestions = await questionService.fetchAssessmentQuestions()
    
    // 2. Store questions in state array
    setQuestions(fetchedQuestions)
    
    // 3. Mark session as started
    setIsStarted(true)
  } catch (error) {
    console.error('Failed to load questions:', error)
  } finally {
    setIsLoading(false)
  }
}
```

While `isLoading === true`, the screen renders:
> **"Your assessment page is getting ready, hang tight..."**
> *"Connecting to our question bank and setting up your secure, untimed evaluation session."*

---

## 8. Progress Persistence (LocalStorage)

To ensure the student does not lose their answers or skipped questions on accidental refresh:

```javascript
// Load saved session on initial mount
useEffect(() => {
  const raw = localStorage.getItem(`ccc_assessment_progress_${user?.id || 'guest'}`)
  if (raw) {
    try {
      const saved = JSON.parse(raw)
      if (saved.answers) setAnswers(saved.answers)
      if (saved.skippedIds) setSkippedIds(saved.skippedIds)
      if (saved.markedIds) setMarkedIds(saved.markedIds)
      if (saved.currentIndex !== undefined) setCurrentIndex(saved.currentIndex)
      if (saved.isStarted) setIsStarted(saved.isStarted)
    } catch {
      // ignore
    }
  }
}, [user?.id])
```

---

## 9. Visual State Transition Diagram

```
                 [ User clicks "Start Assessment" ]
                               │
                               ▼
                    ┌──────────────────────┐
                    │ isLoading = true     │  "Your assessment page is getting
                    │ (Preparation Loader) │   ready, hang tight..."
                    └──────────┬───────────┘
                               │ (questions fetched)
                               ▼
                    ┌──────────────────────┐
                    │ isStarted = true     │
                    │ currentIndex = 0     │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
  [ User Selects Option ]   [ User Clicks Skip ]   [ User Clicks Mark ]
        │                      │                      │
        ▼                      ▼                      ▼
  answers[id] = optId       skippedIds.push(id)    markedIds.toggle(id)
  Next Button ENABLES       Advance to next card   Star badge toggles
        │                      │                      │
        ▼                      ▼                      ▼
  [ User Clicks Next ]         │                      │
        │                      │                      │
  skippedIds.remove(id)        │                      │
  Advance to next card ────────┴──────────────────────┘
        │
        ▼ (currentIndex === questions.length - 1)
  [ Review / Submit Assessment ] ──► [ Assessment Completed ]
```

---

## 10. Summary Checklist for Your Learning

When you build your next quiz or assessment engine, remember these golden rules:
1. **Single Pointer**: Always drive the view using `currentIndex`. Do not store duplicate `currentQuestion` objects in state.
2. **Object for Answers**: Use `{ [questionId]: answerValue }` for fast lookups and ID independence.
3. **Derived Lists**: Derive filtered lists with `useMemo()` instead of creating separate state arrays that get out of sync.
4. **Disabled Next State**: Compute `const canGoNext = Boolean(answers[currentQuestion?.id])` and bind it directly to `disabled={!canGoNext}`.
5. **Auto-Clean Skipped Items**: If a student returns to a skipped question and answers it, automatically remove its ID from `skippedIds` when they proceed.
