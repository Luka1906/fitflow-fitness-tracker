import { useLoaderData } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTrophy } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Form } from "react-router-dom";

export default function Profile() {
  const user = useLoaderData();

  return (
    <section className="flex flex-col sm:flex-row sm:items-center gap-6 py-10 px-6 mb-10 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition relative">
      <div className="relative w-fit">
        <img
          className="w-40 h-40 rounded-full object-cover border border-accent-dark shadow-xl"
          src={user.avatar_url}
          alt="profile-image"
        />

        <div className="absolute right-2 bottom-2 flex items-center justify-center w-10 h-10 rounded-full bg-accent-dark text-white shadow-lg hover:cursor-pointer hover:scale-105 hover:shadow-xl transition">
          <MdModeEdit className="text-lg" />
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-accent-dark font-accent text-4xl font-bold tracking-tight">
          {user.first_name} {user.last_name}
        </h2>

        <div className="flex flex-col gap-2 mt-3 text-text-primary-paragraph">
          <div className="flex gap-2 items-center">
            <IoLocationSharp className="text-red-400" />
            <p>{user.location}</p>
          </div>

          <div className="flex gap-2 items-start">
            <FaTrophy className="text-amber-300 mt-1" />
            <div className="flex flex-wrap gap-2">
              {user.goals.map((goal) => (
                <span
                  key={goal.id}
                  className="px-3 py-1 text-sm bg-accent-dark/10 text-accent-dark rounded-full"
                >
                  {goal.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Form method="POST" action="/logout">
        <button className="flex items-center gap-2 absolute top-6 right-6 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium cursor-pointer">
          <FiLogOut className="text-accent-dark" />
          Logout
        </button>
      </Form>
    </section>
  );
}
