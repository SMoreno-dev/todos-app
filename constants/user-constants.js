const USER_NOT_CREATED = "Internal server error creating USER.";
const USER_NOT_UPDATED = "Internal server error updating USER.";
const USER_NOT_DELETED = "Internal server error deleting USER.";
const USER_EXISTS = "An user with that title name already exists.";
const USER_NOT_FOUND = "Couldn't find any user(s).";
const BAD_CREATE_USER_REQUEST = `Your request body should include 'email' and 'password' properties.`;
const BAD_UPDATE_USER_REQUEST = `Your request body should include at least one of these properties: 'email', 'password'.`;
const GOT_USER = "Successfully fetched user(s).";
const CREATED_USER = "Successfully created an user.";
const UPDATED_USER = (id) => `Successfully updated user with id of ${id}`;
const DELETED_USER = (id) => `Successfully deleted user with id of ${id}`;

module.exports = {
  USER_NOT_CREATED,
  USER_EXISTS,
  USER_NOT_FOUND,
  USER_NOT_UPDATED,
  USER_NOT_DELETED,
  BAD_CREATE_USER_REQUEST,
  BAD_UPDATE_USER_REQUEST,
  GOT_USER,
  CREATED_USER,
  UPDATED_USER,
  DELETED_USER,
};
