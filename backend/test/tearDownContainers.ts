export default async function tearDownContainers() {
  await global.dbContainer.stop();
}
