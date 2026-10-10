# Stack

Phone: React Native, Expo, SQLite, Files
PC: Electron/Tauri, SQLite, Files

```
Concern                 Choice
Desktop application	    Electron
UI	                    React + TypeScript
Backend/runtime	        Node.js + TypeScript
Database	            SQLite
SQLite access	        Drizzle ORM
Device communication	HTTP + WebSocket
Device discovery	    mDNS/Bonjour
Pairing	                QR code + cryptographic key
Validation	            Zod
Actual files	        Filesystem
Monorepo	            pnpm + Turborepo
```

## Important

- Don't transfer the SQLite database, sync Records.
- Sync protocol local-first, bidirectional sync system.
- Database stores metadata about file-to-transfer, the actual file lives in the filesystem. SQL entry is a pointer/description.

## Repo example

```
local-sync/
│
├── apps/
│   │
│   ├── mobile/
│   │   ├── app/            # Expo routes/screens
│   │   ├── components/     # RN components
│   │   ├── hooks/          # RN hooks
│   │   └── ...
│   │
│   └── desktop/
│       └── src/
│           ├── renderer/   # React UI
│           ├── main/       # Electron
│           └── ...
│
├── packages/
│   │
│   ├── sync-engine         # Synchronization logic
│   │
│   ├── protocol/           # Sync/Websocket protocol
│   │   └── Sync / WebSocket protocol
│   │
│   ├── database/           # DB + Migrations
│   │   ├── schemas
│   │   └── migrations
│   │
│   ├── types/              # Shared Typescript types
│   │   └── shared types
│   │
│   └── validation/         # Zod Schemas
│       └── Zod schemas
│
└── package.json
```

## Database

```sql
devices {
    id                      "id"
    name                    "Computer" | "Phone" < "Human readable name"
    type                    "mobile" | "desktop"
    public_key              "Useful for QR code pairing/authentication"
    created_at              "Date"
    updated_at              "Date"
}

files {
    id                      "id"
    filename                "File name"
    mime_type               "File type"
    size                    "File size"
    sha256                  "Fingerprint of content of the file, if file contains 5 MB of binary data you'd get `8f434346648f6b96...` If even one byte of the file changes, you'll get a completely different hash. Even if the file has different file names, if the sha256 are equal no file changes were made."
    created_at              "Date"
    updated_at              "Date"
    deleted_at              "Date"
}

file_locations{
    id                      "id"
    file_id                 "File id"
    device_id               "id of device file is on"
    created_at              "Date"
}

messages {
    id                      "id"
    content                 "Message content"
    created_at              "Date"
    updated_at              "Date"
    deleted_at              "Date"
}

sync_items {
    id                      "id"
    sync_session_id         "id of sync_sessions it belongs to"
    item_type               "message" | "file"
    item_id                 "id of files or messages"

    source_device_id        "From whom"
    destination_device_id   "To whom"

    status                  "pending" | "transferring" | "completed" | "failed"

    bytes_transferred       "Amount of bytes"
    total_bytes             "Total amount of bytes going to be transferred"
    started_at              "Date"
    completed_at            "Date"
    error                   "Optional error message"
}

sync_sessions {
    id                      "id"
    total_bytes             "Total bytes transfered"
    status                  "pending" | "transfering" | "completed" | "failed"
    started_at              "Date"
    completed_at            "Date"
    error                   "Optional error message"
}

sync_state {
    device_id               "id"
    last_sync_at            "Date"
    cursor                  "number" "The cursor becomes useful so we don't compare every single file/message every time you sync."
}
```

```
// Cursor example

Phone:

Last sync cursor = 100

New changes:

101 → image.jpg
102 → message
103 → document.pdf

Then PC can ask: "Give me everything after cursor 100."
```

## Monorepo Packages

The reason to do this as a monorepo is that your apps can depend on your local packages.

For example, suppose mobile needs your shared types:

```
pnpm --filter mobile add @local-sync/types@workspace:*
```

And your desktop app needs the sync engine:

```
pnpm --filter desktop add @local-sync/sync-engine@workspace:*
```

`workspace:*` tells pnpm:

"This dependency is another package inside this monorepo. Don't download it from npm."

## Monorepo start commands.

Run a command from a specific workspace using

```
pnpm --filter <package> <command>
```

Example

```
pnpm --filter mobile start
```

or

```
pnpm --filter desktop dev
```

Run a command that exists in all packages

```
pnpm -r typecheck
```

`-r` means recursive.

Or in root `package.json`

```json
{
    "name": "local-sync",
    "private": true,
    "scripts": {
        "mobile": "pnpm --filter mobile start",
        "desktop": "pnpm --filter desktop dev",
        "typecheck": "pnpm -r typecheck",
        "build": "pnpm -r build"
    }
}
```

then we can simply do

```
pnpm mobile
pnpm desktop
pnpm typecheck
pnpm build
```

from the project root.

## Monorepo development

```
pnpm --filter @local-sync/types dev
```

## Views

### Dashboard

---

```
Dashboard

-----------------   ------------------
|               |   |                |
|    Files      |   |    Messages    |
|    124        |   |    25          |
|    2.4 GB     |   |                |
|               |   |                |
-----------------   ------------------

--------------------------------------
|                                    |
|    Sync                            |
|    Last synced: Today, 12:42       |
|             [ Sync now ]           |
|                                    |
--------------------------------------
```

### Messages

```
Messages                    [ + ]

---------------------------------
| Check this tomorrow           |
| Today, 12:42                  |
---------------------------------

`Clicking message opens the message to edit / delete`

```

### Files

```
Files

4 column grid

-------------   -------------   -------------   -------------
| Pictures  |   | PDFs      |   | Work      |   | Personal  |
-------------   -------------   -------------   -------------

-------------------------------
| ...Files in current folder  |
-------------------------------

---

Files / Pictures

-------------   -------------
| Vacation  |   | 2026      |
-------------   -------------

---------------
| picture.jpg |
---------------

```

## Future features

- Dashboard, show amount of files that haven't been synced
