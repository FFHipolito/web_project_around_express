const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+#?$/.test(
          value,
        );
      },
      message: (props) => `${props.value} Link de avatar inválido!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
