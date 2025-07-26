import axios from "axios";
import chalk from "chalk";
import ora from "ora";

const API_URL = "https://api.blocknative.com/gasprices/blockprices";
const API_KEY = ""; // optional: Blocknative API key

async function fetchGas() {
  const spinner = ora("Fetching Ethereum gas prices...").start();
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: API_KEY ? API_KEY : undefined }
    });

    const data = res.data.blockPrices[0].estimatedPrices;

    console.log("\n" + chalk.bold("⛽ Ethereum Gas Prices (Gwei):") + "\n");
    data.slice(0, 3).forEach(p => {
      const speed = p.confidence === 70 ? "⏳ Slow" : p.confidence === 90 ? "🚗 Standard" : "🚀 Fast";
      console.log(
        chalk.yellow(speed.padEnd(10)) +
        chalk.green(`${p.price} Gwei`) +
        chalk.gray(`  (${p.confidence}% confidence)`)
      );
    });
  } catch (err) {
    console.error(chalk.red("Error fetching gas prices:"), err.message);
  } finally {
    spinner.stop();
  }
}

fetchGas();
