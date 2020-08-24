import PropTypes from 'prop-types';

const UserType = PropTypes.shape({
  uid: PropTypes.string,
  profileImage: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string
});
export default UserType;