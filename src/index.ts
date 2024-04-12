import * as fs from "node:fs";
import { type PluginHooks } from "@monodeploy/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PluginName = "GitHub Actions Plugin";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function GithubActionsPlugin({
  onReleaseAvailable,
}: Pick<PluginHooks, "onReleaseAvailable">): void {
  const outputReleaseInformation = async (): Promise<void> => {
    if (!process.env.GITHUB_OUTPUT) {
      return;
    }

    await fs.promises.appendFile(process.env.GITHUB_OUTPUT, "released=true");
  };

  onReleaseAvailable.tapPromise(PluginName, outputReleaseInformation);
}
