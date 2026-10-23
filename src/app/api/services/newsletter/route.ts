import { NextResponse } from "next/server";
import { isUniqueConstraintError, query } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { queryState } from "@/lib/query-state";

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function mapNewsletter(row: Record<string, unknown>) {
  return {
    id: Number(row.id),
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function duplicateResponse() {
  return NextResponse.json(
    {
      message: "Looks like your email already has a subscription",
      state: queryState.error,
      data: undefined,
    },
    { status: 409 }
  );
}

export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "Email is required",
        state: queryState.error,
        data: undefined,
      },
      { status: 400 }
    );
  }

  const email = normalize(body?.email);

  if (!email) {
    return NextResponse.json(
      {
        message: "Email is required",
        state: queryState.error,
        data: undefined,
      },
      { status: 400 }
    );
  }

  try {
    const existing = await query("SELECT id FROM newsletter WHERE email = ?", [
      email,
    ]);

    if (existing.rows.length) {
      return duplicateResponse();
    }

    let created;
    try {
      created = await query(
        `INSERT INTO newsletter (email) VALUES (?)
         RETURNING id, email, created_at, updated_at`,
        [email]
      );
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return duplicateResponse();
      }
      throw error;
    }

    void sendEmail(email, "newsletter_activated").catch((error) => {
      console.error("Failed to send email:", error);
    });

    return NextResponse.json(
      {
        message: "subscription activated",
        state: queryState.success,
        data: mapNewsletter(created.rows[0] as Record<string, unknown>),
      },
      { status: 202 }
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
