const getReadyStatus = (req, res) => {
  res.status(200).json({
    ready: true
  });
};

const getHealthStatus = (req, res) => {
  res.status(200).json({
    healthy: true,
    database: true
  });
};

module.exports = {
  getHealthStatus,
  getReadyStatus
};