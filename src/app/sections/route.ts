import { homeData } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Filter visible sections and sort by order
    const visibleSections = homeData
      .filter((section) => section.isVisible)
      .sort((a, b) => a.order - b.order);

    return NextResponse.json(visibleSections);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}
