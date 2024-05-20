const formatResponse = (object) => {
  const user = {
    id: object._id,
    username: object.username,
    password: object.password,
  };
  return user;
};

export default formatResponse;
