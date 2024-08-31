import { getContainerRuntimeClient } from "testcontainers";

export default async function tearDownContainers() {
  const containerRuntimeClient = await getContainerRuntimeClient();
  const containers = await containerRuntimeClient.container.list();
  for (const containerInfo of containers) {
    const container = containerRuntimeClient.container.getById(containerInfo.Id);
    await container.stop();
    await container.remove();
  }
}
