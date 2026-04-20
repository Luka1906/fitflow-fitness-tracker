import {
  useLoaderData,
  Form,
  Link,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail, MdModeEdit } from "react-icons/md";
import { FaTrophy, FaRegSave } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

import { FiLogOut } from "react-icons/fi";
import EmptyData from "./EmptyData";
import WaterCard from "./profile-cards/WaterCard";


export default function Profile() {
  const user = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(navigation.formData)

  const joinedDate = new Date(user.created_at);
  const formattedDate = joinedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    if (actionData?.success) {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  }, [actionData]);

  useEffect(() => {
    if (actionData?.success) {
      setShowSuccess(true);
    }
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [actionData]);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl  border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-accent-dark/10 pointer-events-none" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative w-fit">
              <img
                className="w-40 h-40 sm:w-44 sm:h-44 rounded-3xl object-cover border border-white/15 shadow-2xl"
                src={avatarPreview ? avatarPreview : user.avatar_url}
                alt="profile-image"
              />

              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 rounded-3xl bg-black/35 opacity-0 hover:opacity-100 transition flex items-center justify-center cursor-pointer"
              >
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-medium border border-white/20">
                  <MdModeEdit className="text-lg" />
                  Change photo
                </span>
              </label>
              <Form method="POST" encType="multipart/form-data">
                <input
                  id="avatar-upload"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                {avatarFile && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={` absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap rounded-full bg-accent-dark text-white px-4 py-2 text-sm font-medium shadow-lg hover:scale-[1.02] transition ${isSubmitting ? " cursor-not-allowed" : ""} `}
                  >
                    <FaRegSave className="text-sm" />
                    {isSubmitting ? "Saving..." : "Save new photo"}
                  </button>
                )}
              </Form>
              {showSuccess && (
                <p className="absolute text-sm left-1/2  -translate-x-1/2 text-green-400 text-center mt-2 w-40 ">
                  {actionData.success}
                </p>
              )}
            </div>

            <div className="pt-2">
              <p className="inline-flex items-center rounded-full border border-accent-dark/20 bg-accent-dark/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent-dark">
                Profile
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary-paragraph">
                {user.first_name} {user.last_name}
              </h2>

              <p className="mt-2 text-sm text-text-primary-paragraph/55">
                Member since {formattedDate}
              </p>

              <div className="mt-5 flex flex-col gap-3 text-text-primary-paragraph">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 border border-white/8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10">
                    <IoLocationSharp className="text-red-400 text-lg shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-primary-paragraph/45">
                      Location
                    </p>
                    <p className="text-sm font-medium">{user.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 border border-white/8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-dark/10">
                    <MdOutlineAlternateEmail className="text-accent-dark text-lg" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-primary-paragraph/45">
                      Email
                    </p>
                    <p
                      className="text-sm font-medium"
                      title="Email cannot be changed"
                    >
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/8 p-2 backdrop-blur-md shadow-lg">
            <Link
              to="/profile/edit"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-accent-dark text-white text-sm font-medium hover:opacity-90 transition"
            >
              <MdModeEdit className="text-lg" />
              Edit Profile
            </Link>

            <Form method="POST" action="/logout">
              <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition">
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </Form>
          </div>
        </div>

       <div className="relative mt-10">
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300/10">
          <FaTrophy className="text-amber-300 text-lg" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-primary-paragraph">
            Fitness Goals
          </h3>
          <p className="text-sm text-text-primary-paragraph/50">
            Your current focus areas
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {user.selectedGoals?.length > 0 ? (
              user.selectedGoals.map((goal) => (
                <span
                  key={goal.id}
                  className="rounded-full border border-accent-dark/15 bg-accent-dark/10 px-4 py-2 text-sm font-medium text-accent-dark transition hover:bg-accent-dark/15"
                >
                  {goal.label}
                </span>
              ))
            ) : (
              <p className="text-sm text-text-primary-paragraph/50">
                No goals selected yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-dark/10">
          <FaDroplet className="text-accent-dark text-lg" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-primary-paragraph">
            Daily Water Goal
          </h3>
          <p className="text-sm text-text-primary-paragraph/50">
            Your daily hydration target
          </p>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-bold tracking-tight text-text-primary-paragraph">
                {user.selectedWaterGoal ? `${user.selectedWaterGoal / 1000} L` : "--"}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-primary-paragraph/45">
                Daily target
              </p>
            </div>

            <span className="rounded-full border border-accent-dark/15 bg-accent-dark/10 px-3 py-1.5 text-xs font-medium text-accent-dark">
              {user.selectedWaterGoal  ? "Set" : "Not set"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </section>
      <EmptyData />
      <div className="flex justify-around">
    <WaterCard/>
   
      </div>
  
    </div>
  );
}
