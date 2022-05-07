export default async (req, res) => {
  try {
    const data = req.user;

    return res.send({
      status: 200,
      send: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
