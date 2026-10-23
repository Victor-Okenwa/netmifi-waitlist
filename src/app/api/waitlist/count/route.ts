import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { queryState } from "@/lib/query-state";

export async function GET() {
  try {
    const result = await query("SELECT COUNT(*) AS count FROM waitlist");
    const count = Number(result.rows[0]?.count ?? 0);
    if (!Number.isInteger(count) || count < 0) {
      return NextResponse.json(
        {
          message: "Could not read the waitlist count",
          state: queryState.error,
          data: undefined,
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ count });
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
