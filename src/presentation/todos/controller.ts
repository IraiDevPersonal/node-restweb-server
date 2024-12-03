import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(404).json({ error: "ID argument is not a number." });
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      res.status(404).json({ error: `TODO with ID: ${id} not found.` });
    }

    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(404).json({ error });
    }

    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      res.status(404).json({ error });
      return;
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      res.status(404).json({ error: `TODO with ID: ${id} not found.` });
      return;
    }

    const updatedTodo = await prisma.todo.update({
      data: updateTodoDto!.values,
      where: { id },
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(404).json({ error: "ID argument is not a number." });
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      res.status(404).json({ error: `TODO with ID: ${id} not found.` });
    }
    const deletedTodo = await prisma.todo.delete({ where: { id } });

    res.json(deletedTodo);
  };
}
