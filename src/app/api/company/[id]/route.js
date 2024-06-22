import { getPostById, updatePostById, deletePostById } from '../../../lib/posts'; 
import prisma from '../../lib/prisma';



export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      
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


      break;
    case 'PUT':
      // Update data in your database
    

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
      break;
    case 'DELETE':
      // Delete data from your database
      await deletePostById(id);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}