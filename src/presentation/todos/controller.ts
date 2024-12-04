import { Request, Response } from "express";
import {
  CreateTodo,
  DeteleTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((resp) => res.json(resp))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodo(this.todoRepository)
      .execute(id)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(404).json({ error });
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      res.status(404).json({ error });
      return;
    }

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeteleTodo(this.todoRepository)
      .execute(id)
      .then((resp) => res.json(resp))
      .catch((error) => res.status(400).json({ error }));
  };
}
