import emailjs from "@emailjs/browser";
import { isMail } from "appmon/validation";
import { BsWhatsapp } from "solid-icons/bs";
import { FiMail, FiPhone } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Animate from "../../animation";
import assets from "../../assets";
import Image from "../../components/Image";
import InputwithLabel from "../../components/InputwithLabel";
import SectionHeader from "../../components/SectionHeader";
import TextareaWithLabel from "../../components/TextareaWithLabel";
import { HtmlAttr } from "../../types/dom";
import { FormEvent } from "../../types/event";
import Toast from "../../utils/Toast";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection(props: HtmlAttr) {
  const [loading, setLoading] = createSignal(false);
  const [form, setForm] = createStore<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const setData = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isMail(form.email)) {
      Toast.fire("sorry", "please enter valid email", "error");
      setLoading(false);
      return false;
    } else if (form.message?.length < 3) {
      Toast.fire("sorry", "please write  message", "error");
      setLoading(false);
      return false;
    }

    emailjs
      .send(
        "service_dl76l0v",
        "template_r7403cp",
        {
          name: form.name,
          subject: form.subject,
          message: form.message,
        },
        "auhoy6yOg54zHv__H"
      )
      .then(
        function (response) {
          Toast.fire("success", response.text + " email sent", "success");
        },
        function (error) {
          Toast.fire("error", error.text, "error");
        }
      );

    setLoading(false);
  };
  return (
    <section {...props}>
      <SectionHeader>Contact Me </SectionHeader>
      <div class="grid grid-cols-1 sm:grid-cols-2">
        {/* secound part */}
        <Animate.div motion="slideInLeft" class="mx-auto">
          <Image class="w-full h-full" src={assets.support} />
        </Animate.div>

        {/* form/ */}
        <Animate.div
          motion="slideInRight"
          class="p-8 bg-gray-700 shadow-gray-600 rounded-2xl h-max"
        >
          <p class="text-xl uppercase tracking-wider">Get in touch</p>
          <div class="my-4 text-1xl">
            <a href="mailto:appsaeed7@gmail.com" target="_blank" class="flex gap-2 my-2">
              <FiMail class="mt-1" /> <span>appsaeed7@gmail.com</span>
            </a>
            <a href="tel:+8801780861887" target="_blank" class="flex gap-2 my-2">
              <FiPhone class="mt-1" /> <span>+8801780861887</span>
            </a>
            <a
              href="https://wa.me/+8801780861887"
              target="_blank"
              class="flex gap-2 my-2"
            >
              <BsWhatsapp class="mt-1 text-white" /> <span>+8801780861887</span>
            </a>
          </div>
          <form class="mt-10 flex flex-col gap-4" onSubmit={(e) => formHandler(e)}>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputwithLabel
                name="name"
                type="text"
                label="Your name"
                placeholder="What's your name"
                value={form.name}
                oninput={(e) => setData("name", e.target.value)}
              />
              <InputwithLabel
                name="email"
                type="email"
                label="Your email"
                placeholder="What's your email"
                value={form.email}
                oninput={(e) => setData("email", e.target.value)}
              />
            </div>
            <InputwithLabel
              name="subject"
              label="Your Subject"
              placeholder="Tel us a resone"
              value={form.subject}
              oninput={(e) => setData("subject", e.target.value)}
            />

            <TextareaWithLabel
              label="Your messsage"
              placeholder="What would you like to say us"
              value={form.message}
              oninput={(e) => setData("message", e.target.value)}
            />

            <button
              disabled={loading()}
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading() ? "loading..." : "Send message"}
            </button>
          </form>
        </Animate.div>
      </div>
    </section>
  );
}
