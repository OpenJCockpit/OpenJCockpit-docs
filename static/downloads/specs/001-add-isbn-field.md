# Feature Spec: Add ISBN field to books

## 1. Context

### Problem

Books cannot be identified across systems because they carry no ISBN.

### Goal

Books store an optional ISBN, and clients can look a book up by ISBN.

### Non-goals

- No ISBN checksum validation (see spec 002).
- No persistence changes. The store stays in memory.

## 3. Requirements

- **REQ-001**: `Book` has an optional `isbn` field.
- **REQ-002**: `POST /api/books` accepts an optional `isbn`.
- **REQ-003**: `GET /api/books/isbn/{isbn}` returns the matching book, or `404` if none exists.

## 5. Acceptance criteria

- **AC-001**: Given a book created with an ISBN, when the client calls `GET /api/books/isbn/{isbn}`, then the book is returned with status `200`. References: REQ-001, REQ-003
- **AC-002**: Given no book has the ISBN, when the client calls `GET /api/books/isbn/{isbn}`, then the status is `404`. References: REQ-003
- **AC-003**: Given a book created without an ISBN, then creation succeeds and `isbn` is `null`. References: REQ-002
- **AC-004**: All existing tests still pass and new behaviour is covered by tests. References: REQ-001..003
