import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

import fs from "fs";
import path from "path";

// const currentDate = new Date();
export async function POST(request) {
  try {
    const data = await request.json();
    const { com_title, comp_logo ,comp_description,comp_phone,comp_email,comp_website,comp_rating,com_details } = data;
    const imgurl2 = comp_logo.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(imgurl2, "base64");
    // Generate a unique file name
    const fileName = `image_${Date.now()}.jpg`;
    // Specify the path where the file will be saved
    const filePath = path.join(process.cwd(), "public", "companies", fileName);
    // Write buffer to file
    fs.writeFileSync(filePath, buffer);
    const newcompany = await prisma.Company.create({
      data: {
        com_title: com_title,
        comp_logo: fileName,
        comp_description: comp_description,
        comp_phone: comp_phone,
        comp_email: comp_email,
        comp_website: comp_website,
        comp_rating: comp_rating,
        com_details: com_details,
        created_at: new Date(),
        updated_at:new Date()      },
    });
    return NextResponse.json(newcompany);
  } catch (error) {
    console.log("Error Creating Company Record :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function GET() {
  try {
    const companies = await prisma.Company.findMany();
    return NextResponse.json(companies);
  } catch (error) {
    console.log("Error getting Data :", error);
    return NextResponse.error("Internal Server Error"+ error, 500);
  }
}
