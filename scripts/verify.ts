import { run } from "hardhat";
import fs from "fs";

async function verify(address: string, args: unknown[]) {
  try {
    await run("verify:verify", { address, constructorArguments: args });
    console.log("Verified:", address);
  } catch (e: any) {
    if (!e.message.includes("already verified")) throw e;
    console.log("Already verified:", address);
  }
}

async function main() {
  const d = JSON.parse(fs.readFileSync("deployments/robinhood/addresses.json", "utf8"));
  await verify(d.AlloyLaunchpad, []);
  await verify(d.AlloyKeeper, [d.AlloyLaunchpad]);
}
main().catch((e) => { console.error(e); process.exit(1); });
