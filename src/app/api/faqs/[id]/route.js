import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';


export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const companies = await prisma.Faqs.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.log("Error Getting FAQ :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
   
    const { question,answer  } = data;
    const id = parseInt(params.id);
    const updatecompany = await prisma.Faqs.update({
      where: {
        id: id,
      },
      data: {
        question: question,
        answer: answer,
        updated_at: new Date()
      },
    });
    return NextResponse.json(updatecompany);
  } catch (error) {
    console.log("Error Updating FAQ :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletecompany = await prisma.Faqs.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletecompany);
  } catch (error) {
    console.log("Error Deleting FAQ :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
