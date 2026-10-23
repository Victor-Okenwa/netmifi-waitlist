import { NextResponse } from "next/server";
import { isUniqueConstraintError, query } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { queryState } from "@/lib/query-state";

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function mapWaitlist(row: Record<string, unknown>) {
  return {
    id: Number(row.id),
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function duplicateResponse() {
  return NextResponse.json(
    {
      message: "Looks like your email is already on the waitlist",
      state: queryState.blocked,
      data: undefined,
    },
    { status: 409 }
  );
}

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "Name and email are required",
        state: queryState.error,
        data: undefined,
      },
      { status: 400 }
    );
  }

  const name = normalize(body?.name);
  const email = normalize(body?.email);

  if (!name || !email) {
    return NextResponse.json(
      {
        message: "Name and email are required",
        state: queryState.error,
        data: undefined,
      },
      { status: 400 }
    );
  }

  try {
    const existing = await query("SELECT id FROM waitlist WHERE email = ?", [
      email,
    ]);

    if (existing.rows.length) {
      return duplicateResponse();
    }

    let created;
    try {
      created = await query(
        `INSERT INTO waitlist (name, email) VALUES (?, ?)
         RETURNING id, name, email, created_at, updated_at`,
        [name, email]
      );
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return duplicateResponse();
      }
      throw error;
    }

    void sendEmail(email, "waitlist_confirmation", name)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
      });

    return NextResponse.json(
      {
        message: "Waitlist registration successful",
        state: queryState.success,
        data: mapWaitlist(created.rows[0] as Record<string, unknown>),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Something went wrong",
        state: queryState.error,
        data: undefined,
      },
      { status: 500 }
    );
  }
}
