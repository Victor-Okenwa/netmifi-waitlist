import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useWaitlist } from "@/api/hooks/waitlist/useWaitlist";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { updateWaitlistSchema } from "@/lib/utils";
import { Reveal } from "./motion";

const WaitlistForm = () => {
  const mutation = useWaitlist();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formSchema = updateWaitlistSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/community");
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ ...values });
      toast.success("Thank you for joining the waitlist");
      await queryClient.invalidateQueries({ queryKey: ["waitlist-count"] });
      setIsModalOpen(true);
      form.reset();
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  return (
    <section id="waitlist" className="scroll-mt-24 bg-white py-16 md:py-24">
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[86%] space-y-5 rounded-xl bg-white p-6 md:w-[25rem]">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-gray-200 p-1 text-black"
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="text-[#1B6909]">
                <AiFillCheckCircle size={96} />
              </div>
              <p className="max-w-72 text-center text-xl font-bold text-[#0F2816]">
                We’ve added you to the waitlist.
              </p>
              <p className="max-w-64 text-center text-sm text-[#000000B2]/70">
                Thanks for joining. We’ll let you know when Netmifi is ready.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="flex w-5/6 items-center justify-center gap-2 rounded-xl bg-[#9E0000] py-3 text-sm text-white hover:bg-[#CF8080]"
                onClick={closeModal}
              >
                <FaRegCheckCircle size={16} />
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <Reveal className="mx-auto max-w-xl px-5 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
          Waitlist
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#1A0F28] md:text-4xl">
          Join the waitlist
        </h2>
        <p className="mt-4 text-base leading-7 text-[#1A0F28]/75">
          Leave your name and email. We will write when Netmifi is ready.
          Joining is free.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="mt-8 space-y-4"
        >
          <div>
            <div className="flex flex-col rounded-xl px-5 py-2 ring-1 ring-black hover:ring-[#9E0000]">
              <label className="text-sm text-[#CE2600]" htmlFor="name">
                Full name
              </label>
              <input
                {...form.register("name")}
                className="text-sm text-[#1A0F28] outline-none sm:text-base"
                type="text"
                id="name"
                autoComplete="name"
                placeholder="Enter your full name"
              />
            </div>
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex flex-col rounded-xl px-5 py-2 ring-1 ring-black hover:ring-[#9E0000]">
              <label className="text-sm text-[#CE2600]" htmlFor="email">
                Email
              </label>
              <input
                {...form.register("email")}
                className="text-sm text-[#1A0F28] outline-none sm:text-base"
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Example@gmail.com"
              />
            </div>
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <Button
            className="h-11 w-full rounded-xl text-white"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Loader type="all" /> : "Join the waitlist"}
          </Button>
          <p className="text-sm leading-6 text-[#1A0F28]/70">
            Share only work you have the right to distribute.
          </p>
        </form>
      </Reveal>
    </section>
  );
};

export default WaitlistForm;
