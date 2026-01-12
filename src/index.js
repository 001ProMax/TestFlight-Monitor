import { parseHTML } from "linkedom";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default {
  async scheduled(event, env, ctx) {
    switch (event.cron) {
      case "*/1 * * * *":
        await run(env);
        break;
    }
  },
};

async function run(env) {
  const interval = Number(env.interval) || 5;
  await Promise.all(
    JSON.parse(env.TF_IDs).map(async (id) => {
      for (let i = 0; i < 60 / interval; i++) {
        const [{ title, status, icon }] = await Promise.all([
          Promise.race([data(id), sleep(interval * 1000)]),
          sleep(interval * 1000),
        ]);

        console.log(status, title);

        if (status) {
          await notify(env, title, icon);
        }
      }
    })
  );
}

async function data(id) {
  const { document } = parseHTML(
    await fetch(`https://testflight.apple.com/join/${id}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "en-US;q=0.9",
      },
      timeout: 5000,
    }).then((r) => r.text())
  );
  const status = document.querySelector(".beta-status");
  return {
    title: document.title.slice(9, -26),
    status: status?.textContent?.trim().includes("TestFlight"),
    icon: status?.querySelector(".app-icon.ios")?.style.backgroundImage.slice(4, -1),
  };
}

async function notify(env, title, icon) {
  await Promise.all(
    JSON.parse(env.Bark_IDs).map(async (id) => {
      await fetch("https://api.day.app/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "TestFlight 监控",
          subtitle: title,
          body: "已释放名额",
          icon,
          url: "https://testflight.apple.com/join/" + id,
          group: "TestFlight Monitor",
        }),
      });
    })
  );
}
