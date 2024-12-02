import { Request, Response } from "express";

let todos = [
  { id: 1, text: "Buy Milk", completedAt: new Date() },
  { id: 2, text: "Buy Bread", completedAt: new Date() },
  { id: 3, text: "Buy Butter", completedAt: null },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(404).json({ error: `ID argument is not a number.` });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.status(404).json({ error: `TODO with ID: ${id} not found.` });
      return;
    }

    res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      res.status(404).json({ error: "Text property is required" });
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      completedAt: null,
      text,
    };

    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(404).json({ error: `ID argument is not a number.` });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.status(404).json({ error: `TODO with ID: ${id} not found.` });
      return;
    }

    const { text, completedAt } = req.body;

    // if (!text) {
    //   res.status(404).json({ error: "Text property is required" });
    //   return;
    // }

    todo.text = text || todo.text;
    if (completedAt === "null") {
      todo.completedAt = null;
    } else {
      todo.completedAt = new Date(completedAt || todo.completedAt);
    }

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(404).json({ error: `ID argument is not a number.` });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.status(404).json({ error: `TODO with ID: ${id} not found.` });
      return;
    }

    // todos.splice(todos.indexOf(todo), 1) otra forma de hacerlo
    todos = todos.filter((todo) => todo.id !== id);

    res.json(todo);
  };
}
