import { CreateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../entities/todo.entiy";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeteleTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}
