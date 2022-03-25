import React from "react";

export enum YupValidations {
  VALIDATE_ONLY_ALPHABETS = "^[aA-zZs]+$",
  VALIDATE_PHONE = "^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$",
  VALIDATE_WEBSITE = "^((ftp|http|https)://)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(.?[a-zA-Z]+)+((/)[w#]+)*(/w+?[a-zA-Z0-9_]+=w+(&[a-zA-Z0-9_]+=w+)*)?$",
}
