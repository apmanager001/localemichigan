import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Test if lighthouse.json can be read
    const dataPath = path.join(
      process.cwd(),
      "public",
      "data",
      "lighthouse.json"
    );

    if (!fs.existsSync(dataPath)) {
      return NextResponse.json(
        { error: "Data file not found", path: dataPath },
        { status: 404 }
      );
    }

    const data = fs.readFileSync(dataPath, "utf8");
    const parsedData = JSON.parse(data);

    return NextResponse.json({
      success: true,
      message: "Data file loaded successfully",
      fileSize: data.length,
      recordCount: parsedData.length,
      sampleRecord: parsedData[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load data file",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
