import { Button } from "../../ui/button";

type TodoListProps = {
	todos: {
		id: number;
		title: string;
	}[];
	onDelete: (id: number) => void;
};

export function TodoList({ todos, onDelete }: TodoListProps) {
	const handleDelete = (id: number) => {
		onDelete(id);
	};

	return (
		<div className="flex flex-col gap-4">
			{todos.map((todo) => (
				<div
					key={todo.id}
					className="flex justify-between items-center gap-4 p-4 bg-[#59544D] rounded-lg shadow-md"
				>
					<span>{todo.title}</span>
					<Button variant="secondary" onClick={() => handleDelete(todo.id)}>
						Delete
					</Button>
				</div>
			))}
		</div>
	);
}
