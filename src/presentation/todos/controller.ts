import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await prisma.todo.findMany();
      res.json(todos);
    } catch (error) {
      res.status(404).json({ error: `${error}` });
    }
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      if (isNaN(id)) {
        throw new Error("ID argument is not a number.");
      }

      const todo = await prisma.todo.findFirst({ where: { id } });

      if (!todo) {
        throw new Error(`TODO with ID: ${id} not found.`);
      }

      res.json(todo);
    } catch (error) {
      res.status(404).json({ error: `${error}` });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    try {
      if (error) {
        throw new Error(error);
      }

      const newTodo = await prisma.todo.create({
        data: createTodoDto!,
      });

      res.json(newTodo);
    } catch (error) {
      res.status(404).json({ error: `${error}` });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;

    try {
      if (isNaN(id)) {
        throw new Error("ID argument is not a number.");
      }

      const todo = await prisma.todo.findFirst({ where: { id } });

      if (!todo) {
        throw new Error(`TODO with ID: ${id} not found.`);
      }

      const updatedTodo = await prisma.todo.update({
        data: {
          text,
          completedAt: completedAt ? new Date(completedAt) : null,
        },
        where: { id },
      });

      res.json(updatedTodo);
    } catch (error) {
      res.status(404).json({ error: `${error}` });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      if (isNaN(id)) {
        throw new Error("ID argument is not a number.");
      }

      const todo = await prisma.todo.findFirst({ where: { id } });

      if (!todo) {
        throw new Error(`TODO with ID: ${id} not found.`);
      }
      const deletedTodo = await prisma.todo.delete({ where: { id } });

      res.json(deletedTodo);
    } catch (error) {
      res.status(404).json({ error: `${error}` });
    }
  };
}
