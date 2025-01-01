import { generate_access_token } from "./access-token.js";

export const formatDataToSend = (user) => {
  const access_token = generate_access_token(user);

  return {
    access_token: access_token,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
    profile_img: user.personal_info.profile_img,
    role: user.role,
  };
};
