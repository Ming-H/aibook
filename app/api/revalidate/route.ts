import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/daily");
    revalidatePath("/blog");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
