import { PullPolicy, Wait } from "testcontainers";
import { MySqlContainer } from "@testcontainers/mysql";
import path from "path";

export async function startDbContainer(containerName: string = "db-container") {
  const sourceVolume = path.join(__dirname, "..", "migrations");

  return new MySqlContainer()
    .withPullPolicy(PullPolicy.defaultPolicy())
    .withName(containerName)
    .withDatabase("app")
    .withReuse()
    .withRootPassword("123456")
    .withExposedPorts(3306)
    .withBindMounts([
      {
        source: sourceVolume,
        target: "/docker-entrypoint-initdb.d",
      },
    ])
    .withWaitStrategy(Wait.forListeningPorts())
    .start();
}
