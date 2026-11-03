
import os.path
import json
import base64
import sqlite3

conn_f = sqlite3.connect("free.db")
cur_f = conn_f.cursor()
conn_p = sqlite3.connect("paid.db")
cur_p = conn_p.cursor()


from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def authenticate():
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file(
            "token.json", SCOPES
        )

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open("token.json", "w") as token:
            token.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)

def updateDB(m):
    for part in m["payload"]["parts"]:
        if part["mimeType"] == "text/plain":
            data = part["body"]["data"]
            body = base64.urlsafe_b64decode(data).decode("utf-8")
            mail_data = json.loads(body)

            if mail_data["type"] == "free":
                update_free(mail_data)
            else:
                update_paid(mail_data)

def update_free(data):
    cur_f.execute("""
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
    """)
    tables = [row[0] for row in cur_f.fetchall()]

    base_name = data["email"].split("@")[0]
    table_name = base_name

    i = 2
    while table_name in tables:
        cur_f.execute(f'SELECT email FROM "{table_name}" LIMIT 1')
        email = cur_f.fetchone()[0]

        if email == data["email"]:
            break

        table_name = f"{base_name}_{i}"
        i += 1

    cur_f.execute(f"""
        CREATE TABLE IF NOT EXISTS "{table_name}" (
            request_id TEXT PRIMARY KEY,
            email TEXT,
            request_text TEXT
        )
    """)

    cur_f.execute(f"""
        INSERT OR IGNORE INTO "{table_name}" (request_id, email, request_text)
        VALUES (?, ?, ?)
    """, (
        data["request_id"],
        data["email"],
        data["request_text"]
    ))

    conn_f.commit()

def update_paid(data):
    cur_p.execute("""
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
    """)
    tables = [row[0] for row in cur_p.fetchall()]

    base_name = data["email"].split("@")[0]
    table_name = base_name

    i = 2
    while table_name in tables:
        cur_p.execute(f'SELECT email FROM "{table_name}" LIMIT 1')
        email = cur_p.fetchone()[0]

        if email == data["email"]:
            break

        table_name = f"{base_name}_{i}"
        i += 1

    cur_p.execute(f"""
        CREATE TABLE IF NOT EXISTS "{table_name}" (
            request_id TEXT PRIMARY KEY,
            email TEXT,
            destination TEXT,
            details TEXT,
            phone_research TEXT,
            recommendations TEXT,
            transportation TEXT,
            custom TEXT,
            budget TEXT,
            rush TEXT
        )
    """)

    cur_p.execute(f"""
        INSERT OR IGNORE INTO "{table_name}" (
            request_id,
            email,
            destination,
            details,
            phone_research,
            recommendations,
            transportation,
            custom,
            budget,
            rush
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["request_id"],
        data["email"],
        data["destination"],
        data["details"],
        data["phone_research"][1] if data["phone_research"][0] == "Y" else None,
        data["recommendations"][1] if data["recommendations"][0] == "Y" else None,
        data["transportation"][1] if data["transportation"][0] == "Y" else None,
        data["custom"][1] if data["custom"][0] == "Y" else None,
        data["budget"],
        data["rush"]
    ))

    conn_p.commit()
            
def updateTimeStamp(m, state):
    timestamp = int(m["internalDate"])

    if timestamp == state["timestamp"]:
        mail_id = state["mail_id"]
        mail_id.append(m["id"])
    else:
        mail_id = [m["id"]]

    s = {
        "timestamp": timestamp,
        "mail_id": mail_id
    }

    with open("state.tmp", "w") as f:
        json.dump(s, f, indent=4)

    os.replace("state.tmp", "state.json")
    state.update(s)
def main():
    service = authenticate()

    with open("state.json", "r") as f:
        state = json.load(f)

    last_timestamp = state["timestamp"]

    page_token = None
    messages = []

    while True:
        result = service.users().messages().list(
            userId="me",
            q="subject:Ask Japan json after:2026/10/31",
            maxResults=100,
            pageToken=page_token
        ).execute()

        messages.extend(result.get("messages", []))

        page_token = result.get("nextPageToken")

        if page_token is None:
            break

    detailed_messages = []

    for m in messages:
        message = service.users().messages().get(
            userId="me",
            id=m["id"],
            format="full"
        ).execute()

        detailed_messages.append(message)

    detailed_messages.sort(
        key=lambda m: int(m["internalDate"])
    )

    messages = [
        m for m in detailed_messages
        if (
            int(m["internalDate"]) > last_timestamp
            or (
                int(m["internalDate"]) == last_timestamp
                and m["id"] not in state["mail_id"]
            )
        )
    ]

    for m in messages:
        updateDB(m)
        updateTimeStamp(m, state)

if __name__ == "__main__":
    main()
