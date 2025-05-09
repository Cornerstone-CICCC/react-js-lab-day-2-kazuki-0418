import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export function TodoAdd({
	onAdd,
}: {
	onAdd: (text: string) => void;
}) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if (!formData.get("todoTitle")) {
			return;
		}

		console.log(formData.get("todoTitle")?.toString());
		onAdd(formData.get("todoTitle")?.toString() || "");
		e.currentTarget.reset();
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex justify-content-center align-items-center gap-4 mb-4 flex-col">
				<div className="flex justify-content-center align-items-center gap-4 ">
					<Input name="todoTitle" />
					<Button type="submit" variant={"dark"}>
						Add Task
					</Button>
				</div>
			</div>
		</form>
	);
}
