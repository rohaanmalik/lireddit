import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {

  // email does not include an @ sign
   if (!options.email.includes("@")) {
      return [
          {
            field: "email",
            message: "email is not valid",
          },
        ];
      }
    

    // username includes an @ sign
   if (options.username.includes("@")) {
      return [
          {
            field: "email",
            message: "email is not valid",
          },
        ];
      }

    // length of the user should  atleast 3
    if (options.username.length <= 2) {
      return [
          {
            field: "username",
            message: "username should have atleast 3 characters",
          },
        ];
    }

    // length of the password should  atleast 3
    if (options.password.length <= 2) {
      return [
        {
          field: "username",
          message: "password should have atleast 3 characters",
        },
      ];
    }

    return null;
}