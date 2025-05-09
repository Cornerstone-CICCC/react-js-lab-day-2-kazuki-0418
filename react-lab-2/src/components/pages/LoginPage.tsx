import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginPage() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const nickname = formData.get("nickname");
		console.log(nickname);
		if (nickname) {
			sessionStorage.setItem("isAuthenticated", "true");
			sessionStorage.setItem("nickname", nickname.toString());
			window.location.href = "/";
		}
	};

	return (
		<div className="w-full max-w-sm rounded-lg bg-[#59544D] p-8 shadow-md opacity-50">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex justify-content-center align-items-center gap-4 mb-4 flex-col">
					<h3 className="text-stone-100 text-lg font-bold">
						Hi. What's your name?
					</h3>
					<div className="flex justify-content-center align-items-center gap-4 ">
						<Input name="nickname" />
						<Button type="submit" variant={"dark"}>
							Login
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
