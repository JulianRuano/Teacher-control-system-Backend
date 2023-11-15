import { getUserFromDatabase } from './getLastUserData';
import jwt from "jsonwebtoken";
import { jwtSecret, jwtSecretRefresh } from "../config/jwtConfig";

export const generateToken = (uid: string, role: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, role };
    const options = {
      expiresIn: "2m",
    };
    jwt.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(token);
      }
    });
  });
};

export const generateRefreshToken = (
  uid: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const options = {
      expiresIn: "7d",
    };
    //@ts-ignore
    jwt.sign(payload, jwtSecretRefresh, options, (err, token) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(token);
      }
    });
  });
};
export const renewToken = (refreshToken: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, jwtSecretRefresh, async (err, user: any) => {
      if (err) {
        reject("Invalid refresh token");
      } else {
        try {
          const latestUser:any = await getUserFromDatabase(user.uid);
          const token = await generateToken(latestUser.uid, latestUser.role);
          resolve(token);
        } catch (error) {
          reject("Could not generate token");
        }
      }
    });
  });
};

export const generateTokenAndRefreshToken = async(uid:string,role?:string)=>{
  const token = await generateToken(uid, role);
  const refreshToken = await generateRefreshToken(uid);
  return {token, refreshToken}
}