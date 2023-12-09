"use client";
import Route from "@/components/Route";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function ForgottenPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  return (
    <div className="container">
      <Route />
      <h1
        className="text-4xl flex pb-3"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Forgot Your Password?
      </h1>
      <p className="my-2">
        Enter the e-mail address associated with your account. Click submit to
        have your password e-mailed to you.
      </p>
      <h2
        className="text-2xl pb-3 flex"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Your E-Mail Address
      </h2>
      <div className="flex items-center gap-14 mb-10">
        <p className="text-gl mb-1">E-Mail Address:</p>
        <input
          className="my-2 px-2 py-1"
          style={{
            width: "300px",
          }}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2"
          style={{
            border: "2px solid #ddd",
          }}
          onClick={() => router.back()}
        >
          Back
        </button>{" "}
        <button>
          <a
            href="/register"
            style={{
              border: "2px solid #ddd",
            }}
            className=" flex  gap-1 items-center px-3 py-2"
          >
            <FaArrowRight />
            <span>Continue</span>
          </a>
        </button>
      </div>
    </div>
  );
}
