import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function authenticate(req, res, next) {
  const idToken = req.cookies.id;
  try {
    if (!idToken)
      return res.status(401).json({ success: false, message: "No Token in Cookie" });
    const payload = jwt.verify(idToken, process.env.JWT_KEY);
    req.userId = payload.userId;
    req.profileId = payload.profileId;
    next();
  } catch (err) {
     return  res.status(403).json({ message: "Invalid or expired token", error: err });
  }
  
}
