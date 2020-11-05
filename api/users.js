const getAllUsers = (req, res) => {
  console.log('Get all users');

  const random = parseInt(Number(Math.random() * (10 - 1) + 1));

  if (random % 2 === 0) {
    return res.status(200).json({
      success: true,
      count: 2,
      users: [{
        name: 'A'
      }, {
        name: 'B'
      }, {
        name: 'C'
      }]
    });
  } else {
    return res.status(412).json({
      success: false,
      message: 'No users found'
    });
  }
};

module.exports = {
  getAllUsers
};
