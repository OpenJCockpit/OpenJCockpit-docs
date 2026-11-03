# Feature Spec: Validate book input

## 1. Context

### Problem

`POST /api/books` accepts blank titles and authors.

### Goal

Invalid input is rejected with a clear `400` response.

### Non-goals

- No custom error format beyond Spring's default problem response.

## 3. Requirements

- **REQ-001**: `title` is required, not blank and at most 200 characters.
- **REQ-002**: `author` is required, not blank and at most 100 characters.
- **REQ-003**: Validation failures return status `400`, and no book is stored.

## 5. Acceptance criteria

- **AC-001**: Given a blank title, when the client posts a book, then the status is `400`. References: REQ-001, REQ-003
- **AC-002**: Given an author longer than 100 characters, when the client posts a book, then the status is `400`. References: REQ-002, REQ-003
- **AC-003**: Given a rejected request, when the client lists books, then the list does not contain it. References: REQ-003
- **AC-004**: Given valid input, then creation still returns `201`. References: REQ-001, REQ-002
- **AC-005**: Each validation rule has a test. References: REQ-001..003
