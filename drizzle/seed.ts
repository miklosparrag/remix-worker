import { seed } from "drizzle-seed";
import { vanceConfig } from "db/schema/vanceConfig";
import { vanceTransformation } from "db/schema/vanceTransformation";
import { D1Helper } from "@nerdfolio/drizzle-d1-helpers";
import { Description } from "@headlessui/react";

function seedDatabase(db) {
  return db.insert(vanceConfig).values([
    {
      name: "Sample Config",
      description: "This is a sample config for testing purposes.",
    },
  ]);
}

async function main() {
  console.log("Seeding database...");
  D1Helper.get()
    .withCfCredentials(
      process.env.CLOUDFLARE_ACCOUNT_ID,
      process.env.CLOUDFLARE_API_TOKEN
    )
    //.useProxyD1(
    .useLocalD1(async (db) => {
      await seedDatabase(db);
    });
}

main();
