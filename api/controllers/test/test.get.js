export default async (req, res) => {
  try {
    const url = 'http://localhost:5000/cal';

    // axios.post(url, {

    //     one: req.body.one,
    //     two: req.body.two

    // }).then(response => {
    //     console.log(response.data);
    //     return res.send(response.data);
    // }).catch(error => {
    //     console.log(error);
    //     return res.send(error);
    // });

    return res.send({
      status: 200,
      message: 'Tost',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
