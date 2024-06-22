import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';


export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const companies = await prisma.Company.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.log("Error Getting Company :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
   
    const { com_title, comp_logo ,comp_description,comp_phone,comp_email,comp_website,comp_rating,com_details } = data;
    const id = parseInt(params.id);
    const updatecompany = await prisma.Company.update({
      where: {
        id: id,
      },
      data: {
        com_title: com_title,
        comp_logo: comp_logo,
        comp_description: comp_description,
        comp_phone: comp_phone,
        comp_email: comp_email,
        comp_website: comp_website,
        comp_rating: comp_rating,
        com_details: com_details,
        updated_at: new Date()
      },
    });
    return NextResponse.json(updatecompany);
  } catch (error) {
    console.log("Error Updating Company :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletecompany = await prisma.Company.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletecompany);
  } catch (error) {
    console.log("Error Deleting Company :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
