import * as os from "node:os";
import * as fs from "node:fs";
import {
  type PluginHooks,
  type YarnContext,
  type MonodeployConfiguration,
  type ChangesetSchema,
} from "@monodeploy/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PluginName = "GitHub Actions Plugin";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function GithubActionsPlugin({
  onReleaseAvailable,
}: Pick<PluginHooks, "onReleaseAvailable">): void {
  const outputReleaseInformation = async (
    context: YarnContext,
    config: MonodeployConfiguration,
    changeset: ChangesetSchema
  ): Promise<void> => {
    if (!process.env.GITHUB_OUTPUT) {
      return;
    }

    const { lastRelease, nextRelease } = changeset;

    const output = [
      `released=true`,
      `last-version=${lastRelease.version}`,
      `next-version=${nextRelease.version}`,
      `release-type=${nextRelease.strategy}`,
    ].join(os.EOL);

    await fs.promises.appendFile(process.env.GITHUB_OUTPUT, output);
  };

  onReleaseAvailable.tapPromise(PluginName, outputReleaseInformation);
}
