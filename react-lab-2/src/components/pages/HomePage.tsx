import { useState } from "react";
import { TodoList } from "../features/todo/todoList";
import { Button } from "../ui/button";
import { TodoAdd } from "../features/todo/todoAdd";
import { useAuthManager } from "../../hooks/auth";

export default function HomePage() {
	const { logout } = useAuthManager();
	const [todos, setTodos] = useState<
		| {
				id: number;
				title: string;
		  }[]
		| null
	>(null);

	const handleAdd = (text: string) => {
		const newTodo = {
			id: Date.now(),
			title: text,
		};
		setTodos((prevTodos) => (prevTodos ? [...prevTodos, newTodo] : [newTodo]));
	};

	const nickName = sessionStorage.getItem("nickname");
	return (
		<div className=" w-[440px] rounded-lg bg-[#59544D] p-8 shadow-md opacity-50">
			<div className="flex justify-content-center align-items-center gap-4 mb-4 flex-col">
				<div className="flex justify-between align-items-center gap-4 ">
					<h3 className="text-stone-100 text-lg font-bold">
						Welcome, {nickName}!
					</h3>
					<Button variant={"dark"} onClick={logout}>
						Logout
					</Button>
				</div>
				<p className="text-stone-100 text-lg font-bold">
					Have a great and productive day!
				</p>
				{todos && todos.length !== 0 && (
					<TodoList
						todos={todos}
						onDelete={(id) => {
							setTodos((prevTodos) =>
								prevTodos ? prevTodos.filter((todo) => todo.id !== id) : [],
							);
						}}
					/>
				)}
				<TodoAdd onAdd={handleAdd} />
			</div>
		</div>
	);
}
