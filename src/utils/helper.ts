export function isTodo(post: UserTodoPost): post is MyTodosProps {
  return typeof (post as MyTodosProps).completed !== "undefined";
}

export function isUser(post: UserTodoPost): post is Props {
  return typeof (post as Props).website !== "undefined";
}
