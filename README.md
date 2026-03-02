# Tool Logs Backend Service

Backend service built with Node.js, Express, SQLite (`sqlite3`), and Winston.

## Setup Steps

1. Ensure Node.js is installed (v18+ recommended).
2. Open terminal in the project directory.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Server runs on:

```text
http://localhost:3000
```

## Endpoint

`POST /api/tool-logs`

## Example Valid curl

```bash
curl -X POST http://localhost:3000/api/tool-logs \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user-123",
    "tool_name": "summarizer",
    "tool_input": "Summarize this long text",
    "tool_output": {
      "summary": "This is a short summary"
    },
    "status_code": 200,
    "timestamp": "2026-03-02T10:30:00Z"
  }'
```

## Example Invalid curl

```bash
curl -X POST http://localhost:3000/api/tool-logs \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user-123",
    "tool_name": "",
    "tool_input": "Summarize this long text",
    "tool_output": {
      "summary": ""
    },
    "status_code": 201,
    "timestamp": "invalid-date"
  }'
```

## Example Responses

Valid request (`201`):

```json
{
  "success": true,
  "message": "Tool call logged successfully",
  "data": {
    "id": 1
  }
}
```

Validation error (`400`):

```json
{
  "success": false,
  "error": "status_code must be exactly 200 or greater than or equal to 400"
}
```

Unexpected server error (`500`):

```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Logging

Winston logs to:

```text
app.log
```

It logs:
- successful inserts
- validation failures
- unexpected errors
