import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';


export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const offfers = await prisma.Offers.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(offfers);
  } catch (error) {
    console.log("Error Getting Offer :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
   
    const { comp_id, offer_type ,offer_title,offer_code,offer_description,offer_link1,offer_link2,offer_expiry,offer_isverify } = data;

    const id = parseInt(params.id);
    const updateoffer = await prisma.Offers.update({
      where: {
        id: id,
      },
      data: {
        comp_id: comp_id,
        offer_type: offer_type,
        offer_title: offer_title,
        offer_code: offer_code,
        offer_description: offer_description,
        offer_link1: offer_link1,
        offer_link2: offer_link2,
        offer_expiry: offer_expiry,
        offer_isverify: offer_isverify,
        updated_at:new Date()
      },
    });
    return NextResponse.json(updateoffer);
  } catch (error) {
    console.log("Error Updating Offer :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletecompany = await prisma.Offers.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletecompany);
  } catch (error) {
    console.log("Error Deleting Offer :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
