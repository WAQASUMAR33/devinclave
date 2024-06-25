import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

// const currentDate = new Date();
export async function POST(request) {
  try {
    const data = await request.json();
    const { comp_id ,question,answer  } = data;
   
    const newcompany = await prisma.Faqs.create({
      data: {
        comp_id: parseInt(comp_id) ,
        question: question,
        answer: answer,
        created_at: new Date(),
        updated_at:new Date()      },
    });
    return NextResponse.json(newcompany);
  } catch (error) {
    console.log("Error Creating Faq Record :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function GET() {
  try {
    const companies = await prisma.Faqs.findMany();
    return NextResponse.json(companies);
  } catch (error) {
    console.log("Error getting Data :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
