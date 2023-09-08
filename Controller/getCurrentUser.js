import { getServerSession } from "next-auth/next";
import { authOptions } from "front/api/auth/[...nextauth]";
//gotta figure out how  to import there from the front end or send them to front end

const userModel = require('./model/user');

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      throw new Error('Session does not contain user email.');
    }
    //if i send the above to back end i can just route the session info here and use it , name the route auth 
    const currentUser = await userModel.findOne({ email: session.user.email });

    if (!currentUser) {
      throw new Error('User not found in the database.');
    }

    return currentUser;
  } catch (error) {
    // Handle errors appropriately (e.g., log, return an error object, etc.)
    console.error('Error in getCurrentUser:', error);
    throw error;
  }
}
