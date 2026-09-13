# 🏗️ Assessment Engine Architecture & Technical Specification

This document provides a technical deep-dive into the architectural patterns, data structures, and state management lifecycle used in the Psychometric Assessment Engine.

---

## 1. Data Contracts & State Schemas

### Question Object Schema
```typescript
interface AssessmentOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  text: string;
}

interface AssessmentQuestion {
  id: number | string;
  category: string; // e.g. "Logical Reasoning", "Decision Making"
  question: string;
  options: AssessmentOption[];
  isCustom?: boolean;
}
```

### Assessment Session State Schema (LocalStorage & React State)
```typescript
interface AssessmentProgress {
  currentIndex: number;          // 0 .. totalQuestions - 1
  answers: Record<string, string>; // { [questionId]: optionId }
  skippedIds: Array<number|string>;
  markedIds: Array<number|string>;
  isStarted: boolean;
  isCompleted: boolean;
  totalQuestions: number;
  updatedAt: string;             // ISO-8601 Timestamp
}
```

---

## 2. State Machine & Event Dispatchers

| Event | Trigger | Preconditions | State Transition |
| :--- | :--- | :--- | :--- |
| `START_ASSESSMENT` | User clicks "Start Assessment" | `!isStarted` | `isLoading = true` -> Fetch API -> `questions = data`, `isStarted = true`, `isLoading = false` |
| `SELECT_OPTION` | User clicks an option (A, B, C, D) | `isStarted && !isCompleted` | `answers[currentId] = optionId` |
| `CLICK_NEXT` | User clicks "Next Question" | `answers[currentId] !== undefined` | If `currentId in skippedIds`: remove it.<br>`currentIndex = min(currentIndex + 1, total - 1)` |
| `CLICK_SKIP` | User clicks "Skip Question" | `isStarted && !isCompleted` | Add `currentId` to `skippedIds`.<br>`currentIndex = min(currentIndex + 1, total - 1)` |
| `TOGGLE_MARK` | User clicks "Mark as Preview" | `isStarted && !isCompleted` | Toggle `currentId` presence in `markedIds`. |
| `CLICK_PREV` | User clicks "Previous" | `currentIndex > 0` | `currentIndex = currentIndex - 1` |
| `JUMP_TO_QUESTION` | User clicks palette number or list item | `targetIndex in [0, total-1]` | `currentIndex = targetIndex` |
| `SUBMIT_ASSESSMENT` | User clicks "Finish & Submit" | `isStarted && !isCompleted` | `isCompleted = true` |

---

## 3. UI/UX Principles Applied (CCC Standards)
1. **Zero Stress**: Untimed, friendly progress bar, reassuring wording.
2. **Deterministic Navigation**: Next is locked without an answer, but Skip provides intentional freedom.
3. **Information Recall**: "Mark as Preview" removes anxiety about making mistakes.
4. **Transparency**: The Question Palette (1..N) shows exact status at a glance without clutter.
