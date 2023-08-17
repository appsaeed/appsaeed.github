import { For } from "solid-js";
import settings from "../../../app/settings";
import sections from "../../../data/className/sections";
import social_media from "../../../data/social_media";

export default function FooterBottom() {
  const social = Object.values(social_media);
  return (
    <div class={sections.headerfooter.common}>
      <div
        class={`flex items-center justify-center sm:justify-between flex-col sm:flex-row`}
      >
        <div class="text-1xl text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://github.com/appsaeed" class="hover:underline text-blue-600">
            {settings.name}
          </a>
          All Rights Reserved.
        </div>
        <div class="max-sm:my-8 flex space-x-6">
          <For each={social}>
            {({ name, link, icon: Icon }) => (
              <a
                title={name}
                href={link}
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon class={"text-2xl"} />
              </a>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}