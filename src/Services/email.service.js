import { customAxios } from "./helper";

export async function sendEmail(emaildata) {
   const res =  (await customAxios.post(`/email/sendItem`,emaildata)).data;
   return res;
}