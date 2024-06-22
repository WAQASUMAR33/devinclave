import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';


// const currentDate = new Date();

export async function POST(request) {
  try {
    const data = await request.json();

    console.log(data);
    const { comp_id, offer_type ,offer_title,offer_code,offer_description,offer_link1,offer_link2,offer_expiry,offer_isverify,offer_users,offer_details } = data;
    const newOffer = await prisma.Offers.create({
      data: {
        comp_id: comp_id,
        offer_type: offer_type,
        offer_title: offer_title,
        offer_code: offer_code,
        offer_description: offer_description,
        offer_link1: offer_link1,
        offer_link2: offer_link2,
        offer_users: offer_users,
        offer_expiry: offer_expiry,
        offer_isverify: offer_isverify,
        offer_details: offer_details,
        created_at: new Date(),
        updated_at:new Date()

      },
    });
    return NextResponse.json(newOffer);
  } catch (error) {
    console.log("Error Creating Offer Record :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function GET() {
  try {
    const Offers_= await prisma.Offers.findMany();
    return NextResponse.json(Offers_);
  } catch (error) {
    console.log("Error getting Offer  :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
