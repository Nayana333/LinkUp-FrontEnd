import { userUrls } from "../endPoints";
import { apiCall } from "./apiCalls";
import { FormValues } from "../../../utils/validation/signUpValidation";

export const postRegister = (userData: FormValues) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.register, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject({ status: 500, message: "Error" });
    }
  });
};
