# Feature Spec: Search books by author

## 1. Context

### Problem

Clients must fetch every book and filter on their own side.

### Goal

`GET /api/books?author=...` returns only the books whose author matches, using a new method in the
repository and a change in the controller (two classes).

### Non-goals

- No pagination, no fuzzy matching.

## 3. Requirements

- **REQ-001**: `BookRepository` offers `findByAuthor(String author)`, matching case-insensitively.
- **REQ-002**: `GET /api/books` accepts an optional `author` query parameter and uses `findByAuthor` when present.
- **REQ-003**: Without the parameter, behaviour is unchanged.

## 5. Acceptance criteria

- **AC-001**: Given two books by different authors, when the client calls `GET /api/books?author=bloch`, then only the matching book is returned. References: REQ-001, REQ-002
- **AC-002**: Given no match, then the response is an empty list with status `200`. References: REQ-002
- **AC-003**: Given no `author` parameter, then all books are returned. References: REQ-003
- **AC-004**: Repository and controller changes are both covered by tests. References: REQ-001..003
