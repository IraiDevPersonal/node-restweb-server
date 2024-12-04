import { CreateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../entities/todo.entiy";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosUseCase {
  execute(id: number): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getALl();
  }
}
