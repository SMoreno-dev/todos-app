const TODO_NOT_CREATED = "Internal server error creating TODO.";
const TODO_NOT_UPDATED = "Internal server error updating TODO.";
const TODO_NOT_DELETED = "Internal server error deleting TODO.";
const TODO_EXISTS = "A TODO with that title name already exists.";
const TODO_NOT_FOUND = "Couldn't find any TODO(s).";
const BAD_CREATE_TODO_REQUEST = `Your request body should include 'title', 'content', and 'userId' properties.`;
const BAD_UPDATE_TODO_REQUEST = `Your request body should include at least one of these properties: 'title', 'content', 'userId'.`;
const GOT_TODO = "Successfully fetched TODO(s).";
const CREATED_TODO = "Successfully created a TODO.";
const UPDATED_TODO = (id) => `Successfully updated TODO with id of ${id}`;
const DELETED_TODO = (id) => `Successfully deleted TODO with id of ${id}`;

module.exports = {
  TODO_NOT_CREATED,
  TODO_EXISTS,
  TODO_NOT_FOUND,
  TODO_NOT_UPDATED,
  TODO_NOT_DELETED,
  BAD_CREATE_TODO_REQUEST,
  BAD_UPDATE_TODO_REQUEST,
  GOT_TODO,
  CREATED_TODO,
  UPDATED_TODO,
  DELETED_TODO,
};
