const handleRequest = (controllerFunction) => {
    return (req, res) => {
      controllerFunction((err, results) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(results);
        }
      });
    };
  };
  
  module.exports = {
    handleRequest
  };